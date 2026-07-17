const TOKEN_NAMES = Object.freeze([
  'PM_INVOCATION',
  'INSTRUCTIONS_FILE',
  'ASSISTANT_NAME',
]);

const claude = Object.freeze({
  provider: 'claude',
  tokens: Object.freeze({
    PM_INVOCATION: '/pm',
    INSTRUCTIONS_FILE: 'CLAUDE.md',
    ASSISTANT_NAME: 'Claude',
  }),
  frontmatter: 'preserve',
});

const codex = Object.freeze({
  provider: 'codex',
  tokens: Object.freeze({
    PM_INVOCATION: 'pm',
    INSTRUCTIONS_FILE: 'AGENTS.md',
    ASSISTANT_NAME: 'the assistant',
  }),
  frontmatter: 'codex',
});

export const TARGETS = Object.freeze({
  claude,
  codexRepository: codex,
  codexPlugin: codex,
});

function fail(filePath, message) {
  throw new Error(`${filePath}: ${message}`);
}

function parseFrontmatter(input, filePath) {
  if (typeof input !== 'string') fail(filePath, 'Markdown input must be a string');
  const match = input.match(/^---\n([\s\S]*?)\n---(?=\n|$)/);
  if (!match) fail(filePath, 'missing or malformed frontmatter');

  const values = new Map();
  for (const line of match[1].split('\n')) {
    const keyMatch = line.match(/^([A-Za-z][A-Za-z0-9_-]*):(.*)$/);
    if (!keyMatch) continue;
    const [, key, value] = keyMatch;
    if (values.has(key)) fail(filePath, `duplicate frontmatter key: ${key}`);
    values.set(key, value);
  }
  for (const key of ['name', 'description']) {
    if (!values.has(key) || values.get(key).trim() === '') {
      fail(filePath, `missing required frontmatter key: ${key}`);
    }
  }

  const frontmatterEnd = match[0].length;
  return {
    original: input.slice(0, frontmatterEnd),
    body: input.slice(frontmatterEnd),
    values,
  };
}

function selectProviderBlocks(body, provider, filePath) {
  const lines = body.split('\n');
  const output = [];
  let active = null;

  for (const line of lines) {
    const open = line.match(/^<!-- provider:(claude|codex) -->$/);
    const close = line === '<!-- /provider -->';
    const providerLike = /<!--[^>]*provider[^>]*-->/i.test(line);

    if (open) {
      if (active) fail(filePath, `nested provider block (${active} then ${open[1]})`);
      active = open[1];
      continue;
    }
    if (close) {
      if (!active) fail(filePath, 'orphan provider close marker');
      active = null;
      continue;
    }
    if (providerLike) fail(filePath, `unknown or non-exact provider marker: ${line.trim()}`);
    if (!active || active === provider) output.push(line);
  }

  if (active) fail(filePath, `unclosed provider block: ${active}`);
  return output.join('\n');
}

function replaceTokens(input, tokens, filePath) {
  const output = input.replace(/(?<!\{)\{\{([^{}]+)\}\}(?!\})/g, (whole, name) => {
    if (!TOKEN_NAMES.includes(name)) fail(filePath, `unknown token: ${whole}`);
    return tokens[name];
  });
  if (/\{\{|\}\}/.test(output)) fail(filePath, 'unresolved or malformed token remains');
  return output;
}

export function transformMarkdown(input, { target, filePath = '<markdown>' } = {}) {
  const config = TARGETS[target];
  if (!config) fail(filePath, `unknown target: ${String(target)}`);

  const isSkillRouter = /(?:^|[\\/])SKILL\.md$/.test(filePath);
  const hasFrontmatter = typeof input === 'string' && input.startsWith('---\n');
  const parsed = isSkillRouter || hasFrontmatter
    ? parseFrontmatter(input, filePath)
    : { original: '', body: input, values: null };
  if (parsed.original && /\{\{|\}\}/.test(parsed.original)) fail(filePath, 'tokens are not allowed in frontmatter');
  const transformedBody = replaceTokens(
    selectProviderBlocks(parsed.body, config.provider, filePath),
    config.tokens,
    filePath,
  );

  if (!parsed.original) return transformedBody;
  if (config.frontmatter === 'preserve') return `${parsed.original}${transformedBody}`;

  const name = parsed.values.get('name').trimStart();
  const description = parsed.values.get('description').trimStart();
  return `---\nname: ${name}\ndescription: ${description}\n---${transformedBody}`;
}

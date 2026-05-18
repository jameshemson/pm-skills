# Changelog

## 2.0.0 - 2026-05-18

### Breaking

The 16 separate `/pm:*` commands (`/pm:brief`, `/pm:review`, `/pm:decide`, `/pm:spec`, `/pm:stories`, `/pm:metrics`, `/pm:teach-pm`, `/pm:setup`, `/pm:discover`, `/pm:prioritise`, `/pm:audit`, `/pm:strategy`, `/pm:position`, `/pm:translate`, `/pm:stakeholders`, `/pm:retro`) are removed. They are replaced by a single `pm` skill with nine modes.

### Migration

Replace every `/pm:<command>` invocation with `/pm <mode>`:

| Was | Now |
|-----|-----|
| `/pm:teach-pm` | `/pm teach` |
| `/pm:setup` | `/pm setup` |
| `/pm:brief` | `/pm brief` |
| `/pm:spec` | `/pm spec` |
| `/pm:stories` | `/pm stories` |
| `/pm:metrics` | `/pm metrics` |
| `/pm:review` | `/pm review` |
| `/pm:decide` | `/pm decide` |
| `/pm:discover` | `/pm discover` |
| `/pm:prioritise` | `/pm review` (strategy/roadmap input) |
| `/pm:audit` | `/pm review` (strategic alignment) |
| `/pm:strategy` | `/pm review` (strategy doc) |
| `/pm:position` | `/pm review` (positioning doc) |
| `/pm:translate` | `/pm review` (audience reframe) |
| `/pm:stakeholders` | `/pm review` (stakeholder message) |
| `/pm:retro` | `/pm review` (retro doc) |

The `review` mode is document-type-aware and absorbs the critique function of translate, stakeholders, audit, retro, strategy, position, and prioritise. Run `/pm` with no argument to see the mode menu.

### Added

- Single `pm` skill replacing 16 separate skills, version 2.0.0
- Nine modes: teach, setup, brief, spec, stories, metrics, review, decide, discover
- Flat `reference/` directory: `foundations.md`, nine `mode-*.md` files, ten `knowledge-*.md` files
- `review` mode: document-type-aware Frame, Critique, Refine loop
- Positioning line: "Claude generates, the pack critiques"

---

## 1.5.1 - 2026-05-17

### Changed

- Updated GitHub repository references to `jameshemson/pm-skills`.
- Updated install command:
  - `/plugin marketplace add jameshemson/pm-skills`

### Migration

Existing installs should update their marketplace source to `jameshemson/pm-skills`.

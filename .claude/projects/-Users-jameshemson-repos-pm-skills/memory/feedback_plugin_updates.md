---
name: Plugin update flow for users
description: How users actually update the pm-skills plugin - the steps required and the gotcha with auto-update
type: feedback
---

Third-party Claude Code plugins don't auto-update by default. Users must manually: `/plugin` → Marketplaces → select the marketplace → Update Marketplace → Enable auto-update. Without this, reinstalling still pulls a stale cached version.

**Why:** James discovered this the hard way - pushed v1.3.0 but another machine was stuck on v1.1.0 even after uninstall/reinstall. Deleting the cache folder and updating the marketplace fixed it.

**How to apply:** Include update instructions in README/install docs. Always bump version in both plugin.json and marketplace.json with every release (now in CLAUDE.md).

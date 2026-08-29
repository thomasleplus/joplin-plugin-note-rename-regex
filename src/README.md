# Source

TypeScript source of the Joplin plugin **note-rename-regex**, which bulk-renames
notes by applying a regular-expression find/replace to their titles.

- `index.ts` — the plugin entry point (registers the command and settings).
- `manifest.json` — the Joplin plugin manifest (id, name, version, permissions).

Built with the standard Joplin plugin toolchain into a `.jpl` bundle; the plugin
is type-checked against the API typings in [`../api/`](../api/).

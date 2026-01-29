# Project Intelligence Core

Deterministic, read-only analysis engine for software projects.

## Security Contract

This core engine:
- never executes analyzed code
- never installs dependencies
- never evaluates runtime expressions
- only reads files as plain text
- enforces strict analysis limits
- produces deterministic output

The analyzed source code is treated as data, not as executable input.
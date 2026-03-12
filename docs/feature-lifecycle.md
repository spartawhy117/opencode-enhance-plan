# Feature Lifecycle

Each non-trivial feature plan should move through explicit states.

## States

### `prepare`
Requirements, scope, and constraints are still being clarified.

### `ready`
A reviewable plan exists, but execution is not yet approved.

### `approved`
The user has explicitly approved execution.

### `building`
The feature has been handed off to build mode.

### `partial-done`
Some implementation is complete, but the plan needs to be updated before more work continues.

### `finished`
The tracked feature work is complete.

### `archived`
The feature plan is preserved for reference and reuse.

## Important rules

- `ready` does not mean implementation can begin.
- Only explicit user approval can move a feature to `approved`.
- `build` should begin from `handoff.md`, not from the entire planning history.
- A single active plan should focus on a single feature.

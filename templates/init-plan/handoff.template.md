## Feature Goal

- 

## Confirmed Scope

- 

## Current Todo Summary

1. 
2. 
3. 

## Execution Order

1. 
2. 
3. 

## Validation Steps

- 

## Execution Batching

Group todos into small batches to keep each build conversation focused and avoid context overflow.

### Batch 1
- Todo items: 
- Commit checkpoint: yes

### Batch 2
- Todo items: 
- Commit checkpoint: yes

> After completing each batch, commit and push your changes — **including the `plan/` directory** — then start a new conversation for the next batch. Uncommitted plan files (`plan.json`, `plan.md`, etc.) remain in the working tree and may be injected into context by OpenCode, adding unnecessary token overhead. Committing them keeps subsequent sessions clean and focused.

## Blockers And Caveats

- 

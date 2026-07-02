# Three-Way Skill Framework Benchmark

Snapshot date: 2026-06-30

Repositories inspected:

- `obra/superpowers` at `f268f7c`, 14 `SKILL.md` files.
- `addyosmani/agent-skills` at `aba7c4e`, 24 `SKILL.md` files.
- `mattpocock/skills` at `0877403`, 36 `SKILL.md` files, including deprecated and in-progress skills.

## Executive Result

Superpowers is the most automated and delegation-heavy framework. It is best when the agent should run a disciplined autonomous loop with worktrees, Test-Driven Development, subagents, reviews, and verification before completion.

Agent Skills is the broadest engineering lifecycle framework. It is best when a feature needs product specification, implementation slices, UI/API quality, security, performance, docs, CI/CD, observability, and launch checks.

Matt Pocock Skills is the strongest human-in-the-loop framework. It is best when the main risk is misalignment, weak domain language, or codebase entropy. It asks better questions, produces PRDs and issues, sharpens architecture, and keeps skills small and composable.

## Human-In-The-Loop vs Automation

| Framework | Human-in-loop | Automation | Delegation | Best use |
|---|---:|---:|---:|---|
| Superpowers | Medium | Very high | Very high | Long autonomous execution with review gates |
| Agent Skills | Medium-high | High | Medium-high | Broad production lifecycle delivery |
| Matt Pocock Skills | Very high | Medium | Low-medium | Alignment, PRDs, domain design, architecture repair |

## Skill-by-Skill Pattern

| Area | Superpowers | Agent Skills | Matt Pocock Skills |
|---|---|---|---|
| Router | `using-superpowers` | `using-agent-skills` | `ask-matt` |
| Clarification | `brainstorming` | `interview-me`, `idea-refine` | `grill-me`, `grill-with-docs`, `grilling` |
| PRD/spec | `brainstorming`, `writing-plans` | `spec-driven-development` | `to-prd` |
| Planning | `writing-plans` | `planning-and-task-breakdown` | `to-issues` |
| Implementation | `executing-plans`, `subagent-driven-development` | `incremental-implementation` | `implement` |
| TDD | `test-driven-development` | `test-driven-development` | `tdd` |
| Debugging | `systematic-debugging` | `debugging-and-error-recovery` | `diagnosing-bugs` |
| Review | `requesting-code-review`, `receiving-code-review` | `code-review-and-quality` | `review` in progress |
| Verification | `verification-before-completion` | `browser-testing-with-devtools`, `shipping-and-launch` | typecheck, focused tests, final suite via `implement` |
| Git/workflow | `using-git-worktrees`, `finishing-a-development-branch` | `git-workflow-and-versioning` | `git-guardrails-claude-code`, merge conflict skill |
| Architecture | implicit in plan/review flow | `api-and-interface-design`, `context-engineering`, `documentation-and-adrs` | `codebase-design`, `domain-modeling`, `improve-codebase-architecture` |
| Parallelism | `dispatching-parallel-agents`, `subagent-driven-development` | specialist agents and orchestration references | not the main focus |

## Benchmark Scores

The benchmark task was `TaskRadar`, a small React daily task planner. Each competitor produced a PRD, SPEC, and implementation using its repository style.

| Criterion | Superpowers | Agent Skills | Matt Pocock Skills |
|---|---:|---:|---:|
| Requirement alignment | 4 | 5 | 4 |
| Human-in-loop quality | 4 | 4 | 5 |
| Autonomy and delegation | 5 | 4 | 3 |
| PRD quality | 3 | 5 | 5 |
| SPEC quality | 4 | 5 | 4 |
| Implementation shape | 4 | 5 | 4 |
| Testability | 5 | 4 | 4 |
| Scope control | 4 | 4 | 5 |
| Accessibility | 3 | 5 | 4 |
| Verification discipline | 5 | 4 | 4 |

## Interpretation

Superpowers produced the strongest execution loop. Its version naturally centered the pure domain seam and test-first plan, but it spent less energy on product framing and accessibility detail.

Agent Skills produced the most complete product-engineering package. Its version had the broadest PRD, the clearest acceptance details, and the strongest accessibility checklist.

Matt Pocock Skills produced the clearest domain language. Its version was best at naming the problem, defining the product vocabulary, and keeping the implementation small. It delegates less automatically, but it reduces the chance of building the wrong thing.

## Recommendation

- Use Superpowers when you want a coding agent to keep moving through a serious implementation with minimal supervision.
- Use Agent Skills when you want a full product-engineering lifecycle with specialized quality gates.
- Use Matt Pocock Skills when you want the agent to think with you before it builds, especially around PRD quality, domain language, and architecture.

For Conductor experiments, run them in separate workspaces from the same base branch and give each one the exact same prompt. Do not mix all three routers in one workspace unless the goal is to study routing conflicts.

# Skill-by-Skill Framework Analysis

Date: 2026-07-01

Repos inspected locally:

- `obra/superpowers`: `.context/external/superpowers`
- `addyosmani/agent-skills`: `.context/external/agent-skills`
- `mattpocock/skills`: `.context/external/mattpocock-skills`

## Executive Comparison

| Framework | Active shape | Human-in-loop posture | Automation posture | Delegation posture | Best for |
|---|---|---|---|---|---|
| Superpowers | Compact methodology with 14 skills | High at design approval and finish decisions | High after approval | Highest, with explicit subagent-driven development | Ambiguous, long, risky, architectural work |
| Agent Skills | Broad SDLC pack with 24 skills | Medium-high via phase checkpoints | Medium-high via lifecycle commands and validation gates | Medium, more review-persona oriented than implementation-delegation oriented | Feature delivery, QA breadth, launch readiness |
| Matt Pocock's Skills | Practical daily toolkit, 25 active skills outside deprecated and in-progress | Highest user control, many user-invoked commands | Medium, focused loops rather than whole-process automation | Medium-low by default, but strong handoff and issue slicing | Senior engineer daily workflow, requirement grilling, TDD, debugging, architecture |

## Skill Counts

| Framework | Count used in analysis | Notes |
|---|---:|---|
| Superpowers | 14 | All current `skills/*/SKILL.md` files |
| Agent Skills | 24 | All current `skills/*/SKILL.md` files |
| Matt Pocock's Skills | 25 | Active skills excluding `deprecated` and `in-progress`; 36 total if all `SKILL.md` files are counted |

## Human-in-Loop vs Automation Scale

Scores are qualitative:

- Human-in-loop: 1 means mostly autonomous, 5 means strong user checkpoints.
- Automation: 1 means mostly advisory, 5 means drives execution end-to-end.
- Delegation: 1 means no meaningful delegation, 5 means explicit agent fan-out or subagent workflow.

| Framework | Human-in-loop | Automation | Delegation |
|---|---:|---:|---:|
| Superpowers | 4 | 5 | 5 |
| Agent Skills | 4 | 4 | 3 |
| Matt Pocock's Skills | 5 | 3 | 2 |

Superpowers is not "less human-in-loop" at the start. It is highly gated before implementation. But once the user approves design and plan, it is the most autonomous and the most delegation-native.

Agent Skills has human checkpoints across phases and more automated validation breadth, but it does not center the implementation process on subagents in the same direct way.

Matt Pocock's Skills keeps the human closest to the wheel. Many important skills are user-invoked, which means the model cannot silently route into them. That is good for control, but less automatic.

## Superpowers: Skill-by-Skill

| Skill | Main purpose | Human-in-loop | Automation/delegation |
|---|---|---|---|
| `using-superpowers` | Meta-router that forces skill checks before action | Medium, because it follows user instructions first | High automatic routing |
| `brainstorming` | Clarify intent and produce approved design | Very high, requires approval before implementation | Low implementation automation, high process control |
| `using-git-worktrees` | Ensure isolated workspace | Medium, may ask consent before creating worktree | Medium automation around workspace safety |
| `writing-plans` | Produce detailed task plan | High, plan review expected | Medium, creates executable plan |
| `subagent-driven-development` | Execute plan with fresh implementer and reviewer subagents | Low after approval | Very high automation and delegation |
| `executing-plans` | Execute written plan in-session | Medium checkpoints | High automation, lower delegation than SDD |
| `dispatching-parallel-agents` | Split independent work across agents | Low once domains are clear | Highest delegation pattern |
| `test-driven-development` | Strict red-green-refactor | Medium, strict process more than user checkpoint | High behavioral automation |
| `systematic-debugging` | Root-cause debugging before fixes | Medium | Medium automation |
| `requesting-code-review` | Dispatch focused code reviewer | Medium | High review delegation |
| `receiving-code-review` | Process review feedback carefully | High if feedback unclear | Medium |
| `verification-before-completion` | No completion claim without evidence | Low user input, high evidence gate | High validation automation |
| `finishing-a-development-branch` | Final verification and merge/PR/keep/discard choice | Very high, asks final integration choice | Medium automation after choice |
| `writing-skills` | Create and test new skills | Medium-high | Medium |

### Superpowers Summary

Superpowers is the most delegation-native. Its center is not "a list of best practices"; it is a method: clarify, approve, plan, isolate, execute with subagents, review, verify, finish. It is best when the agent should run for a while without losing the plot.

## Agent Skills: Skill-by-Skill

| Skill | Main purpose | Human-in-loop | Automation/delegation |
|---|---|---|---|
| `using-agent-skills` | Route work by lifecycle phase | Medium | High routing automation |
| `interview-me` | Extract user intent one question at a time | Very high | Low |
| `idea-refine` | Diverge and converge on ideas | High | Low-medium |
| `spec-driven-development` | Create a spec before code | Very high, gated phases | Medium |
| `planning-and-task-breakdown` | Convert spec into tasks | High | Medium |
| `incremental-implementation` | Deliver thin vertical slices | Medium | High implementation discipline |
| `test-driven-development` | Test-first logic and fixes | Medium | High validation discipline |
| `context-engineering` | Improve agent context | Medium | Medium |
| `source-driven-development` | Ground framework decisions in official docs | Medium | Medium-high research automation |
| `doubt-driven-development` | Adversarial review of decisions | Medium-high | Medium |
| `frontend-ui-engineering` | Build production UI | Medium | Medium |
| `api-and-interface-design` | Design contracts and boundaries | Medium-high | Medium |
| `browser-testing-with-devtools` | Verify in browser via DevTools MCP | Low-medium | High if MCP is available |
| `debugging-and-error-recovery` | Reproduce, localize, reduce, fix, guard | Medium | Medium-high |
| `code-review-and-quality` | Five-axis review | Medium | Medium-high review automation |
| `code-simplification` | Reduce complexity safely | Medium | Medium |
| `security-and-hardening` | Threat modeling and hardening | High for risky changes | Medium |
| `performance-optimization` | Measure-first performance | Medium | Medium |
| `git-workflow-and-versioning` | Atomic commits and workflow | Medium | Medium |
| `ci-cd-and-automation` | Build quality gates | High for pipeline choices | Medium |
| `deprecation-and-migration` | Remove or migrate systems | High | Medium |
| `documentation-and-adrs` | Record decisions | Medium | Medium |
| `observability-and-instrumentation` | Add logs, metrics, traces | Medium-high | Medium |
| `shipping-and-launch` | Launch checklist and rollback planning | High | Medium-high |

### Agent Skills Summary

Agent Skills is the broadest SDLC coverage. It has the best "senior engineering checklist" feel: product definition, API design, UI, security, performance, documentation, observability, CI/CD, and launch. It delegates less explicitly than Superpowers, but validates more dimensions by default.

## Matt Pocock's Skills: Skill-by-Skill

Matt's repo explicitly separates user-invoked and model-invoked skills. User-invoked skills keep control with the human. Model-invoked skills provide reusable discipline the agent can reach for.

| Skill | Invocation | Main purpose | Human-in-loop | Automation/delegation |
|---|---|---|---|---|
| `ask-matt` | User | Router over user-invoked skills | Very high | Low |
| `grill-with-docs` | User | Requirement grilling plus docs | Very high | Medium, updates docs |
| `triage` | User | Move issues through triage state machine | High | Medium |
| `improve-codebase-architecture` | User | Scan architecture and produce report | High | Medium-high analysis automation |
| `setup-matt-pocock-skills` | User | Configure issue tracker and domain docs | Very high | Medium setup automation |
| `to-issues` | User | Break plan or PRD into issues | High | Medium |
| `to-prd` | User | Synthesize current conversation into PRD | Medium-high | Medium |
| `implement` | User | Implement from PRD or issues | Medium | Medium-high |
| `grill-me` | User | Relentless requirement interview | Very high | Low |
| `handoff` | User | Produce handoff for another agent | High | Medium delegation support |
| `teach` | User | Teach a concept over sessions | Very high | Medium |
| `writing-great-skills` | User | Skill-writing reference | High | Medium |
| `edit-article` | User | Edit articles | High | Medium |
| `prototype` | Model | Throwaway prototype for design question | Medium | Medium-high |
| `diagnosing-bugs` | Model | Reproduce, minimize, hypothesize, instrument, fix | Medium | Medium |
| `tdd` | Model | Red-green-refactor | Medium | High feedback-loop automation |
| `domain-modeling` | Model | Build domain model and ADRs | High | Medium |
| `codebase-design` | Model | Deep-module design vocabulary | Medium | Medium |
| `resolving-merge-conflicts` | Model | Resolve merge/rebase conflicts | Medium | Medium |
| `git-guardrails-claude-code` | Model | Add hooks to block dangerous git commands | High for setup | Medium automation |
| `migrate-to-shoehorn` | Model | Migrate test assertions | Low-medium | Medium |
| `scaffold-exercises` | Model | Create exercise structures | Medium | Medium |
| `setup-pre-commit` | Model | Configure pre-commit hooks | High | Medium |
| `obsidian-vault` | Model | Manage notes | High | Medium |
| `grilling` | Model | Reusable grilling loop | High | Low |

### Matt Pocock's Skills Summary

Matt Pocock's pack is the most human-controlled. It is not designed as a full autonomous framework. It is a sharp toolbelt: grill requirements, write PRDs, slice issues, use TDD, diagnose bugs, improve architecture, and set guardrails. It is best when a senior engineer wants agents to behave better without adopting a full methodology.

## Area-by-Area Comparison

| Area | Superpowers | Agent Skills | Matt Pocock's Skills |
|---|---|---|---|
| Requirements | `brainstorming` | `interview-me`, `idea-refine`, `spec-driven-development` | `grill-me`, `grill-with-docs`, `grilling` |
| PRD/spec | `brainstorming`, `writing-plans` | `spec-driven-development` | `to-prd` |
| Planning | `writing-plans` | `planning-and-task-breakdown` | `to-issues` |
| Implementation | `subagent-driven-development`, `executing-plans` | `incremental-implementation` | `implement`, `tdd` |
| TDD | Very strict `test-driven-development` | Broad `test-driven-development` | Practical `/tdd` |
| Debugging | `systematic-debugging` | `debugging-and-error-recovery` | `diagnosing-bugs` |
| Review | `requesting-code-review`, `receiving-code-review` | `code-review-and-quality` | `review` is in-progress; architecture skills help |
| Browser/UI | Indirect | `frontend-ui-engineering`, `browser-testing-with-devtools` | `prototype`, TDD, architecture guidance |
| Security | Indirect via review | Dedicated `security-and-hardening` | Indirect |
| Performance | Indirect via review/debugging | Dedicated `performance-optimization` and web performance persona | Diagnosing/performance regression loop |
| Launch | `finishing-a-development-branch` | `shipping-and-launch`, `ci-cd-and-automation` | Pre-commit and issue workflow helpers |
| Delegation | Native subagent workflow | Personas and orchestration references | Handoff and issue slicing |

## Preliminary Verdict Before Code Benchmark

| Question | Likely answer |
|---|---|
| Most human-in-loop | Matt Pocock's Skills |
| Most automated after approval | Superpowers |
| Delegates most naturally to agents | Superpowers |
| Broadest quality coverage | Agent Skills |
| Best for ambiguous product work | Superpowers or Matt Pocock's `/grill-with-docs`, depending on desired autonomy |
| Best for straightforward feature delivery | Agent Skills |
| Best for daily senior-engineer workflow | Matt Pocock's Skills |
| Best for launch readiness | Agent Skills |


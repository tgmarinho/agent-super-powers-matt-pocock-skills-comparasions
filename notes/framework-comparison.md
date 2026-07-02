# Superpowers vs Agent Skills vs Matt Pocock Skills Comparison

Snapshot date: 2026-06-30

Local clones:

- Superpowers: `obra/superpowers` at `f268f7c`, latest fetched commit message: `Release v6.1.0: leaner per-session bootstrap, Codex marketplace install, Gemini removed`
- Agent Skills: `addyosmani/agent-skills` at `aba7c4e`, latest fetched commit message: `Merge pull request #323 from An-idd/feat/validate-naming-and-trigger`
- Matt Pocock Skills: `mattpocock/skills` at `0877403`, latest fetched commit message: `Merge pull request #398 from mattpocock/generalize-decision-mapping`

External reference:

- Om Mishra, `/superpowers vs /agent-skills: Faster Shipping or Safer Reasoning?`, published on LinkedIn on 2026-06-20: <https://www.linkedin.com/pulse/superpowers-vs-agent-skills-faster-shipping-safer-reasoning-om-mishra-dzakf/>

## Executive Summary

Superpowers is a compact, forceful methodology for autonomous coding-agent work. It pushes hard on upfront brainstorming, written plans, isolated worktrees, strict Test-Driven Development, subagent-driven implementation, repeated review, and evidence before completion.

Agent Skills is a broader engineering lifecycle pack. It maps work across Define, Plan, Build, Verify, Review, and Ship with many focused skills, slash commands, specialist review personas, and checklists for UI, security, performance, docs, CI/CD, observability, and launch.

Matt Pocock Skills is a smaller, more human-in-the-loop engineering toolkit. It emphasizes grilling, PRDs, issues, shared domain language, TDD, bug diagnosis, and architecture repair.

Use Superpowers when the experiment is about disciplined autonomous execution and reasoning quality. Use Agent Skills when the experiment is about breadth, validation coverage, and full product-engineering lifecycle support. Use Matt Pocock Skills when the experiment is about alignment, PRD quality, domain language, and human control.

See `.context/skill-framework-benchmark/report.md` for the three-way tabletop benchmark with PRD, SPEC, and implementation artifacts.

## Om Mishra Reference Notes

The LinkedIn article is useful because it describes a same-conditions experiment:

- IDE: Claude Code.
- Model: Claude Sonnet 4.6.
- Reasoning: Medium.
- Permissions: all granted.
- Execution mode: sub-agentic.
- Repository, prompt, and base conditions: identical.
- Isolation: independent worktrees with no shared context.
- Only variable: skill framework.

Reported behavior:

| Dimension | Superpowers | Agent Skills |
|---|---|---|
| Skills used | `brainstorming-plan`, `writing-plans`, `test-driven-development`, `verification-before-completion` | `spec-driven-development`, `planning-and-task-breakdown`, `test-driven-development`, `incremental-implementation`, `build` |
| First code change | About 12 minutes | About 8 minutes |
| Total time | About 22 minutes | About 22 minutes |
| Validation passes | 5 targeted passes | 7 passes, including full 446-test suite |
| Tests added | 7 tests | 8 tests |
| Replans | 1 | 1 |
| Context rereads | 0 | 0 |
| Main edge in the article | Heavier upfront reasoning for production evolution and architecture | Broader validation depth for a well-understood implementation |

Takeaway for Thiago's experiment: the page feature should be judged less by "who finishes first" and more by process behavior: planning allocation, validation scope, test or lint evidence, scope control, UI quality, and whether the agent adapts to repo conventions.

## Repo-Level Comparison

| Dimension | Superpowers | Agent Skills | Matt Pocock Skills |
|---|---|---|---|
| Core framing | Complete software development methodology for coding agents | Production-grade engineering skills for AI coding agents | Skills for real engineers, not vibe coding |
| Shape | Smaller skill set with stronger workflow gates | Larger lifecycle pack with specialized skills and personas | Composable, user-invoked and model-invoked toolkit |
| Skill count in clone | 14 | 24 | 25 active, 36 total including deprecated and in-progress |
| Primary flow | Brainstorm, worktree, plan, execute with subagents, review, finish | Spec, plan, build, test, review, ship, with optional specialized tracks | Grill, PRD, issues, TDD, diagnosis, architecture improvement |
| Strongest differentiator | Subagent-driven development plus git-worktree isolation | Broad phase coverage plus review/security/performance personas | Human alignment, domain language, and codebase design |
| TDD posture | Very strict: no production code before a failing test | Strict, but framed as a broader test strategy and proof loop | Practical feedback loop at pre-agreed seams |
| Autonomy posture | Optimized for long autonomous stretches after approval | Optimized for human checkpoints across lifecycle phases | Optimized for human control and focused invocation |
| Risk | Can feel heavy for small changes | Can over-broaden scope | Less complete as an autonomous delivery system |

## Superpowers Skill Inventory

| Skill | What it is best at |
|---|---|
| `using-superpowers` | Meta-router that requires checking relevant skills before action |
| `brainstorming` | Clarifying and designing features before implementation |
| `using-git-worktrees` | Creating or detecting isolated workspaces before work starts |
| `writing-plans` | Producing detailed implementation plans with bite-sized tasks |
| `subagent-driven-development` | Running plan tasks through fresh implementer and reviewer subagents |
| `executing-plans` | Executing a written plan without subagent-driven mode |
| `dispatching-parallel-agents` | Splitting independent investigations across parallel agents |
| `test-driven-development` | Enforcing red, green, refactor for features and fixes |
| `systematic-debugging` | Root-cause debugging before proposing fixes |
| `requesting-code-review` | Dispatching focused review after tasks or before merge |
| `receiving-code-review` | Handling review feedback with verification before implementation |
| `verification-before-completion` | Preventing completion claims without fresh evidence |
| `finishing-a-development-branch` | Final test verification plus merge, PR, keep, or discard decision |
| `writing-skills` | Creating and testing new skills as process documentation |

## Agent Skills Inventory

| Skill | What it is best at |
|---|---|
| `using-agent-skills` | Routing tasks to the right lifecycle skill |
| `interview-me` | Extracting intent one question at a time |
| `idea-refine` | Divergent and convergent thinking before a spec |
| `spec-driven-development` | Writing a structured spec before code |
| `planning-and-task-breakdown` | Turning a spec into ordered, verifiable tasks |
| `incremental-implementation` | Delivering thin vertical slices |
| `test-driven-development` | Red, green, refactor plus test strategy |
| `context-engineering` | Curating agent context and rules files |
| `source-driven-development` | Grounding framework decisions in official docs |
| `doubt-driven-development` | Fresh-context adversarial review of non-trivial decisions |
| `frontend-ui-engineering` | Production-quality UI implementation |
| `api-and-interface-design` | Stable contracts and module boundaries |
| `browser-testing-with-devtools` | Live browser verification through DevTools MCP |
| `debugging-and-error-recovery` | Reproduce, localize, reduce, fix, guard |
| `code-review-and-quality` | Five-axis review: correctness, readability, architecture, security, performance |
| `code-simplification` | Reducing complexity while preserving behavior |
| `security-and-hardening` | Threat modeling and secure implementation guardrails |
| `performance-optimization` | Measure-first performance work |
| `git-workflow-and-versioning` | Atomic commits, branch discipline, and parallel work organization |
| `ci-cd-and-automation` | Quality gate and deployment pipeline design |
| `deprecation-and-migration` | Removing or migrating old systems safely |
| `documentation-and-adrs` | Recording architectural decisions and durable docs |
| `observability-and-instrumentation` | Logging, metrics, tracing, and production visibility |
| `shipping-and-launch` | Launch checklist, rollout, rollback, monitoring |

## Matt Pocock Skills Inventory

| Skill | What it is best at |
|---|---|
| `ask-matt` | Choosing the right user-invoked workflow |
| `grill-with-docs` | Clarifying requirements while sharpening project context |
| `triage` | Moving issues through category and state roles |
| `improve-codebase-architecture` | Finding architecture improvement opportunities |
| `setup-matt-pocock-skills` | Configuring issue tracker and docs layout |
| `to-issues` | Breaking PRDs and specs into agent-ready vertical slices |
| `to-prd` | Turning the current conversation into a PRD |
| `prototype` | Building throwaway prototypes for logic or UI questions |
| `diagnosing-bugs` | Reproduce, minimize, hypothesize, instrument, fix, regression-test |
| `tdd` | Red-green-refactor at agreed seams |
| `domain-modeling` | Building shared language and domain context |
| `codebase-design` | Designing deep modules with narrow interfaces |
| `grill-me` | General non-code clarification |
| `handoff` | Preparing another agent to continue |
| `teach` | Teaching a concept with stateful workspace notes |
| `writing-great-skills` | Writing predictable skills |

## Equivalent Areas

| Area | Superpowers | Agent Skills | Matt Pocock Skills |
|---|---|---|---|
| Meta-routing | `using-superpowers` | `using-agent-skills` | `ask-matt` |
| Requirements discovery | `brainstorming` | `interview-me`, `idea-refine`, `spec-driven-development` | `grill-me`, `grill-with-docs`, `grilling` |
| Planning | `writing-plans` | `planning-and-task-breakdown` | `to-prd`, `to-issues` |
| Implementation loop | `subagent-driven-development`, `executing-plans` | `incremental-implementation` | `implement`, `tdd` |
| TDD | `test-driven-development` | `test-driven-development` | `tdd` |
| Debugging | `systematic-debugging` | `debugging-and-error-recovery` | `diagnosing-bugs` |
| Review | `requesting-code-review`, `receiving-code-review` | `code-review-and-quality`, personas in `agents/` | `review` in progress |
| Verification | `verification-before-completion` | `browser-testing-with-devtools`, `shipping-and-launch`, review gates | focused tests, typecheck, final suite via `implement` |
| Git/worktrees | `using-git-worktrees`, `finishing-a-development-branch` | `git-workflow-and-versioning` | `git-guardrails-claude-code`, resolving merge conflicts |
| Parallelism | `dispatching-parallel-agents`, `subagent-driven-development` | Review personas and orchestration references | not the main focus |
| Skill creation | `writing-skills` | Skill anatomy and contribution docs | `writing-great-skills` |

## Recommended Head-to-Head Feature

Ask all three tools to implement the same feature in separate Conductor workspaces:

> Add a bilingual `/lab/agent-skills` page to `tgmarinho-ai-website` that compares Superpowers, Agent Skills, and Matt Pocock Skills using a static, data-driven UI.

Why this is a good test:

- It is real enough for this website and aligned with Thiago's current research.
- It exercises bilingual routing, metadata, sitemap updates, static data modeling, UI composition, accessibility, and responsive behavior.
- It does not require new external services, secrets, package installs, or content generation.
- It is scoped enough for one agent session, but broad enough to reveal each tool's process discipline.
- It lets the final output be evaluated by diff quality, verification evidence, design fit, and whether each agent followed repository rules.

See `.context/agent-skill-feature-brief.md` for the neutral implementation brief.

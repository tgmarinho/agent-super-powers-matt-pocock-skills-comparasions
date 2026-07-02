# Evidence For The Comparison

Snapshot reviewed on 2026-07-01.

This file records the source evidence behind the blog post claim:

Use Superpowers when the problem still needs careful thinking before code. Use
Agent Skills when the problem is already clear and needs broad validation. Use
Matt Pocock Skills when you want a lighter set of commands for requirement
alignment, Test-Driven Development (TDD), debugging, and architecture work.

## Source Snapshots

| Project | Snapshot commit | Local snapshot |
|---|---|---|
| Superpowers | `f268f7c953744036f0fa7e9d4b73535c04e57cb8` | `upstream-snapshots/superpowers/` |
| Agent Skills | `aba7c4e9695c363e65cb59effe926c7f1d1abe3d` | `upstream-snapshots/agent-skills/` |
| Matt Pocock Skills | `0877403d1e867fd9d574117e9b34ade404f36d2a` | `upstream-snapshots/mattpocock-skills/` |

## Claim 1: Superpowers Is Best When The Problem Needs Thinking Before Code

Why, how, and what:

| Question | Answer |
|---|---|
| Why | The main risk is implementing too early without understanding the problem. |
| How | Superpowers starts with brainstorming, design approval, and planning, then moves into TDD, worktrees, subagents, and review loops. |
| What | The output is a trail of reasoning, plan, execution, review, and verification evidence. |

Evidence:

- `upstream-snapshots/superpowers/README.md` presents Superpowers as a complete
  software development methodology for coding agents.
- The same README says the agent should not jump straight into code when it sees
  that you are building something. It should step back and clarify what you are
  trying to do.
- `upstream-snapshots/superpowers/skills/brainstorming/SKILL.md` requires the
  agent to understand context, ask questions one at a time, present the design,
  and get user approval.
- That same brainstorming skill says the user reviews the written spec before
  implementation planning starts.
- `upstream-snapshots/superpowers/skills/subagent-driven-development/SKILL.md`
  executes an approved plan by dispatching implementer and reviewer subagents,
  then continues without pausing between tasks unless blocked, genuinely
  ambiguous, or complete.

Interpretation:

Superpowers is not simply a coding prompt pack. It is a methodology that gates
implementation behind design approval and then lets the agent execute a planned
workflow with subagents and review loops. That supports using it for ambiguous,
risky, or architectural work.

## Claim 2: Agent Skills Is Best When The Problem Is Clear And Needs Broad Validation

Why, how, and what:

| Question | Answer |
|---|---|
| Why | The main risk is missing a quality concern before shipping. |
| How | Agent Skills routes work through lifecycle phases and dedicated skills for UI, API, tests, review, security, performance, observability, and launch. |
| What | The output is a product-engineering checklist style delivery with broad validation. |

Evidence:

- `upstream-snapshots/agent-skills/README.md` organizes the workflow around
  `/spec`, `/plan`, `/build`, `/test`, `/review`, and `/ship`.
- The README lists 24 skills across lifecycle phases, including UI, API,
  browser testing, debugging, code review, security, performance, CI/CD,
  documentation, observability, and launch.
- `upstream-snapshots/agent-skills/skills/using-agent-skills/SKILL.md` routes
  work to dedicated skills based on phase and concern.
- The same file says every skill includes a verification step and that a task is
  not complete until verification passes.
- `upstream-snapshots/agent-skills/commands/build.toml` documents `/build auto`,
  which runs a whole approved plan while preserving per-task verification.

Interpretation:

Agent Skills has the broadest delivery coverage. It is strongest when the
feature goal is already clear and the agent needs to remember the quality gates
that production engineering normally requires.

## Claim 3: Matt Pocock Skills Keeps More Control With The Human

Why, how, and what:

| Question | Answer |
|---|---|
| Why | The main risk is the agent drifting away from human intent or adding too much process. |
| How | The human calls focused commands for requirement grilling, PRDs, issue slicing, TDD, debugging, and architecture review. |
| What | The output is a smaller, more controlled toolkit for specific engineering decisions. |

Evidence:

- `upstream-snapshots/mattpocock-skills/README.md` presents the repository as
  daily skills for real engineering, not vibe coding.
- The README emphasizes requirement grilling, shared language, TDD, debugging,
  PRD generation, issue slicing, and architecture improvement.
- `upstream-snapshots/mattpocock-skills/docs/invocation.md` separates
  user-invoked skills from model-invoked skills.
- That invocation document says user-invoked skills are reachable only when the
  human types their name and use `disable-model-invocation: true`.
- In the reviewed snapshot, there were 25 active skills outside `deprecated` and
  `in-progress`, and 13 of those active skills were user-invoked.
- User-invoked examples include `grill-me`, `grill-with-docs`, `to-prd`,
  `to-issues`, `triage`, `improve-codebase-architecture`, and `implement`.
- Model-invoked examples include `tdd`, `diagnosing-bugs`, `codebase-design`,
  `domain-modeling`, and `prototype`.

Interpretation:

Matt Pocock Skills is less like a whole autonomous delivery framework and more
like a practical engineering toolbelt. The split between user-invoked and
model-invoked skills supports the claim that the human decides more often.

## Benchmark Evidence

The benchmark artifacts are secondary evidence. They show how these operating
styles appeared in controlled React tasks, but they do not prove general
performance across models, repositories, or prompts.

Included artifacts:

- `benchmarks/skill-benchmark/`: full React Todo Decision Board implementation
  benchmark with PRD, SPEC, implementation notes, and source files for each
  competitor.
- `benchmarks/skill-framework-benchmark/`: smaller TaskRadar tabletop benchmark
  with shared prompt, PRD, SPEC, implementation, and scoring report.

Observed pattern:

- Superpowers produced the strongest execution loop and the clearest separation
  between pure logic and React.
- Agent Skills produced the most complete product-delivery package, especially
  around validation and accessibility.
- Matt Pocock Skills produced the clearest domain language and the smallest
  process footprint.

## Post-Implementation React Quality Review

The first benchmark score mixes process, PRD, SPEC, validation, and
implementation shape. A separate code-quality review should use React, React
Patterns, Next.js, and Vercel skills as judges after implementation, not as
helpers during implementation.

For this benchmark, the applicable review lens is React. The app is plain React
in a Vite-style setup, so Next.js and Vercel criteria such as Server Components,
App Router routes, image optimization, caching, deployment, and observability are
out of scope. Their useful role here is to flag that this benchmark does not
measure production readiness on a Next/Vercel stack.

| React code criterion | Superpowers | Agent Skills | Matt Pocock Skills |
|---|---:|---:|---:|
| State model | 4 | 4 | 5 |
| Type safety and data validation | 4 | 4 | 5 |
| Interface accessibility | 4 | 5 | 4 |
| `localStorage` resilience | 3 | 3 | 5 |
| Responsive visual polish | 4 | 5 | 4 |
| Maintainability | 4 | 4 | 5 |
| **React total** | **23** | **25** | **28** |

React review summary:

- Superpowers is simple and readable, with good pure helper functions and
  malformed JSON handling on storage reads. It does not handle storage write
  failures, and state grows inside the component.
- Agent Skills has the strongest accessibility and UI polish, including explicit
  labels, alert feedback, live count updates, CSS variables, and responsive
  layout. It also does not handle storage write failures.
- Matt Pocock Skills has the strongest internal React model. `useReducer`
  centralizes state transitions, actions make behavior easier to audit, filter
  values are validated before entering state, and storage read/write failures
  produce user-visible messages.

## Limits

This is a practical source review and benchmark, not a scientific benchmark.
The conclusions should be read as workflow guidance, not universal performance
claims.

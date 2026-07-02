# Evidence For The Main Takeaway

Snapshot reviewed locally on 2026-07-01.

This file documents the evidence behind the main claim in the comparison:

- Matt Pocock Skills keeps more decisions with the human.
- Superpowers gives the agent more autonomy after approval.
- Agent Skills sits between them, with broad lifecycle coverage.

This is not a statistically rigorous benchmark claim. It is a source-file reading, supported by the included benchmark artifacts.

## Summary

| Claim | Strongest evidence | Interpretation |
|---|---|---|
| Matt Pocock Skills keeps more decisions with the human | Explicit user-invoked vs model-invoked split, 13 active user-invoked skills, core orchestration skills gated behind human slash commands | The agent cannot silently route into many high-level workflows. The human chooses when to grill, create PRDs, slice issues, improve architecture, or invoke implementation. |
| Superpowers gives more autonomy after approval | Brainstorming hard gate before implementation, then planning, worktrees, subagent-driven development, review loops, and verification | Superpowers asks for approval up front, then tells the agent to keep executing the plan without human check-ins between tasks unless blocked. |
| Agent Skills sits between them | Lifecycle command map from define to ship, 24 skills, gated spec workflow, `/build auto` for one-pass execution after plan approval | It has more built-in coverage than Matt Pocock Skills and more phase gates than a fully autonomous executor. It automates delivery, but keeps many checkpoints and quality gates. |

## Matt Pocock Skills

### Invocation model

Source:

- `upstream-snapshots/mattpocock-skills/docs/invocation.md`
- `upstream-snapshots/mattpocock-skills/README.md`

Evidence:

- The invocation guide defines user-invoked skills as reachable only by the human typing the skill name.
- User-invoked skills set `disable-model-invocation: true`.
- The guide says nothing but the human can reach a user-invoked skill.
- The top-level README groups skills into user-invoked and model-invoked sections.

Count from the snapshot:

```bash
find upstream-snapshots/mattpocock-skills/skills \
  -path '*/deprecated/*' -prune -o \
  -path '*/in-progress/*' -prune -o \
  -name SKILL.md -print | wc -l

find upstream-snapshots/mattpocock-skills/skills \
  -path '*/deprecated/*' -prune -o \
  -path '*/in-progress/*' -prune -o \
  -name SKILL.md -print | xargs rg -l '^disable-model-invocation: true' | wc -l
```

Observed result:

- 25 active `SKILL.md` files.
- 13 active user-invoked skills.

Key user-invoked skills:

- `skills/productivity/grill-me/SKILL.md`
- `skills/engineering/grill-with-docs/SKILL.md`
- `skills/engineering/to-prd/SKILL.md`
- `skills/engineering/to-issues/SKILL.md`
- `skills/engineering/triage/SKILL.md`
- `skills/engineering/improve-codebase-architecture/SKILL.md`
- `skills/engineering/setup-matt-pocock-skills/SKILL.md`
- `skills/engineering/implement/SKILL.md`

Why this supports the claim:

Matt Pocock Skills does not only include human checkpoints. It makes many high-level workflows human-selected by design. The strongest evidence is the `disable-model-invocation: true` frontmatter on core skills, plus the README's explicit distinction between skills the human invokes and skills the model can invoke automatically.

## Superpowers

### Upfront human approval

Source:

- `upstream-snapshots/superpowers/skills/brainstorming/SKILL.md`

Evidence:

- The brainstorming skill has a hard gate: do not invoke implementation skills, write code, scaffold, or take implementation action until the design has been presented and approved.
- The checklist requires clarifying questions, design presentation, a design doc, spec self-review, and user review before moving to implementation planning.

### Autonomous execution after approval

Source:

- `upstream-snapshots/superpowers/README.md`
- `upstream-snapshots/superpowers/skills/subagent-driven-development/SKILL.md`

Evidence:

- The README says that after design signoff, the agent creates an implementation plan.
- It then says that once the user says "go", the agent launches subagent-driven development.
- The same section says it is not uncommon for the agent to work autonomously for a couple hours without deviating from the plan.
- The subagent-driven development skill says to dispatch a fresh implementer subagent per task, run task review after each task, and run a broad whole-branch review at the end.
- Its continuous execution rule says not to pause to check in with the human between tasks. The only stop reasons are being blocked, genuine ambiguity, or all tasks complete.

Why this supports the claim:

Superpowers is human-gated before implementation, not fully hands-off from the first prompt. But after approval, its own instructions push the agent through planning, isolated execution, subagents, reviews, and verification with fewer human interruptions than Matt Pocock Skills.

## Agent Skills

### Lifecycle coverage

Source:

- `upstream-snapshots/agent-skills/README.md`
- `upstream-snapshots/agent-skills/skills/using-agent-skills/SKILL.md`

Evidence:

- The README frames the system as `DEFINE`, `PLAN`, `BUILD`, `VERIFY`, `REVIEW`, and `SHIP`.
- It lists 24 skills total.
- The skill list covers spec writing, planning, incremental implementation, TDD, context engineering, source-driven development, doubt-driven development, UI, API design, browser testing, debugging, review, simplification, security, performance, git workflow, CI/CD, migration, documentation, observability, and launch.
- The meta-skill routes tasks across those lifecycle phases.

### Human checkpoints plus automation

Source:

- `upstream-snapshots/agent-skills/README.md`
- `upstream-snapshots/agent-skills/skills/spec-driven-development/SKILL.md`

Evidence:

- The README says `/build auto` generates a plan and implements every task in a single approved pass.
- It also says this removes human stepping between tasks, but not verification, and that it pauses on failures or risky steps.
- The spec-driven development skill defines a gated workflow: `SPECIFY`, `PLAN`, `TASKS`, `IMPLEMENT`, with human review at each phase.

Why this supports the claim:

Agent Skills has more automated lifecycle routing and broader quality coverage than Matt Pocock Skills. It also preserves phase gates, assumption surfacing, stop-on-confusion behavior, and validation checks. That places it between Matt Pocock's human-selected toolkit and Superpowers' more explicit autonomous subagent execution loop.

## Benchmark Evidence

Source:

- `benchmarks/skill-framework-benchmark/report.md`
- `benchmarks/skill-benchmark/skill-analysis.md`

Evidence:

- The tabletop benchmark scored Superpowers highest for autonomy and delegation.
- It scored Matt Pocock Skills highest for human-in-loop quality.
- It scored Agent Skills strongest for broad product-engineering coverage.
- The skill-by-skill analysis describes the same pattern: Superpowers is most delegation-native, Agent Skills has the broadest lifecycle coverage, and Matt Pocock Skills keeps the human closest to the wheel.

How to read this:

The benchmark artifacts are useful supporting evidence, but weaker than the source files. They show how the skill instructions shaped one controlled task. They do not prove general performance across all repositories, models, prompts, or agent harnesses.

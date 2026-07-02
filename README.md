# Agent Skill Framework Comparisons

Comparison material for three coding-agent skill systems:

- [Superpowers](https://github.com/obra/superpowers)
- [Agent Skills](https://github.com/addyosmani/agent-skills)
- [Matt Pocock Skills](https://github.com/mattpocock/skills)

This repository collects the source snapshots, benchmark prompts, PRDs, specs,
sample implementations, and notes used for the blog post:

- PT-BR: https://tgmarinhopro.com/blog/superpowers-vs-agent-skills-vs-matt-pocock-skills-qual-usar
- EN: https://tgmarinhopro.com/en/blog/superpowers-vs-agent-skills-vs-matt-pocock-skills-which-to-use
- Evidence trail: [EVIDENCE.md](EVIDENCE.md)

## Main Takeaway

The claim that motivated this comparison is mostly supported by the skill files:

- Matt Pocock Skills keeps more decisions with the human. Many core workflows
  are user-invoked and centered on grilling, PRDs, issue shaping, domain
  language, and architecture discussion.
- Superpowers gives the agent more autonomy after approval. It requires upfront
  design approval, then pushes the agent through plans, worktrees, subagents,
  review loops, and verification with fewer human interruptions.
- Agent Skills sits between them, with broad lifecycle coverage across spec,
  planning, implementation, UI, API, security, performance, docs, CI/CD,
  observability, and launch.

See [EVIDENCE.md](EVIDENCE.md) for the source-file evidence behind these
claims, including invocation rules, skill counts, workflow gates, and benchmark
support.

## Repository Layout

```txt
benchmarks/
  skill-benchmark/              # Full benchmark task and HTML implementations
  skill-framework-benchmark/    # Tabletop PRD, SPEC, implementation, and report

EVIDENCE.md                     # Source-file evidence for the main takeaway
SOURCES.md                      # Upstream repos, commits, and reference links

blog-post/
  pt-BR.mdx                     # Portuguese post source snapshot
  en.mdx                        # English post source snapshot

notes/
  framework-comparison.md       # Working comparison notes
  feature-brief.md              # Conductor benchmark feature brief

upstream-snapshots/
  superpowers/                  # Source snapshot without .git
  agent-skills/                 # Source snapshot without .git
  mattpocock-skills/            # Source snapshot without .git
```

## Source Snapshot

Snapshot date: 2026-06-30 and 2026-07-01 local review.

Observed skill counts:

| Project | `SKILL.md` files | Notes |
|---|---:|---|
| Superpowers | 14 | 0 user-invoked via `disable-model-invocation: true` |
| Agent Skills | 24 | Broad lifecycle pack |
| Matt Pocock Skills | 36 total, 25 active | 13 active user-invoked skills |

The upstream snapshots are included for review convenience. Their original
licenses remain in each snapshot directory.

## Benchmark Material

Two benchmark sets are included:

- `benchmarks/skill-benchmark`: a fuller implementation benchmark with PRD,
  SPEC, implementation notes, `index.html`, and `package.json` for each
  competitor.
- `benchmarks/skill-framework-benchmark`: a compact tabletop benchmark around
  a React `TaskRadar` component, including PRD, SPEC, implementation, and a
  scoring report.

## Notes On Method

This is not a statistically rigorous benchmark. It is a practical comparison of
the operating styles encoded in the skill repositories.

Use the artifacts to inspect:

- where each system asks the human to decide
- where each system lets the agent continue autonomously
- how each system shapes PRD and SPEC quality
- how each system frames TDD, review, and verification
- how much process each system adds before implementation

## Repository Name

The repository name intentionally matches the requested name:

`agent-super-powers-matt-pocock-skills-comparasions`

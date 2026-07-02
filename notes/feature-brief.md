# Feature Brief: Agent Skill Frameworks Lab

Use this same brief for Superpowers, Agent Skills, and Matt Pocock Skills in separate Conductor workspaces.

## One-Line Prompt

Implement a bilingual `/lab/agent-skills` page in `tgmarinho-ai-website` comparing Superpowers, Agent Skills, and Matt Pocock Skills with a static, data-driven, responsive UI.

## Context

This repo is Thiago Marinho's personal website and technical blog:

- Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Velite, next-intl, Vercel.
- All app pages live under `src/app/[locale]/...`.
- UI text lives in `messages/en.json` and `messages/pt-BR.json`.
- Use Bun only.
- Do not edit `.velite/`.
- Do not add dependencies unless there is a strong reason and explicit approval.
- Do not run `bun run build` unless you can justify the cost. Prefer `bun lint`.

## Goal

Create a public lab page that helps Thiago compare three agent skill frameworks:

- Superpowers: <https://github.com/obra/superpowers>
- Agent Skills: <https://github.com/addyosmani/agent-skills>
- Matt Pocock Skills: <https://github.com/mattpocock/skills>
- External benchmark reference: <https://www.linkedin.com/pulse/superpowers-vs-agent-skills-faster-shipping-safer-reasoning-om-mishra-dzakf/>

The page should make the trade-off obvious:

- Superpowers is stronger for autonomous, reasoning-heavy execution with worktrees, strict TDD, and subagent review loops.
- Agent Skills is stronger for broad lifecycle coverage, specialist quality gates, and product-engineering breadth.
- Matt Pocock Skills is stronger for human-in-the-loop alignment, PRD quality, shared domain language, and focused engineering commands.

Use the external benchmark as supporting context for Superpowers vs Agent Skills, not as proof that one framework is universally better. The benchmark reported that both completed in about 22 minutes, Agent Skills reached first code change faster, Agent Skills ran broader validation including a full 446-test suite, and Superpowers invested more in upfront architectural reasoning. It did not include Matt Pocock Skills.

## Route

Add a localized static page:

- Default locale: `/lab/agent-skills`
- English locale: `/en/lab/agent-skills`

Follow the pattern in `src/app/[locale]/lab/rag-overview/page.tsx`:

- Use `generateMetadata`.
- Use `buildAlternates`, `localizedUrl`, and `ogLocale`.
- Use `getTranslations`.
- Keep it a Server Component unless a genuinely interactive client component is needed.

## Suggested Files

Prefer this shape unless the existing code points to a better local pattern:

- `src/app/[locale]/lab/agent-skills/page.tsx`
- `src/lib/agent-skill-frameworks.ts`
- Update `messages/en.json`
- Update `messages/pt-BR.json`
- Update `src/app/sitemap.ts`

Do not create a blog post for this feature.

## Functional Requirements

1. Show a page header with:
   - Small mono eyebrow.
   - Main title.
   - Short intro.
   - Two repo links opening in a new tab with `rel="noopener noreferrer"`.

2. Show three framework summary panels:
   - Name.
   - Repo URL.
   - Skill count from the local clone snapshot: Superpowers has 14 `SKILL.md` files, Agent Skills has 24 `SKILL.md` files, Matt Pocock Skills has 25 active skills and 36 total if deprecated and in-progress skills are counted.
   - Best-for summary.
   - Main strengths.
   - Main trade-offs.

3. Show a comparison matrix covering these rows:
   - Meta-routing.
   - Requirements discovery.
   - Planning.
   - Implementation loop.
   - Test-Driven Development.
   - Debugging.
   - Review.
   - Verification.
   - Git/workflow.
   - Parallelism.
   - Skill creation.

4. Show a decision guide section:
   - Choose Superpowers when the work needs long autonomous execution, strict red-green-refactor discipline, worktree isolation, and subagent task review.
   - Choose Agent Skills when the work needs broad lifecycle coverage, UI/security/performance checks, launch readiness, and human checkpoints by phase.
   - Choose Matt Pocock Skills when the work needs strong human alignment, PRDs, issues, domain language, TDD, debugging, or architecture improvement.
   - Note that all three can be useful, but using multiple active meta-routers at once can create competing routing behavior.

5. Add a compact "How I will test them" section:
   - Same prompt.
   - Same base branch.
   - Separate Conductor workspace per tool.
   - Compare first code change time, total time, diff size, files touched, validation breadth, verification commands, accessibility, i18n, visual fit, and whether repo rules were followed.

6. Add a compact "Reference benchmark" section:
   - Mention Om Mishra's same-conditions LinkedIn experiment for Superpowers vs Agent Skills.
   - Summarize only the useful numbers: about 8 vs 12 minutes to first code change, about 22 minutes total for both, 7 vs 5 validation passes, 8 vs 7 tests added, 1 replan each, 0 context rereads each.
   - State the interpretation carefully: Agent Skills showed broader validation depth in that task, while Superpowers preserved its advantage as a daily driver for reasoning-heavy production evolution. Matt Pocock Skills was not part of that benchmark.

7. The page must be fully bilingual:
   - English copy in `messages/en.json`.
   - Portuguese copy in `messages/pt-BR.json`.
   - Keep code identifiers and data keys in English.
   - Avoid em dashes and en dashes in authored copy.

8. Add `/lab/agent-skills` to `src/app/sitemap.ts`.

## UI Requirements

- Match the existing "Agentic Futurism" style.
- Use the same visual language as existing pages: dark canvas, restrained cyan/magenta accents, mono metadata strips, tight editorial type.
- Do not create a marketing landing page. The first viewport should be the comparison tool/page.
- Keep cards at `8px` radius or less unless existing local components dictate otherwise.
- Do not nest cards inside cards.
- Tables must be usable on mobile. A horizontal scroll wrapper is acceptable.
- Use lucide icons where useful, especially for external links and section affordances.
- Text must not overlap or rely on viewport-width font scaling.
- Internal links must use `Link` from `next/link`; external repo links can use `<a>`.

## Data Modeling Requirements

Keep comparison facts in a typed static data module rather than scattering arrays through JSX.

Suggested model:

```ts
export type FrameworkKey = "superpowers" | "agentSkills" | "mattPocockSkills";

export type FrameworkSummary = {
  key: FrameworkKey;
  name: string;
  repoUrl: string;
  skillCount: number;
  supportedTools: string[];
  strengths: string[];
  tradeoffs: string[];
};

export type ComparisonRow = {
  key: string;
  superpowers: string[];
  agentSkills: string[];
  mattPocockSkills: string[];
};
```

The human-facing sentence copy can live in `messages/*.json`; stable names, URLs, counts, and skill identifiers can live in TypeScript.

## Acceptance Criteria

- Visiting `/lab/agent-skills` in pt-BR and `/en/lab/agent-skills` in English renders the page without runtime errors.
- Metadata has localized title, description, alternates, OpenGraph URL, and locale.
- Sitemap includes both localized variants through the existing `routing.locales` loop.
- `bun lint` passes.
- No `any`, `@ts-ignore`, `@ts-expect-error`, unused variables, or leftover `console.log`.
- No dependency changes.
- No `.velite/` edits.

## Suggested Verification

Run:

```bash
bun lint
```

Optional, only if time allows:

```bash
bun dev
```

Then open:

- `http://localhost:3000/lab/agent-skills`
- `http://localhost:3000/en/lab/agent-skills`

Check:

- No console errors.
- Mobile width does not overflow except the intended comparison table scroll.
- Repo links open in a new tab.
- Locale switcher keeps the route shape if existing navigation supports it.

## Evaluation Rubric

Score each implementation from 1 to 5:

| Criterion | What to Look For |
|---|---|
| Repo rule compliance | Bun only, App Router, next-intl, no `.velite/`, no dependency churn |
| Scope control | Implements the brief without unrelated refactors |
| Architecture | Static data separated from presentation, typed cleanly |
| UI quality | Fits the current design, responsive, readable, no awkward layout |
| Accessibility | Semantic headings, link labels, focus states, mobile table usability |
| i18n | All user-facing strings localized and natural in both languages |
| Verification | Clear command evidence, especially `bun lint` |
| Benchmark alignment | Captures first-code time, total time, validation passes, replans, and context rereads when possible |
| Agent behavior | Did the tool ask useful questions, over-plan, skip checks, or follow its promised process? |

## Head-to-Head Experiment Instructions

1. Create three fresh Conductor workspaces from `origin/main`.
2. In one workspace, install or activate Superpowers.
3. In the other workspace, install or activate Agent Skills.
4. In the third workspace, install or activate Matt Pocock Skills.
5. Give all three the exact One-Line Prompt plus this full brief.
6. Do not answer extra clarifying questions for one tool unless you give the same answer to the others.
7. After all three finish, compare:
   - `git diff origin/main...HEAD --stat`
   - `git diff origin/main...HEAD`
   - Verification commands and outputs.
   - Final rendered pages.
   - Process quality and failure modes.

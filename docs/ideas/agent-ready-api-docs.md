# Agent-Ready API Documentation Platform

> Output of an `idea-refine` session. Defines the direction and the v1 vertical slice.

## Context

The team needs a documentation site (built on Redocly) for a set of products. It must serve
three audiences with opposite needs — developers, business decision-makers, and AI agents —
while shipping tooling that keeps the docs *provably* high quality. The products' OpenAPI
specs exist today but are **messy**, so the real work is a cleanup-and-verification pipeline,
not a pretty site. The decision that resolved the design: **AI agents come first.** A spec
clean enough for an autonomous agent is automatically precise enough for developers and
credible enough for leaders — so we build one machine-readable, provably-correct core and
project human views off it, rather than three sites.

All Redocly capabilities below were verified against official docs (June 2026); key facts and
caveats are noted inline.

## Problem Statement

**How might we make our products' APIs autonomously consumable by AI agents — with a quality
bar enforced in CI — so that the same verified core also serves developers and decision-makers?**

## Recommended Direction

A single **Redocly Realm/Reunite** project is the site. The single source of truth is the set
of **lint-clean, example-rich OpenAPI specs** plus **Markdoc** content pages. Two pillars:

- **Spec IS the site:** discipline lives in the spec, not in bespoke app code. Redocly renders
  the reference; Markdoc pages add a thin human layer; nav via `sidebars.yaml`.
- **Score = done:** publish is gated on a custom **Redocly Scorecard** level. The agent skills
  + CI exist only to drag messy specs up to that bar.

**The agent deliverable is the MCP server, not `llms.txt`.** Redocly Realm auto-generates an
MCP server at `/mcp` (default-on, configured via the `mcp` key). That — plus `.md` page export
— is how agents actually consume the docs. `llms.txt` is toggled on but not over-invested in
(Redocly themselves call it "overhyped"; MCP is the recommended path).

**Tooling = orchestration, not invention.** We do NOT build a linter. We compose Redocly's
existing CLI (`lint`, `scorecard-classic`, `bundle`) into CI gates and author `.claude/skills`
that help the team clean specs and validate them against the bar.

## Verified Redocly Facts (and caveats)

| Capability | Verdict | Notes |
|---|---|---|
| `redocly score` | **Does not exist** | It's the **API Scorecard** → `redocly scorecard-classic`. **Paid** (Pro/Ent, needs project + auth). Custom ordered levels, each → a ruleset. `--target-level` + `--format junit` = CI gate. |
| `redocly lint` + custom rulesets | **Free/OSS** | Built-ins: `spec`, `recommended`, `recommended-strict`, `minimal`. Configurable rules (no code) + JS plugins. Non-zero exit = CI gate. |
| Example enforcement | **Caveat** | Description rules exist (`operation-description`, etc.). **No built-in rule forces examples on every operation/schema** — only `scalar-property-missing-example`. We author a custom/configurable rule. |
| `redocly respect` + Arazzo | **Free/OSS, low burden** | `generate-arazzo` auto-creates workflows; `respect` runs them against a live API (no mocks; needs reachable env + creds). Deferred to phase 2. |
| MCP server | **Paid (Realm), default-on** | Auto-generated at `/mcp`. The real agent interface. Configurable via `mcp` key. |
| Content pages | **Markdoc, not MDX** | Markdown + Markdoc components, plus React `*.page.tsx`. Nav via `sidebars.yaml`. |
| Tiers | confirmed | Free: CLI (lint/bundle/split/join/build-docs/stats), Redoc, Respect CLI. Paid: hosted site, MCP, Scorecard, AI search, llms.txt generation. |

**Project decision:** a paid Realm plan is available, so MCP + Scorecard + hosted unified site
are in scope.

## v1 Scope (one product, end to end)

Prove the whole pipeline on **one representative product** before any rollout:

1. **Clean** that product's OpenAPI spec to lint-zero against a custom ruleset (`extends:
   [recommended-strict]` + a custom rule requiring examples on operations/schemas).
2. **Gate** it: define a Scorecard with a custom top level (e.g. `Agent-Ready`); run
   `redocly scorecard-classic --target-level Agent-Ready --format junit` in CI.
3. **Publish** the Realm site: API reference + **one auto-generated product overview page**
   (Markdoc) + `sidebars.yaml` nav.
4. **Expose & verify the MCP server** at `/mcp`.
5. **Author the internal skills**: a spec-cleanup skill and a validate-doc skill (run
   lint + scorecard), living in `.claude/skills`, reused across products.

## Key Assumptions to Validate

- [ ] **The core bet:** an autonomous agent connected to `/mcp` can complete a real integration
      task with zero human spec-reading. *Test:* point Claude Code/Cursor at the published `/mcp`
      and have it call the API. If this fails, the agent-first premise needs rework.
- [ ] **Scorecard config syntax** — several `scorecard` doc URLs 404'd (renamed to
      `scorecard-classic`). *Verify against the live `configure-scorecard` guide before building levels.*
- [ ] **A configurable rule can enforce "example on every operation/schema"** — else fall back to a
      JS plugin rule.
- [ ] **Per-product spec-cleanup effort is tractable** — measure on the v1 product, extrapolate.
- [ ] **Realm plan limits** (page counts / project count) fit the total number of products.

## Not Doing (and why)

- **Arazzo / `respect` executable workflows** — phase 2. (Cheaper than first assumed, but not the
  v1 risk; reference + MCP come first.)
- **Hand-written exec/marketing pages** — minimal auto-generated overview only; full benefit copy is
  a content/stakeholder project, a known scope sponge.
- **A custom linter / validation engine** — orchestrate Redocly's, never reinvent.
- **Multi-product rollout** — prove the pipeline on one product first.
- **Over-investing in `llms.txt`** — toggle on; MCP is the real agent path.
- **"Equal parity" three-audience site** — agent-first is the spine; hold the line.

## Open Questions (need answers before/while building)

- Which product is the v1 pilot, and how many products total (for Realm sizing)?
- Where do the source specs live, and how do they flow into this project (submodule? sync? monorepo)?
- Who owns the overview-page content even in its minimal form?
- Phase 2: is a reachable test environment + credentials available for `respect`?

## Verification (how we'll know v1 works)

- `redocly lint` exits 0 against the custom ruleset.
- `redocly scorecard-classic --target-level Agent-Ready --format junit` passes in CI.
- Realm site builds and publishes; reference + overview page render; `sidebars.yaml` nav correct.
- **Agent-readiness test:** an external agent connects to the published `/mcp` and completes a real
  API call/integration with no human spec-reading.

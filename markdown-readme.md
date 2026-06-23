# Markdown linting & frontmatter guide

This document is the contract for Markdown content quality in this project. It
explains **which lint rules run**, **what each rule checks**, and the
**frontmatter every page must carry**.

> Why a separate linter? Redocly's `lint`/scorecard engine only validates the
> **OpenAPI description** — it cannot lint standalone `.md` files. Prose docs are
> gated separately by [`markdownlint-cli2`](https://github.com/DavidAnson/markdownlint-cli2),
> configured in [`.markdownlint-cli2.yaml`](./.markdownlint-cli2.yaml). Both
> gates run in the same CI workflow.

## How to run

| Command | What it does |
|---|---|
| `npm run lint:md` | Lint every Markdown file (the gate) |
| `npm run lint:md:fix` | Auto-fix the mechanically fixable findings |
| `npm run lint:all` | Run the OpenAPI lint **and** the Markdown lint |
| `npx markdownlint-cli2 "path/to/file.md"` | Lint a single file (see note below) |

**Scope:** all `**/*.md` except `node_modules`, `.claude` (agent tooling), and
`@theme` (theme internals). These are not published documentation.

---

## Rule configuration

The linter starts from markdownlint's full default ruleset. We make a small
number of deliberate changes:

### Disabled rules

| Rule | Name | Why we turned it off |
|---|---|---|
| **MD013** | line-length | Prose docs use long, unwrapped lines — line length is not a quality signal. |
| **MD033** | no-inline-html | Inline HTML is occasionally needed (callouts, anchors). |
| **MD041** | first-line-h1 | Pages lead with YAML frontmatter, not an H1. |
| **MD060** | table-column-style | Cosmetic table-pipe spacing — not a documentation quality signal. |

### Customized rules

| Rule | Name | Setting | Why |
|---|---|---|---|
| **MD024** | no-duplicate-heading | `siblings_only: true` | Reused headings like "Overview" / "Get started" are fine across sections; only flag true duplicates under the same parent. |
| **MD025** | single-h1 | `front_matter_title: ""` | Pages carry a frontmatter `title:` **and** a single body H1 — don't count the frontmatter title as a competing top-level heading. |

### Custom rule

| Rule | Name | What it enforces |
|---|---|---|
| **MD101** | required-frontmatter | The baseline frontmatter dictionary (see [Frontmatter](#frontmatter)). Defined in [`.markdownlint/required-frontmatter.cjs`](./.markdownlint/required-frontmatter.cjs). |

---

## Full ruleset reference

Every rule below is **enabled** unless the Status column says otherwise.
Descriptions summarize what each rule checks.

| Rule | Name | What it checks | Status |
|---|---|---|---|
| MD001 | heading-increment | Heading levels increase by one at a time (no H2 → H4 jumps) | Enabled |
| MD003 | heading-style | Heading style is consistent (e.g. all ATX `#`) | Enabled |
| MD004 | ul-style | Unordered list bullets use a consistent symbol | Enabled |
| MD005 | list-indent | List items at the same level share indentation | Enabled |
| MD007 | ul-indent | Nested unordered lists are indented consistently | Enabled |
| MD009 | no-trailing-spaces | Lines don't end with stray whitespace | Enabled |
| MD010 | no-hard-tabs | Tabs are replaced with spaces | Enabled |
| MD011 | no-reversed-links | Link syntax is `[text](url)`, not `(text)[url]` | Enabled |
| MD012 | no-multiple-blanks | No multiple consecutive blank lines | Enabled |
| MD013 | line-length | Lines stay under a max length | **Disabled** |
| MD014 | commands-show-output | Shell blocks don't prefix every line with `$` when no output is shown | Enabled |
| MD018 | no-missing-space-atx | Space required after `#` in ATX headings | Enabled |
| MD019 | no-multiple-space-atx | Single space after `#` in ATX headings | Enabled |
| MD020 | no-missing-space-closed-atx | Spaces required inside closed ATX headings (`# x #`) | Enabled |
| MD021 | no-multiple-space-closed-atx | Single spaces inside closed ATX headings | Enabled |
| MD022 | blanks-around-headings | Headings are surrounded by blank lines | Enabled |
| MD023 | heading-start-left | Headings start at the left margin | Enabled |
| MD024 | no-duplicate-heading | No duplicate heading text | **Customized** (`siblings_only`) |
| MD025 | single-h1 | Only one top-level (H1) heading per page | **Customized** (`front_matter_title`) |
| MD026 | no-trailing-punctuation | Headings don't end with punctuation | Enabled |
| MD027 | no-multiple-space-blockquote | Single space after `>` in blockquotes | Enabled |
| MD028 | no-blanks-blockquote | Blockquotes aren't split by blank lines | Enabled |
| MD029 | ol-prefix | Ordered list numbering follows a consistent pattern | Enabled |
| MD030 | list-marker-space | Consistent spacing after list markers | Enabled |
| MD031 | blanks-around-fences | Fenced code blocks are surrounded by blank lines | Enabled |
| MD032 | blanks-around-lists | Lists are surrounded by blank lines | Enabled |
| MD033 | no-inline-html | No raw HTML in Markdown | **Disabled** |
| MD034 | no-bare-urls | URLs/emails are wrapped (`<...>` or a link), not bare | Enabled |
| MD035 | hr-style | Horizontal rules use a consistent style | Enabled |
| MD036 | no-emphasis-as-heading | Don't use bold/italic text as a fake heading | Enabled |
| MD037 | no-space-in-emphasis | No spaces just inside emphasis markers | Enabled |
| MD038 | no-space-in-code | No padding spaces inside code spans | Enabled |
| MD039 | no-space-in-links | No surrounding spaces in link text | Enabled |
| MD040 | fenced-code-language | Fenced code blocks declare a language | Enabled |
| MD041 | first-line-h1 | First line is a top-level heading | **Disabled** |
| MD042 | no-empty-links | Links have a non-empty destination | Enabled |
| MD043 | required-headings | Document matches a required heading structure (no-op unless configured) | Enabled |
| MD044 | proper-names | Proper names are capitalized correctly (no-op unless configured) | Enabled |
| MD045 | no-alt-text | Images include descriptive alt text | Enabled |
| MD046 | code-block-style | Code block style is consistent | Enabled |
| MD047 | single-trailing-newline | File ends with exactly one newline | Enabled |
| MD048 | code-fence-style | Code fences use a consistent marker | Enabled |
| MD049 | emphasis-style | Emphasis (`*`/`_`) is consistent | Enabled |
| MD050 | strong-style | Strong (`**`/`__`) is consistent | Enabled |
| MD051 | link-fragments | `#fragment` links point to real headings | Enabled |
| MD052 | reference-links-images | Reference labels are defined | Enabled |
| MD053 | link-image-reference-definitions | Reference definitions are actually used | Enabled |
| MD054 | link-image-style | Link/image syntax style is consistent | Enabled |
| MD055 | table-pipe-style | Table leading/trailing pipes are consistent | Enabled |
| MD056 | table-column-count | Table rows have equal cell counts | Enabled |
| MD058 | blanks-around-tables | Tables are surrounded by blank lines | Enabled |
| MD059 | descriptive-link-text | Link text describes the target (no "click here") | Enabled |
| MD060 | table-column-style | Table column formatting matches a style | **Disabled** |
| **MD101** | **required-frontmatter** | **Baseline frontmatter keys are present and valid (custom)** | **Enabled** |

Full upstream descriptions: [markdownlint rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md).

---

## Frontmatter

Every page begins with a YAML frontmatter block. The custom **MD101** rule
fails the build if the required keys are missing or invalid.

### Required attributes (enforced)

| Attribute | Type | Rule | Purpose |
|---|---|---|---|
| `title` | string (non-empty) | required | Page title, sidebar label, SEO fallback |
| `description` | string, **≤ 160 chars** | required, length-checked | One-line summary for SEO, listings, `llms.txt`, MCP |
| `tags` | string[] (≥ 1) | required, non-empty | Topic taxonomy / classification signal |
| `status` | `draft` \| `published` \| `deprecated` | required, enum-checked | Lifecycle state |
| `owner` | string (team) | required, non-empty | Accountability for keeping the page correct |

```yaml
---
title: "How to authenticate your API"
description: "Securely authenticate requests using Bearer tokens."
tags: ["auth", "security"]
status: published
owner: payments-docs
---
```

**Conventions:**

- **camelCase** for multi-word keys, to match Redocly's own reserved keys.
- **Sentence case** for `title` (e.g. "How to authenticate…"), not Title Case.
- **Unquoted** scalars where possible (`status: published`, not `"published"`).
- **No manual `lastUpdated`** — Redocly derives "last updated" from git history.

### Optional Redocly-functional attributes

These are **built-in Redocly Realm keys** with fixed behavior. They are *not*
required — add them only when a page needs that behavior. Do not invent custom
keys with these names. Full reference:
[Front matter configuration options](https://redocly.com/docs/realm/config/front-matter-config).

| Attribute | What it does | Typical use |
|---|---|---|
| `slug` | Custom URL path(s); supports multiple paths for one page | Stable URLs and aliases/redirects |
| `seo` | `title` / `description` / `image` for search engines and social cards | When SEO text should differ from `title`/`description` |
| `excludeFromSearch` | Hides the page from search, `llms.txt`, and the sitemap | `status: draft` / internal pages |
| `rbac` | Access permissions via team-to-role mapping | Gated/restricted content |
| `markdown` | Overrides `toc`, `lastUpdatedBlock`, `editPage` for the page | Page-specific TOC/edit behavior |
| `sidebar` | Selects which sidebar configuration to display | Section-specific navigation |
| `template` | Points to a custom page template | Landing/special pages |
| `navigation` | Customizes next/previous button labels and linking | Tuning sequential reading flow |

```yaml
---
# Required
title: "How to authenticate your API"
description: "Securely authenticate requests using Bearer tokens."
tags: ["auth", "security"]
status: published
owner: payments-docs

# Optional Redocly-functional (only when needed)
slug:
  - "/guides/authentication"
  - "/guides/auth"          # alias / redirect
excludeFromSearch: false
---
```

---

## Single-file linting (note)

Because `globs: ["**/*.md"]` lives in `.markdownlint-cli2.yaml`, passing a file
path on the command line is **merged** with that glob, so the whole corpus is
linted. To see findings for one file, filter the output:

```bash
npm run lint:md 2>&1 | grep "path/to/file.md"
```

(If clean single-file linting becomes important, move `globs` out of the config
and into the npm scripts — then `npx markdownlint-cli2 path/to/file.md` scopes
to just that file.)

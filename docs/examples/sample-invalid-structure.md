---
title: "Sample: invalid structure"
description: "Demonstrates structural markdownlint violations with valid frontmatter."
tags: ["example", "invalid"]
status: draft
owner: docs-team
---

# First top-level heading
This line immediately follows the heading with no blank line (MD022).

#### Skipped a heading level — H1 jumps to H4 (MD001)

Some text introducing a list:
- list item with no blank line before it (MD032)
- second list item

# Second top-level heading (MD025 — two H1s in one page)

This file also ends with no trailing newline (MD047).
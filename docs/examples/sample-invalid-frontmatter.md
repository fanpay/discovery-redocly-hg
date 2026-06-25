---
title: "Sample: invalid frontmatter"
description: "This description is intentionally written to be far too long so that it exceeds the one hundred and sixty character maximum enforced by the MD101 rule, which triggers a length violation."
status: live
---

# Sample: invalid frontmatter

The body of this page is intentionally clean so the violations are isolated to
the YAML frontmatter above. This file exercises the custom
`MD101/required-frontmatter` rule.

## What is wrong here

- `tags` is missing (required key)
- `owner` is missing (required key)
- `status` is `live`, which is not one of `draft | published | deprecated`
- `description` is longer than 160 characters

---
title: "Sample: invalid content and links"
description: "Demonstrates content, link, and code-block violations with valid frontmatter."
tags: ["example", "invalid"]
status: draft
owner: docs-team
---

# Sample: invalid content and links

Visit https://example.com for more information (MD034 — bare URL).

Here is an empty link: [missing destination]() (MD042 — no destination).

For full details, [click here](https://example.com/details) (MD059 — non-descriptive link text).

**This bold line pretends to be a heading (MD036)**

Some text under the fake heading.

![](./images/diagram.png)

The image above has no alt text (MD045).

```
echo "this fenced code block declares no language (MD040)"
```

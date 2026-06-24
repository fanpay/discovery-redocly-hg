// =============================================================================
// Custom markdownlint rule: required-frontmatter (MD101)
// =============================================================================
// Enforces the baseline frontmatter dictionary every page must carry:
//   title, description, tags, status, owner
// plus light validation (description length, status enum, non-empty values).
//
// Zero-dependency, line-based parsing of top-level YAML keys — enough for a
// presence + simple-value gate without pulling in a YAML parser. Wired in via
// `customRules` in .markdownlint-cli2.yaml.
// =============================================================================

"use strict";

const REQUIRED = ["title", "description", "tags", "status", "owner"];
const STATUS_VALUES = ["draft", "published", "deprecated"];
const MAX_DESCRIPTION = 160;

// Trim, and for unquoted/non-array scalars drop any YAML inline comment
// (` # ...`). Quoted and `[...]` values are left untouched.
function cleanScalar(value) {
  let v = value.trim();
  if (!v.startsWith('"') && !v.startsWith("'") && !v.startsWith("[")) {
    const comment = v.search(/\s+#/);
    if (comment !== -1) v = v.slice(0, comment).trim();
  }
  return v;
}

function stripQuotes(value) {
  const trimmed = value.trim();
  const quoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"));
  return quoted ? trimmed.slice(1, -1) : trimmed;
}

module.exports = {
  names: ["MD101", "required-frontmatter"],
  description: "Page front matter must include the baseline governance keys",
  tags: ["frontmatter", "governance"],
  parser: "none",
  function: function requiredFrontmatter(params, onError) {
    const fm = params.frontMatterLines || [];

    if (fm.length === 0) {
      onError({
        lineNumber: 1,
        detail: "Missing front matter. Required keys: " + REQUIRED.join(", "),
      });
      return;
    }

    // Collect top-level keys (no leading whitespace) -> value + line number.
    const keys = {};
    for (let i = 0; i < fm.length; i++) {
      const line = fm[i];
      if (line === "---" || /^\s*$/.test(line) || /^\s*#/.test(line)) continue;
      const match = /^([A-Za-z0-9_-]+):(.*)$/.exec(line);
      if (match && !/^\s/.test(line)) {
        keys[match[1]] = {
          value: cleanScalar(match[2]),
          index: i,
          lineNumber: i + 1,
        };
      }
    }

    // Presence of every required key.
    for (const key of REQUIRED) {
      if (!(key in keys)) {
        onError({
          lineNumber: 1,
          detail: "Missing required front matter key: `" + key + "`",
        });
      }
    }

    // Non-empty scalars.
    for (const key of ["title", "description", "owner"]) {
      if (key in keys && stripQuotes(keys[key].value) === "") {
        onError({
          lineNumber: keys[key].lineNumber,
          detail: "`" + key + "` must not be empty",
        });
      }
    }

    // description length budget.
    if (keys.description) {
      const text = stripQuotes(keys.description.value);
      if (text.length > MAX_DESCRIPTION) {
        onError({
          lineNumber: keys.description.lineNumber,
          detail:
            "`description` is " +
            text.length +
            " chars; keep it ≤ " +
            MAX_DESCRIPTION,
        });
      }
    }

    // status enum.
    if (keys.status) {
      const status = stripQuotes(keys.status.value);
      if (!STATUS_VALUES.includes(status)) {
        onError({
          lineNumber: keys.status.lineNumber,
          detail:
            "`status` must be one of: " +
            STATUS_VALUES.join(", ") +
            " (got `" +
            status +
            "`)",
        });
      }
    }

    // tags must contain at least one entry (inline array or block list).
    if (keys.tags) {
      const value = keys.tags.value;
      let nonEmpty = false;
      if (value.startsWith("[")) {
        nonEmpty = value.replace(/[[\]\s]/g, "").length > 0;
      } else if (value === "") {
        for (let i = keys.tags.index + 1; i < fm.length; i++) {
          const line = fm[i];
          if (line === "---") break;
          if (/^\s+-\s+\S/.test(line)) {
            nonEmpty = true;
            break;
          }
          if (/^[A-Za-z0-9_-]+:/.test(line)) break; // next top-level key
        }
      } else {
        nonEmpty = true;
      }
      if (!nonEmpty) {
        onError({
          lineNumber: keys.tags.lineNumber,
          detail: "`tags` must contain at least one tag",
        });
      }
    }
  },
};

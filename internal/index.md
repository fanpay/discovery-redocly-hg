---
title: Internal Hub
rbac:
  business: none
  internal: read
  developers: read
  ai-agents: none
  anonymous: none
---

# Internal Hub

This section is restricted to **internal** team members and **developers**.

## Resources

- [Runbook](./runbook.md) — operational procedures and incident response
- Architecture decisions, deployment notes, and team processes live here

## Access levels

| Role | This section | Business | Developer | AI Agents |
|------|-------------|----------|-----------|-----------|
| business | No | Yes | No | No |
| internal | Yes | Yes | Yes | Yes |
| developers | Yes | Yes | Yes | Yes |
| ai-agents | No | No | Yes (read) | Yes |

## Guidelines

All internal documentation follows the [Style Guide](../style-guide.md).

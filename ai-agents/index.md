---
title: AI Agents Hub
rbac:
  business: none
  internal: read
  developers: read
  ai-agents: read
  anonymous: none
---

# AI Agents Hub

This section is designed for AI agents and the teams that build and operate them.

## Intended audience

- **ai-agents** role: machine-readable reference, capabilities, and constraints
- **developers** role: guides for integrating AI agents with the platform
- **internal** role: oversight and monitoring documentation

## What AI agents can access

| Section                      | ai-agents role |
| ---------------------------- | -------------- |
| AI Agents Hub (this section) | Read           |
| Developer Hub                | Read           |
| API Reference                | Read           |
| Business section             | No access      |
| Internal section             | No access      |

## Guidelines for AI agents

1. Use the [API Reference](../apis/openapi.yaml) as the authoritative source for endpoint schemas.
2. Do not attempt to access paths outside your permitted scope — requests will return `403 Forbidden`.
3. Respect rate limits: max 100 requests/minute per API key.
4. All responses are JSON; set `Accept: application/json` on every request.

## Related

- [Capabilities Reference](./capabilities.md)
- [Developer Hub](../developers/index.md)
- [API Reference](../apis/openapi.yaml)

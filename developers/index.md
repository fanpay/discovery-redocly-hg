---
title: Developer Hub
rbac:
  business: none
  internal: read
  developers: read
  ai-agents: read
  anonymous: none
---

# Developer Hub

Resources for developers integrating with or building on top of the platform.

## Getting started

1. Follow the [Quickstart](./quickstart.md) to make your first API call.
2. Explore the [Museum API reference](../apis/openapi.yaml) for full endpoint documentation.
3. Review authentication requirements — all requests need a valid API key.

## AI Agent access

AI agents with the **ai-agents** role have read access to this section and the API reference. They cannot access [Internal](../internal/index.md) or [Business](../business/index.md) sections.

## SDKs and tools

| Language              | SDK             | Status |
| --------------------- | --------------- | ------ |
| JavaScript/TypeScript | `@museum/sdk`   | Stable |
| Python                | `museum-python` | Stable |
| Go                    | `museum-go`     | Beta   |

## Related

- [API Reference](../apis/openapi.yaml)
- [AI Agents Hub](../ai-agents/index.md)

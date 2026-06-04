---
title: Capabilities Reference
rbac:
  business: none
  internal: read
  developers: read
  ai-agents: read
  anonymous: none
---

# Capabilities Reference

A machine-readable summary of what AI agents can do within this platform.

## Permitted operations

| Operation    | Endpoint           | Method | Notes                              |
| ------------ | ------------------ | ------ | ---------------------------------- |
| List objects | `/v1/objects`      | GET    | Supports filtering and pagination  |
| Get object   | `/v1/objects/{id}` | GET    | Returns full object record         |
| Search       | `/v1/search`       | GET    | Semantic search across collections |
| List events  | `/v1/events`       | GET    | Upcoming and past museum events    |

## Prohibited operations

The following are not permitted for AI agent API keys:

- Creating, updating, or deleting any resource (`POST`, `PUT`, `PATCH`, `DELETE`)
- Accessing `/v1/admin/**` endpoints
- Querying user PII endpoints

## Rate limits

| Tier                 | Requests/minute | Requests/day |
| -------------------- | --------------- | ------------ |
| ai-agents (default)  | 100             | 10,000       |
| ai-agents (elevated) | 500             | 100,000      |

Contact the [Internal team](../internal/index.md) to request elevated limits.

## Authentication

AI agents must authenticate with an API key scoped to the `ai-agents` role. Keys are issued per agent identity — do not share keys between agents.

```http
Authorization: Bearer AI_AGENT_API_KEY
X-Agent-Id: your-agent-identifier
```

## Error codes

| Code  | Meaning                                                              |
| ----- | -------------------------------------------------------------------- |
| `403` | Role does not permit this action or path                             |
| `429` | Rate limit exceeded                                                  |
| `404` | Resource not found (may also mean no permission to reveal existence) |

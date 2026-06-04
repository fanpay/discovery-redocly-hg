---
title: Quickstart
rbac:
  business: none
  internal: read
  developers: read
  ai-agents: read
  anonymous: none
---

# Quickstart

Get up and running with the Museum API in minutes.

## Prerequisites

- An API key (obtain from the Developer Portal settings)
- `curl` or an HTTP client of your choice

## Step 1 — Authenticate

All requests require a Bearer token in the `Authorization` header:

```http
Authorization: Bearer YOUR_API_KEY
```

## Step 2 — Fetch a collection

```bash
curl -X GET https://api.museum.example.com/v1/objects \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**

```json
{
  "objects": [
    { "id": "obj-001", "title": "Ancient Vase", "era": "Hellenic" }
  ],
  "total": 1
}
```

## Step 3 — Filter results

Use query parameters to filter by era, type, or keyword:

```bash
curl "https://api.museum.example.com/v1/objects?era=Hellenic&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Next steps

- See the full [API Reference](../apis/openapi.yaml) for all endpoints and schemas.
- Review [rate limits and pagination](../apis/openapi.yaml) in the API spec.

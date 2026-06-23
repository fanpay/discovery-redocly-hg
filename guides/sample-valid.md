---
title: "How to Authenticate your API"
description: "Learn how to securely authenticate your requests using Bearer tokens."
tags: ["auth", "security", "tokens"]
status: "published"
slug: 
  - "/guides/sample-valid"
  - "/guides/valid-alias"
owner: payments-docs
---

# Example API Integration Guide

This is an example markdown page that demonstrates the required frontmatter structure and content validation rules.

## Prerequisites

Before starting, ensure you have:

- An active account see Account Setup
- Your API credentials (`API_KEY`)
- A REST client like cURL, Postman, or your language's HTTP library

## Step 1: Obtain Your API Key

Navigate to your dashboard and generate an API key.

```yaml
# Example API key format
API_KEY: sk_live_abc123xyz
```

## Step 2: Make Your First Request

Use the following cURL command to verify your setup:

```bash
curl -X GET https://api.example.com/v1/status \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

Expected response:

```json
{
  "status": "ok",
  "version": "1.0"
}
```

## Step 3: Handle Responses

All responses follow this structure:

```json
{
  "data": { /* resource object */ },
  "errors": [
    {
      "code": "ERROR_CODE",
      "message": "Human-readable error message"
    }
  ]
}
```

## Common Errors

| Error Code | Meaning | Solution |
|---|---|---|
| `INVALID_KEY` | API key is missing or malformed | Check your credentials |
| `RATE_LIMITED` | Too many requests | Wait before retrying |

## Next Steps

- Explore the API Reference
- Learn about webhooks 

## Troubleshooting

**Why am I getting a 401 error?**

A 401 indicates an authentication problem. Verify:

- Your API key is correct
- You're using `Bearer` authentication
- Your credentials haven't expired

**Where can I find my API key?**

Visit the Dashboard → API Keys section of your account.

---

*Questions? Contact [support@example.com](mailto:support@example.com)*

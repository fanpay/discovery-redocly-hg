---
title: Getting Started
description: Authenticate, set up your sandbox, and make your first API call.
---

# Getting Started

This guide covers everything you need to make your first successful API call against the Payment Services sandbox.

## Prerequisites

Before you begin, obtain the following credentials from your integration team:

| Credential | Description |
|-----------|-------------|
| `client_id` | OAuth 2.0 client identifier |
| `client_secret` | OAuth 2.0 client secret |
| `merchantToken` | Your merchant identifier (GUID) — required on every request |

All credentials are environment-specific. Sandbox credentials only work against the sandbox base URL.

## Step 1 — Get a bearer token

Every API request requires a valid OAuth 2.0 bearer token. Request one by sending your credentials as a Basic Auth header to the token endpoint:

```bash
curl -X POST https://sandbox.api.example.com/oauth2/token \
  -H "Authorization: Basic BASE64_CLIENT_ID_SECRET" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&scope=api_scope"
```

The response returns an `access_token` valid for 3600 seconds. Request a new one when it expires.

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

## Step 2 — Send your first payment

Include the token in the `Authorization` header and your `merchantToken` as a custom header on every request:

```bash
curl -X POST https://sandbox.api.example.com/v1/payments \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "merchantToken: YOUR_MERCHANT_TOKEN" \
  -d '{
    "amount": { "amount": 10.00, "currency": "USD" },
    "paymentMethod": {
      "card": {
        "card": "4111111111111111",
        "expiry": "12/27",
        "cvv": "737"
      }
    }
  }'
```

A successful response returns `authResponse: "APPROVED"` and a `paymentId` you can use for refunds, cancellations, and audit lookups.

## Environments

| Environment | Base URL | Token URL |
|-------------|----------|-----------|
| Sandbox | `https://sandbox.api.example.com/v1` | `https://sandbox.api.example.com/oauth2/token` |
| Production | `https://api.example.com/v1` | `https://api.example.com/oauth2/token` |

## Request headers

Every API call requires these headers:

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer {access_token}` |
| `Content-Type` | Yes | Always `application/json` |
| `merchantToken` | Yes | Your merchant GUID |
| `requestId` | No | Optional UUID for idempotency and tracing |

## Next steps

- Read the [API Reference](/apis/openapi.yaml) for all endpoints, schemas, and code examples.
- Follow the [Tutorials](/docs/tutorials/) for complete end-to-end integration walkthroughs.

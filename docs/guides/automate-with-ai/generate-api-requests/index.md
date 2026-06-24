---
title: Generate API Requests
description: How AI agents should construct valid Payment Services API requests — authentication sequence, required headers, and payload patterns.
---

# Generate API Requests

Structured guide for AI agents building valid Payment Services API requests. Covers the authentication sequence, required headers on every call, and payload construction patterns.

## Authentication sequence

1. POST to `/oauth2/token` with Basic Auth (`base64(client_id:client_secret)`) and `grant_type=client_credentials`.
2. Extract `access_token` from the response. Valid for 3600 seconds.
3. Include `Authorization: Bearer {access_token}` on every subsequent request.
4. Include `clientToken: {your_client_guid}` on every request — this is separate from the Bearer token.

## Required headers on every request

| Header | Value |
|---|---|
| `Authorization` | `Bearer {access_token}` |
| `Content-Type` | `application/json` |
| `clientToken` | Your client GUID |
| `requestId` | UUID (optional but strongly recommended for idempotency) |

## Money representation

All monetary values use the object shape `{ "amount": number, "currency": "string" }`. Never send amount as a plain number.

```json
{ "amount": 10.00, "currency": "USD" }
```

## Frequently asked questions

### How do I obtain a bearer token?

POST to the token endpoint with your `client_id` and `client_secret` encoded as Basic Auth. See the authentication sequence above.

### How long does a bearer token last?

3600 seconds (1 hour). Request a new token when it expires — there is no refresh token flow.

### What is the `clientToken` and where do I get it?

The `clientToken` is a GUID identifying your client account. It is different from the OAuth bearer token. Obtain it from your integration team at setup time.

### How do I make a request idempotent?

Include a unique UUID as the `requestId` header. If the same UUID is sent twice, the second request returns `409 Conflict` and is not processed.

### What environments are available?

| Environment | Base URL |
|---|---|
| Sandbox | `https://sandbox.api.example.com/v1` |
| Production | `https://api.example.com/v1` |

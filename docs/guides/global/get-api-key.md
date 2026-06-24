---
title: Get API Key
description: How to obtain and manage your Payment Services API credentials — client ID, client secret, and clientToken.
---

# Get API Key

The Payment Services API uses two separate credentials on every request. Both are required.

## Credential types

| Credential | Description | Used in |
|---|---|---|
| `client_id` | OAuth 2.0 client identifier | Token endpoint (Basic Auth) |
| `client_secret` | OAuth 2.0 client secret | Token endpoint (Basic Auth) |
| `clientToken` | Client GUID identifying your account | Every API request header |

## How to get your credentials

_Content coming soon. Contact your integration team to provision sandbox and production credentials._

## How to use your credentials

1. Base64-encode `client_id:client_secret`.
2. POST to the token endpoint with `Authorization: Basic {encoded}` and `grant_type=client_credentials`.
3. Use the returned `access_token` as `Authorization: Bearer {token}` on all API calls.
4. Include `clientToken: {your_guid}` as a header on all API calls.

## Frequently asked questions

### Are sandbox and production credentials the same?

No. Sandbox credentials only work against the sandbox base URL. Request separate credentials for each environment.

### How do I rotate credentials?

_Content coming soon. Coordinate with your integration team to avoid downtime during rotation._

### My token is expiring mid-session. How do I handle this?

Request a new token before expiry (tokens last 3600 seconds). Implement proactive token refresh in your integration rather than waiting for a `401` response.

### Who do I contact if my credentials stop working?

See [Support / Help](./support.md).

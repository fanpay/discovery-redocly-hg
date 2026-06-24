---
title: Payment Services Developer Portal
description: API documentation, guides, and technical references for the Payment Services platform.
---

# Payment Services Developer Portal

Welcome to the Payment Services developer documentation. This portal provides everything you need to integrate, test, and go live with our payment platform.

## What's here

- **[Guides](/docs/guides/)** — Step-by-step walkthroughs covering authentication, sandbox setup, and common integration patterns.
- **[API Reference](/apis/openapi.yaml)** — Full OpenAPI reference for the Payment Services API, including request/response schemas, code examples, and authentication details.

## Quick start

1. Obtain your `client_id`, `client_secret`, and `clientToken` from your onboarding team.
2. Exchange your credentials for a bearer token at the OAuth2 token endpoint.
3. Send your first payment request to `POST /payments`.

See the [Getting Started guide](/docs/guides/) for the full walkthrough.

## Current APIs

| API | Version | Description |
|-----|---------|-------------|
| [Payment Services](/apis/openapi.yaml) | v1 | Payments, refunds, subscriptions, customers, vaulting, and payment links |

---
title: Automate with AI
description: Guides for AI agents and LLM-based tools consuming the Payment Services API — request generation and workflow automation.
---

# Automate with AI

Structured guides for AI agents, copilots, and LLM-based tools integrating with the Payment Services API. Every page in this section is written for machine consumption first.

## What does your agent need to do?

- [Generate API Requests](./generate-api-requests/index.md) — Construct valid payment requests from intent
- [Automate Payment Workflows](./automate-payment-workflows/index.md) — Chain operations into end-to-end flows

## How AI agents consume this site

This portal exposes two machine-readable interfaces:

1. **MCP server at `/mcp`** — the primary interface for AI agents. Exposes all API operations as callable tools with full schema and example coverage.
2. **`llms.txt`** — a structured summary of the portal content for LLMs that read documentation before calling APIs.

## Frequently asked questions

### How does an agent authenticate?

All requests require a Bearer token (OAuth2 Client Credentials) and a `clientToken` header. See [Generate API Requests](./generate-api-requests/index.md) for the exact authentication sequence.

### What format do payment amounts take?

All money values use the `{ "amount": number, "currency": "USD" }` object shape — never a plain number. The currency field is always required.

### How should an agent handle a 409 Conflict response?

A `409` on a payment request means a duplicate `requestId` was detected. The original request already processed — do not retry. Retrieve the original transaction by `paymentId` instead.

### Where are the schema examples for building requests?

Every required field in the OpenAPI spec carries an example value. Connect to `/mcp` or read `/apis/openapi.yaml` directly to access them.

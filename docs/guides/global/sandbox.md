---
title: Sandbox
description: How to use the Payment Services sandbox environment — test credentials, test card numbers, and behavior differences from production.
---

# Sandbox

The sandbox is an isolated environment for development and testing. No real money moves. All behavior mirrors production except as noted below.

## Sandbox URLs

| Endpoint | URL |
|---|---|
| API base | `https://sandbox.api.example.com/v1` |
| Token endpoint | `https://sandbox.api.example.com/oauth2/token` |

## Test card numbers

_Content coming soon. Your integration team will provide sandbox test cards for approval, decline, and error scenarios._

## Behavior differences from production

_Content coming soon._

## Frequently asked questions

### Do I need separate credentials for the sandbox?

Yes. Sandbox credentials are issued separately and only work against sandbox URLs.

### Can I use production card numbers in the sandbox?

No. Use test card numbers provided by your integration team. Submitting real card data in the sandbox is against policy.

### Why does my sandbox payment behave differently than production?

_Content coming soon. Known sandbox-specific behaviors will be documented here._

### How do I simulate a declined payment in sandbox?

_Content coming soon. Your integration team can provide test card numbers that trigger specific decline scenarios._

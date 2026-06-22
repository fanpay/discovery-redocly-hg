---
title: Tutorials
description: End-to-end integration walkthroughs for common payment scenarios.
---

# Tutorials

These walkthroughs cover complete integration flows from request to response. Each one focuses on a real-world scenario and shows how the different API resources work together.

## Available tutorials

### Process a card payment

Authorize and capture funds in a single step using `POST /payments`. Covers how to structure the request body, handle the response, and interpret authorization codes.

### Vault a payment method

Store a card or bank account securely using `POST /paymentmethods`, then reuse it across multiple transactions without re-entering card details. Covers creating, retrieving, and updating vault entries.

### Manage customers

Create a customer profile and attach vaulted payment methods to it using `POST /customers`. Covers how to retrieve and update customer records, and how to associate multiple payment methods with a single customer.

### Set up recurring billing

Create a subscription that bills a customer on a recurring schedule using `POST /subscriptions`. Covers plan configuration, first-payment processing, and how to modify or cancel an active subscription.

### Issue a refund

Refund a completed transaction using `POST /refunds`. Covers full and partial refunds, linked refunds against a prior payment, and standalone credits.

### Generate a payment link

Create a hosted payment URL using `POST /paymentlinks` and send it to a customer for remote collection. Covers link configuration, expiry, and cancellation.

---

See the [API Reference](/apis/openapi.yaml) for full endpoint specifications, request/response schemas, and code examples. Start with the [Getting Started guide](/docs/guides/) if you haven't set up authentication yet.

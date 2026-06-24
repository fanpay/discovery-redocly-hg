---
title: Automate Payment Workflows
description: End-to-end workflow patterns for AI agents — chaining payment operations into complete integration flows.
---

# Automate Payment Workflows

Workflow patterns for AI agents executing multi-step payment operations. Each pattern shows the operation sequence, dependencies, and error handling checkpoints.

## Pattern: Vault and charge

1. `POST /paymentmethods` → get `paymentMethodId`
2. `POST /payments` with `paymentMethodId` → get `paymentId`
3. Check `authResponse === "APPROVED"` before fulfilling

## Pattern: Subscribe a customer

1. `POST /customers` → get `customerId`
2. `POST /paymentmethods` → get `paymentMethodId`
3. `POST /subscriptions` with `customerId` + `paymentMethodId` + schedule

## Pattern: Refund a payment

1. `GET /payments/{paymentId}` → confirm status is `CAPTURED`
2. `POST /refunds` with `paymentId` and amount
3. Check `refundStatus === "APPROVED"`

## Frequently asked questions

### Can I run multiple payments in parallel?

Yes, but use a unique `requestId` per request to avoid idempotency collisions.

### What should an agent do if a step in a workflow fails?

Check the HTTP status code and error message. Do not automatically retry 4xx errors — they indicate a client-side issue (invalid data, auth failure, duplicate request). Retry only on 5xx with exponential backoff.

### How does an agent know a subscription was created successfully?

The `POST /subscriptions` response returns a `subscriptionId` and `status`. A `status` of `ACTIVE` means billing is scheduled.

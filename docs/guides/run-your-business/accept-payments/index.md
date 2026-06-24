---
title: Accept Payments
description: Collect card and bank payments from customers through the Payment Services platform.
---

# Accept Payments

Collect one-time and recurring payments from customers. This guide covers the operational side — what information you need, what to communicate to customers, and how to track outcomes.

## What you need to accept a payment

- Customer's card or bank account details
- Transaction amount and currency
- A record of the `paymentId` returned — you will need it for refunds and support lookups

## Frequently asked questions

### What payment methods can customers use?

_Content coming soon. Contact your integration team for the current supported method list._

### How does the customer know their payment was successful?

The platform returns `authResponse: APPROVED` for successful charges. Your application should use this to trigger a receipt or confirmation to the customer.

### What do I do if a payment is declined?

A decline means the card issuer rejected the request. Do not retry — ask the customer to provide a different payment method.

### How do I issue a refund?

Contact your integration team or reach out via [Support / Help](../../global/support.md).

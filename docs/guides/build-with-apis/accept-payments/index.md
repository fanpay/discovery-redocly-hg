---
title: Accept Payments
description: Process card and ACH payments — sale, authorize, capture, and void — using the Payment Services API.
---

# Accept Payments

Process one-time payments from cards and bank accounts. Covers the full payment lifecycle: sale, authorize-only, capture, and void.

## How it works

1. Obtain a bearer token via OAuth2 Client Credentials.
2. POST to `/payments` with the payment method and amount.
3. Check `authResponse` in the response — `APPROVED` means funds are reserved.
4. For authorize-only flows, capture with a subsequent POST to `/payments/{id}/capture`.

## Key operations

| Operation | Endpoint | Description |
|---|---|---|
| Sale (auth + capture) | `POST /payments` | Charge immediately |
| Authorize only | `POST /payments` with `captureMethod: manual` | Reserve funds without charging |
| Capture | `POST /payments/{id}/capture` | Settle a previously authorized transaction |
| Void | `POST /payments/{id}/void` | Cancel a pending authorization |

## Frequently asked questions

### What is the difference between a sale and an authorize-only payment?

A sale authorizes and captures in a single step — the card is charged immediately. An authorize-only call reserves the funds but does not settle; you must explicitly capture to move the money. Use authorize-only when the final amount may change (e.g., hotel holds, shipment adjustments).

### How do I know if a payment was approved?

The response includes an `authResponse` field. `APPROVED` means the issuer accepted the request. Any other value (e.g., `DECLINED`, `ERROR`) means the funds were not reserved — do not fulfill the order.

### What currencies are supported?

_Content coming soon. Check with your integration team for the current supported currency list._

### Can I retry a declined payment?

A decline is a final response from the card issuer. Do not retry the same request — present the customer with an alternative payment method.

### How do I prevent double-charges on network retries?

Supply a unique `requestId` UUID on every request. If the same `requestId` is received twice, the API returns `409 Conflict` and does not process the duplicate.

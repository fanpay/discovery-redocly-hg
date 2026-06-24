---
title: Go Live
description: Checklist and steps for moving from the sandbox to the production Payment Services API.
---

# Go Live

Steps and checklist for moving a Payment Services integration from sandbox to production.

## Pre-launch checklist

- [ ] All integration tests pass against sandbox
- [ ] Production credentials obtained and tested
- [ ] Webhook endpoints configured and verified
- [ ] Error handling implemented for all documented 4xx and 5xx responses
- [ ] Idempotency (`requestId`) implemented on all POST operations
- [ ] HTTPS enforced on all client-side endpoints
- [ ] `requestId` logging implemented for support traceability

## Steps to go live

1. Replace sandbox base URL with production URL (`https://api.example.com/v1`).
2. Replace sandbox credentials with production credentials.
3. Verify the first production transaction in a controlled test.
4. Monitor for errors in the first 24 hours.

## Frequently asked questions

### Is there a gradual rollout option?

_Content coming soon._

### Who approves a go-live for a new partner integration?

_Content coming soon._

### What monitoring should I have in place before launch?

At minimum: alert on elevated 5xx rates, alert on authentication failures (`401`), and log all `requestId` values for support lookups.

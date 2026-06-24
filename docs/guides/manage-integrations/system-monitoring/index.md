---
title: System Monitoring
description: Health checks, alerting, and observability for the Payment Services API integration.
---

# System Monitoring

Operational guide for monitoring API health, setting up alerts, and diagnosing degradations before they affect customers.

## Frequently asked questions

### Is there a health check endpoint?

_Content coming soon._

### What latency thresholds should trigger an alert?

_Content coming soon._

### How do I correlate a failed request with server-side logs?

Include a `requestId` header on every API call. This UUID is logged server-side and can be provided to support for incident investigation.

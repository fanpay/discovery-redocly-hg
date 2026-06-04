---
title: Runbook
rbac:
  business: none
  internal: read
  developers: read
  ai-agents: none
  anonymous: none
---

# Runbook

Standard operating procedures for the platform.

## Deployments

1. Merge to `main` triggers a preview build in Reunite.
2. Review the preview URL before promoting to production.
3. Tag the release in git after promotion.

## Incident response

1. Check the status page and alerts dashboard.
2. Identify the affected service and scope.
3. Notify the team in the incident Slack channel.
4. Apply the fix and verify via the API health endpoint.
5. Write a post-mortem within 48 hours.

## RBAC troubleshooting

- If a user reports missing content, check their assigned roles in Reunite > People.
- RBAC is enforced server-side; clearing the browser cache does not bypass it.
- The `anonymous: none` default blocks all unauthenticated access to restricted pages.

## Related

- [Internal Hub](./index.md)
- [Developer Hub](../developers/index.md)

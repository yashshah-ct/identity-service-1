# Identity Service Runbook

## Service ownership

Platform Security and Core Payments own on-call rotation for this service.

## Common operations

### Rotate database credentials

1. Update the secret store entry `identity-service/db`.
2. Rolling restart the deployment so pods pick up the new DSN.

### JWT signing key rotation

1. Provision a new `JWT_SECRET` in the secret store.
2. Deploy with dual-key verification if downstream caches exist (see platform playbook).
3. Revoke outstanding sessions if required by compliance.

## Alerts

| Alert | Likely cause | Action |
|-------|--------------|--------|
| High login failure rate | Credential stuffing | Enable WAF rate limits, review auth logs |
| DB connection saturation | Traffic spike or pool misconfiguration | Scale replicas, inspect slow queries |

## Escalation

Escalate P1 authentication outages to the Core Payments incident commander.

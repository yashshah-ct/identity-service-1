# Identity Service Architecture

## Responsibilities

- Authenticate users with email and password against PostgreSQL-backed credentials.
- Issue signed JWT access tokens for downstream billing and webhook services.
- Expose administrative APIs for fraud and compliance operators.
- Handle password reset requests initiated from the customer portal.

## Components

| Layer | Technology |
|-------|------------|
| HTTP API | Express on Node.js |
| Persistence | PostgreSQL (`users`, `sessions`, `password_reset_tokens`) |
| Token format | JWT (HS256 in production configurations) |

## Data flow

1. Clients authenticate via `/v1/auth/login` and receive a JWT.
2. Clients attach `Authorization: Bearer <token>` to subsequent requests.
3. Admin tooling uses `/v1/admin/*` routes with elevated privileges after operator authentication.

## Dependencies

- `billing-service` trusts JWTs minted here for user context.
- `webhook-service` validates the same issuer configuration for event fan-out callbacks tied to user accounts.

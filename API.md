# Identity Service API

Base URL: `http://localhost:3001`

## Authentication

### POST /v1/auth/login

Request body:

```json
{ "email": "string", "password": "string" }
```

Response `200`:

```json
{ "accessToken": "string", "expiresIn": 3600 }
```

### POST /v1/auth/password-reset/request

Request body:

```json
{ "email": "string" }
```

### POST /v1/auth/password-reset/confirm

Request body:

```json
{ "token": "string", "newPassword": "string" }
```

## Admin

All routes require `Authorization: Bearer <token>`.

### GET /v1/admin/users

Returns paginated user records for operators.

## Health

### GET /health

Liveness probe for orchestrators.

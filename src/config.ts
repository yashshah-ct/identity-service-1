export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgres://northwind:northwind@localhost:5432/identity",
  jwtSecret: process.env.JWT_SECRET || "northwind-dev-jwt-secret",
  jwtIssuer: process.env.JWT_ISSUER || "northwind-pay-identity",
};

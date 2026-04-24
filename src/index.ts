import express from "express";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import passwordResetRoutes from "./routes/passwordReset";
import { initSchema } from "./db";
import { config } from "./config";

async function main(): Promise<void> {
  await initSchema();
  const app = express();
  app.use(express.json({ limit: "256kb" }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "identity-service" });
  });

  app.use("/v1/auth", authRoutes);
  app.use("/v1/auth/password-reset", passwordResetRoutes);
  app.use("/v1/admin", adminRoutes);

  app.listen(config.port, () => {
    process.stdout.write(`identity-service listening on ${config.port}\n`);
  });
}

main().catch((e) => {
  process.stderr.write(String(e));
  process.exit(1);
});

import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db";
import { config } from "../config";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ error: "email_and_password_required" });
    return;
  }
  const user = await pool.query(
    "SELECT id, email, password_hash, role FROM users WHERE email = $1",
    [email]
  );
  if (user.rowCount === 0) {
    res.status(401).json({ error: "invalid_credentials" });
    return;
  }
  const row = user.rows[0] as {
    id: number;
    email: string;
    password_hash: string;
    role: string;
  };
  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) {
    res.status(401).json({ error: "invalid_credentials" });
    return;
  }
  const accessToken = jwt.sign(
    { sub: String(row.id), role: row.role, email: row.email },
    config.jwtSecret,
    { algorithm: "HS256", expiresIn: "1h", issuer: config.jwtIssuer }
  );
  res.json({ accessToken, expiresIn: 3600 });
});

export default router;

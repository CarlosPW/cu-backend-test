import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Determinar si necesita SSL (Railway requiere SSL para conexiones externas)
const needsSSL = () => {
  const dbUrl = process.env.DATABASE_URL || "";
  return dbUrl.includes("railway") || dbUrl.includes("up.railway.app");
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: needsSSL() ? { rejectUnauthorized: false } : false
});

export const db = drizzle(pool);
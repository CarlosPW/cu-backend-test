import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connection: { 
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

export const db = drizzle(pool);
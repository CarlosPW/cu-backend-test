import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Determinar si necesita SSL (Railway requiere SSL para conexiones externas)
const needsSSL = () => {
  const dbUrl = process.env.DATABASE_URL || "";
  return dbUrl.includes("railway") || dbUrl.includes("up.railway.app");
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: needsSSL() ? { rejectUnauthorized: false } : false
});

const db = drizzle(pool);

async function runMigrations() {
  try {
    console.log("🔄 Ejecutando migraciones...");
    await migrate(db, { 
      migrationsFolder: resolve(__dirname, "../database/migrations") 
    });
    console.log("✅ Migraciones ejecutadas exitosamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error ejecutando migraciones:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();

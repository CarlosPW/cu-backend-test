// drizzle.config.js
/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./database/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};

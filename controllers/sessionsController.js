import { db } from "../database/config.js";
import { sessions } from "../database/schema.js";
import { eq } from "drizzle-orm";
// Controladores para las sesiones

export const createSession = async (req, res) => {
  console.log('createSession', req.body);
  try {
    await db.insert(sessions).values({
      code: req.body.code,
      state: req.body.state,
    });
    res.status(200).json({ message: "Session created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const session = await db.select().from(sessions).where(eq(sessions.state, req.params.state));
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
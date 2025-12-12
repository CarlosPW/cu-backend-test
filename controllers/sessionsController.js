import { db } from "../database/config.js";
import { sessions } from "../database/schema.js";
import { eq } from "drizzle-orm";
// Controladores para las sesiones

export const createSession = async (req, res) => {
  console.log('createSession', req.body);
  try {
    const result = await db.insert(sessions).values({
      code: req.body.code,
      state: req.body.state,
    }).returning();
    console.log('session created:', result);
    res.status(200).json({ message: "Session created successfully", data: result });
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ 
      error: error.message,
      code: error.code,
      detail: error.detail 
    });
  }
};

export const getSession = async (req, res) => {
  console.log('getSession', req.params);
  try {
    const session = await db.select().from(sessions).where(eq(sessions.state, req.params.id)).limit(1);
    console.log('session', session);
    res.status(200).json(session[0]);
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ error: error.message });
  }
};
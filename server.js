// backend minimalista que se comunica con ClaveÚnica

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";

import sessionsRoutes from "./routes/sessionsRoutes.js";
import claveunicaRoutes from "./routes/claveunicaRoutes.js";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // permite leer form-data/urlencoded
app.use(cors());

// Rutas
app.use("/claveunica", claveunicaRoutes);
app.use("/sessions", sessionsRoutes);

// Ruta de salud
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando correctamente" });
});

// Manejo de errores
app.use(errorHandler);

// 🚀 Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor Express ClaveÚnica listo en puerto ${PORT}`)
);

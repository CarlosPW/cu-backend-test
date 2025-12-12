// Rutas para ClaveÚnica

import express from "express";
import {
  login,
  token,
  userinfo,
  logout,
} from "../controllers/claveunicaController.js";

const router = express.Router();

// 1️⃣ LOGIN (redirige a ClaveÚnica)
router.get("/login", login);

// 2️⃣ TOKEN: intercambia code → token
router.post("/token", token);

// 3️⃣ USERINFO: obtener datos usuario
router.get("/userinfo", userinfo);

// 4️⃣ LOGOUT ClaveÚnica
router.get("/logout", logout);

export default router;

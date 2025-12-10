// backend minimalista que se comunica con ClaveÚnica

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());


// -----------------------------------
// CONFIGURACIÓN
// -----------------------------------
const CLIENT_ID = "1a71946c1be54bc0a4908f00a27946fc";
const CLIENT_SECRET =
  "38ac19d568c04b1b97658c73726acc16";
const REDIRECT_URI =
  process.env.CLAVEUNICA_REDIRECT_URI ||
  "https://testing-sence-env.kueri.ai";

// ENDPOINTS OFICIALES DE CLAVEÚNICA
const CLAVE_UNICA_AUTHORIZATION_ENDPOINT =
  "https://accounts.claveunica.gob.cl/openid/authorize";
const CLAVE_UNICA_TOKEN_ENDPOINT =
  "https://accounts.claveunica.gob.cl/openid/token";
const CLAVE_UNICA_USERINFO_ENDPOINT =
  "https://accounts.claveunica.gob.cl/openid/userinfo";
const CLAVE_UNICA_LOGOUT_ENDPOINT =
  "https://accounts.claveunica.gob.cl/api/v1/accounts/app/logout";

// -----------------------------------
// 1️⃣ LOGIN (redirige a ClaveÚnica)
// -----------------------------------
app.get("/claveunica/login", (req, res) => {
  const { state = "kueriTest" } = req.query;
  const url = new URL(CLAVE_UNICA_AUTHORIZATION_ENDPOINT);
  url.searchParams.set("client_id", CLIENT_ID);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid run name");
  url.searchParams.set("redirect_uri", REDIRECT_URI);
  url.searchParams.set("state", state);

  res.json({ redirect_to: url.toString() });
});

// -----------------------------------
// 2️⃣ TOKEN: intercambia code → token
// -----------------------------------
app.post("/claveunica/token", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Falta parámetro code" });

  try {
    const tokenRes = await axios.post(
      CLAVE_UNICA_TOKEN_ENDPOINT,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json(tokenRes.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: err.message });
  }
});

// -----------------------------------
// 3️⃣ USERINFO: obtener datos usuario
// -----------------------------------
app.get("/claveunica/userinfo", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Falta header Authorization" });

  try {
    const userRes = await axios.get(CLAVE_UNICA_USERINFO_ENDPOINT, {
      headers: { Authorization: authHeader },
    });
    res.json(userRes.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: err.message });
  }
});

// -----------------------------------
// 4️⃣ LOGOUT ClaveÚnica
// -----------------------------------
app.get("/claveunica/logout", async (req, res) => {
  try {
    const logoutURL = new URL(CLAVE_UNICA_LOGOUT_ENDPOINT);
    logoutURL.searchParams.set("client_id", CLIENT_ID);
    res.json({ redirect_to: logoutURL.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------------
// 🚀 Servidor
// -----------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor Express ClaveÚnica listo en puerto ${PORT}`)
);
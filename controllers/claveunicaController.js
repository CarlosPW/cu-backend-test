// Controladores para los endpoints de ClaveÚnica

import {
  generateAuthorizationUrl,
  exchangeCodeForToken,
  getUserInfo,
  generateLogoutUrl,
} from "../services/claveunicaService.js";

/**
 * Controlador para iniciar el proceso de login
 * Redirige al usuario a ClaveÚnica
 */
export const login = (req, res) => {
  try {
    const { state = "kueriTest" } = req.query;
    const redirectUrl = generateAuthorizationUrl(state);
    res.json({ redirect_to: redirectUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador para intercambiar código por token
 */
export const token = async (req, res) => {
  try {
    const {
      code,
      redirect_uri: redirectFromBody,
      client_id: clientIdFromBody,
      code_verifier: codeVerifier,
      grant_type: grantTypeFromBody,
    } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Falta parámetro code" });
    }
    if (!codeVerifier) {
      return res.status(400).json({ error: "Falta parámetro code_verifier" });
    }

    const tokenData = await exchangeCodeForToken(
      code,
      codeVerifier,
      redirectFromBody,
      clientIdFromBody,
      grantTypeFromBody
    );

    res.json(tokenData);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: error.message });
  }
};

/**
 * Controlador para obtener información del usuario
 */
export const userinfo = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Falta header Authorization" });
    }

    const userData = await getUserInfo(authHeader);
    res.json(userData);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: error.message });
  }
};

/**
 * Controlador para logout
 */
export const logout = (req, res) => {
  try {
    const logoutUrl = generateLogoutUrl();
    res.json({ redirect_to: logoutUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

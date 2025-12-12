// Servicio para comunicación con ClaveÚnica

import axios from "axios";
import { CLAVE_UNICA_CONFIG } from "../config/claveunica.js";

/**
 * Genera la URL de autorización de ClaveÚnica
 * @param {string} state - Estado para mantener la sesión
 * @returns {string} URL de autorización
 */
export const generateAuthorizationUrl = (state = "kueriTest") => {
  const url = new URL(CLAVE_UNICA_CONFIG.ENDPOINTS.AUTHORIZATION);
  url.searchParams.set("client_id", CLAVE_UNICA_CONFIG.CLIENT_ID);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid run name");
  url.searchParams.set("redirect_uri", CLAVE_UNICA_CONFIG.REDIRECT_URI);
  url.searchParams.set("state", state);
  return url.toString();
};

/**
 * Intercambia el código de autorización por un token de acceso
 * @param {string} code - Código de autorización
 * @param {string} codeVerifier - Verificador del código (PKCE)
 * @param {string} redirectUri - URI de redirección
 * @param {string} clientId - ID del cliente
 * @param {string} grantType - Tipo de concesión
 * @returns {Promise<Object>} Datos del token
 */
export const exchangeCodeForToken = async (
  code,
  codeVerifier,
  redirectUri = null,
  clientId = null,
  grantType = "authorization_code"
) => {
  const redirect_uri = redirectUri || CLAVE_UNICA_CONFIG.REDIRECT_URI;
  const client_id = clientId || CLAVE_UNICA_CONFIG.CLIENT_ID;

  const response = await axios.post(
    CLAVE_UNICA_CONFIG.ENDPOINTS.TOKEN,
    new URLSearchParams({
      grant_type: grantType,
      code,
      redirect_uri,
      client_id,
      code_verifier: codeVerifier,
      client_secret: CLAVE_UNICA_CONFIG.CLIENT_SECRET,
    }).toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  return response.data;
};

/**
 * Obtiene la información del usuario desde ClaveÚnica
 * @param {string} authorizationHeader - Header de autorización (Bearer token)
 * @returns {Promise<Object>} Información del usuario
 */
export const getUserInfo = async (authorizationHeader) => {
  const response = await axios.get(CLAVE_UNICA_CONFIG.ENDPOINTS.USERINFO, {
    headers: { Authorization: authorizationHeader },
  });
  return response.data;
};

/**
 * Genera la URL de logout de ClaveÚnica
 * @returns {string} URL de logout
 */
export const generateLogoutUrl = () => {
  const url = new URL(CLAVE_UNICA_CONFIG.ENDPOINTS.LOGOUT);
  url.searchParams.set("client_id", CLAVE_UNICA_CONFIG.CLIENT_ID);
  return url.toString();
};

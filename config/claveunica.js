// Configuración de ClaveÚnica

export const CLAVE_UNICA_CONFIG = {
  CLIENT_ID: process.env.CLAVEUNICA_CLIENT_ID || "1a71946c1be54bc0a4908f00a27946fc",
  CLIENT_SECRET: process.env.CLAVEUNICA_CLIENT_SECRET || "38ac19d568c04b1b97658c73726acc16",
  REDIRECT_URI: process.env.CLAVEUNICA_REDIRECT_URI || "https://testing-sence-env.kueri.ai",
  
  // Endpoints oficiales de ClaveÚnica
  ENDPOINTS: {
    AUTHORIZATION: "https://accounts.claveunica.gob.cl/openid/authorize",
    TOKEN: "https://accounts.claveunica.gob.cl/openid/token",
    USERINFO: "https://accounts.claveunica.gob.cl/openid/userinfo",
    LOGOUT: "https://accounts.claveunica.gob.cl/api/v1/accounts/app/logout",
  },
};

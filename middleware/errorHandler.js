// Middleware para manejo de errores

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  
  const status = err.status || err.response?.status || 500;
  const message = err.message || "Error interno del servidor";
  const data = err.response?.data || { error: message };

  res.status(status).json(data);
};

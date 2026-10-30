const noEncontrado = (req, res) =>
  res.status(404).json({ ok: false, mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });

// eslint-disable-next-line no-unused-vars
const manejoErrores = (err, req, res, next) => {
  // Valor duplicado en un campo único (serial, url, nombre...)
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue || {})[0];
    return res.status(409).json({ ok: false, mensaje: `Ya existe un registro con ese ${campo}: "${err.keyValue[campo]}"` });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ ok: false, mensaje: `Id inválido: ${err.value}` });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ ok: false, mensaje: err.message });
  }
  if (err.status) {
    return res.status(err.status).json({ ok: false, mensaje: err.message });
  }
  console.error(err);
  res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
};

module.exports = { noEncontrado, manejoErrores };

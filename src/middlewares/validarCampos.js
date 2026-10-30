const { validationResult, matchedData } = require('express-validator');

// Devuelve 400 si hay errores y deja en req.datos solo los campos validados
const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Datos inválidos',
      errores: errores.array().map((e) => ({ campo: e.path, mensaje: e.msg })),
    });
  }
  req.datos = matchedData(req, { locations: ['body'] });
  next();
};

module.exports = validarCampos;

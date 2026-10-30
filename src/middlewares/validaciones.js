const { body, param } = require('express-validator');

const ESTADOS = ['Activo', 'Inactivo'];

// En POST los campos obligatorios son requeridos; en PUT todos son opcionales
const texto = (campo, requerido, esPut) => {
  const v = body(campo);
  return (requerido && !esPut ? v.exists({ values: 'falsy' }).withMessage(`${campo} es obligatorio`) : v.optional())
    .bail().isString().withMessage(`${campo} debe ser texto`).trim();
};
const estado = (esPut) =>
  (esPut ? body('estado').optional() : body('estado').optional({ values: 'falsy' }))
    .isIn(ESTADOS).withMessage(`estado debe ser: ${ESTADOS.join(' o ')}`);
const idRef = (campo, esPut) =>
  (esPut ? body(campo).optional() : body(campo).exists({ values: 'falsy' }).withMessage(`${campo} es obligatorio`))
    .bail().isMongoId().withMessage(`${campo} debe ser un id válido`);

const validarId = [param('id').isMongoId().withMessage('id inválido')];

const genero = (esPut = false) => [texto('nombre', true, esPut), estado(esPut), texto('descripcion', false, esPut)];

const director = (esPut = false) => [texto('nombres', true, esPut), estado(esPut)];

const productora = (esPut = false) => [
  texto('nombre', true, esPut),
  estado(esPut),
  texto('slogan', false, esPut),
  texto('descripcion', false, esPut),
];

const tipo = (esPut = false) => [texto('nombre', true, esPut), texto('descripcion', false, esPut)];

const media = (esPut = false) => [
  texto('serial', true, esPut),
  texto('titulo', true, esPut),
  texto('sinopsis', false, esPut),
  texto('url', true, esPut).bail().isURL().withMessage('url debe ser una URL válida'),
  texto('imagen', false, esPut),
  (esPut ? body('anioEstreno').optional() : body('anioEstreno').exists().withMessage('anioEstreno es obligatorio'))
    .bail()
    .isInt({ min: 1888, max: new Date().getFullYear() + 5 })
    .withMessage('anioEstreno debe ser un año válido')
    .toInt(),
  idRef('genero', esPut),
  idRef('director', esPut),
  idRef('productora', esPut),
  idRef('tipo', esPut),
];

module.exports = { validarId, genero, director, productora, tipo, media };

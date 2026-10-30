const { Router } = require('express');
const validarCampos = require('../middlewares/validarCampos');
const { validarId } = require('../middlewares/validaciones');

/**
 * Crea el router estándar REST de un recurso.
 * @param {object} ctrl        Controlador con listar, obtener, crear, actualizar, eliminar
 * @param {Function} reglas    Función (esPut) => reglas de express-validator
 */
const crearRutas = (ctrl, reglas) => {
  const router = Router();
  router.get('/', ctrl.listar);
  router.get('/:id', validarId, validarCampos, ctrl.obtener);
  router.post('/', reglas(false), validarCampos, ctrl.crear);
  router.put('/:id', validarId, reglas(true), validarCampos, ctrl.actualizar);
  router.delete('/:id', validarId, validarCampos, ctrl.eliminar);
  return router;
};

module.exports = crearRutas;

const { Router } = require('express');
const crearRutas = require('./crearRutas');
const crudController = require('../controllers/crudController');
const mediaController = require('../controllers/mediaController');
const reglas = require('../middlewares/validaciones');

const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const router = Router();

router.use('/generos', crearRutas(crudController(Genero, 'Género', 'genero'), reglas.genero));
router.use('/directores', crearRutas(crudController(Director, 'Director', 'director'), reglas.director));
router.use('/productoras', crearRutas(crudController(Productora, 'Productora', 'productora', 'a'), reglas.productora));
router.use('/tipos', crearRutas(crudController(Tipo, 'Tipo', 'tipo'), reglas.tipo));
router.use('/medias', crearRutas(mediaController, reglas.media));

module.exports = router;

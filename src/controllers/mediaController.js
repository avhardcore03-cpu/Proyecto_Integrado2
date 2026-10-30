const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');
const errorHttp = require('../helpers/errorHttp');

const POBLAR = [
  { path: 'genero', select: 'nombre estado' },
  { path: 'director', select: 'nombres estado' },
  { path: 'productora', select: 'nombre estado' },
  { path: 'tipo', select: 'nombre' },
];

// Reglas del caso: solo géneros, directores y productoras ACTIVOS; tipo debe existir
const validarRelaciones = async ({ genero, director, productora, tipo }) => {
  const reglas = [
    [genero, Genero, 'género', true],
    [director, Director, 'director', true],
    [productora, Productora, 'productora', true],
    [tipo, Tipo, 'tipo', false],
  ];
  for (const [id, Modelo, nombre, exigeActivo] of reglas) {
    if (id === undefined) continue; // en PUT puede no venir
    const doc = await Modelo.findById(id);
    if (!doc) throw errorHttp(400, `El ${nombre} indicado no existe`);
    if (exigeActivo && doc.estado !== 'Activo') throw errorHttp(400, `El ${nombre} "${doc.nombre || doc.nombres}" está inactivo`);
  }
};

// GET /media  (filtros opcionales: ?genero=&director=&productora=&tipo=&anio=&titulo=)
const listar = async (req, res) => {
  const { genero, director, productora, tipo, anio, titulo } = req.query;
  const filtro = {};
  if (genero) filtro.genero = genero;
  if (director) filtro.director = director;
  if (productora) filtro.productora = productora;
  if (tipo) filtro.tipo = tipo;
  if (anio) filtro.anioEstreno = Number(anio);
  if (titulo) filtro.titulo = { $regex: titulo, $options: 'i' };
  const datos = await Media.find(filtro).populate(POBLAR).sort({ fechaCreacion: -1 });
  res.json({ ok: true, total: datos.length, datos });
};

// GET /media/:id
const obtener = async (req, res) => {
  const dato = await Media.findById(req.params.id).populate(POBLAR);
  if (!dato) throw errorHttp(404, 'Media no encontrada');
  res.json({ ok: true, dato });
};

// POST /media
const crear = async (req, res) => {
  await validarRelaciones(req.datos);
  const nueva = await Media.create(req.datos);
  const dato = await nueva.populate(POBLAR);
  res.status(201).json({ ok: true, mensaje: 'Media creada', dato });
};

// PUT /media/:id
const actualizar = async (req, res) => {
  await validarRelaciones(req.datos);
  const dato = await Media.findByIdAndUpdate(req.params.id, req.datos, { returnDocument: 'after', runValidators: true }).populate(POBLAR);
  if (!dato) throw errorHttp(404, 'Media no encontrada');
  res.json({ ok: true, mensaje: 'Media actualizada', dato });
};

// DELETE /media/:id
const eliminar = async (req, res) => {
  const dato = await Media.findByIdAndDelete(req.params.id);
  if (!dato) throw errorHttp(404, 'Media no encontrada');
  res.json({ ok: true, mensaje: 'Media eliminada', dato });
};

module.exports = { listar, obtener, crear, actualizar, eliminar };

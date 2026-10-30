// Carga los datos iniciales del caso de estudio: npm run seed
require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const conectarDB = require('../config/db');
const Genero = require('../models/Genero');
const Tipo = require('../models/Tipo');

const generos = [
  { nombre: 'Acción', descripcion: 'Películas y series con escenas de alto impacto' },
  { nombre: 'Aventura', descripcion: 'Viajes, exploración y desafíos' },
  { nombre: 'Ciencia ficción', descripcion: 'Tecnología, futuro y mundos imaginarios' },
  { nombre: 'Drama', descripcion: 'Historias centradas en conflictos humanos' },
  { nombre: 'Terror', descripcion: 'Producciones que buscan provocar miedo' },
];
const tipos = [
  { nombre: 'Película', descripcion: 'Producción de una sola pieza' },
  { nombre: 'Serie', descripcion: 'Producción por temporadas y episodios' },
];

(async () => {
  await conectarDB();
  // Solo inserta los que no existan (se puede ejecutar varias veces sin duplicar)
  for (const g of generos) if (!(await Genero.exists({ nombre: g.nombre }))) await Genero.create(g);
  for (const t of tipos) if (!(await Tipo.exists({ nombre: t.nombre }))) await Tipo.create(t);
  console.log(`✔ Semilla cargada: ${generos.length} géneros y ${tipos.length} tipos`);
  await mongoose.disconnect();
})();

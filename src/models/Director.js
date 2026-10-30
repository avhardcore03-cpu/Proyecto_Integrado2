const { Schema, model } = require('mongoose');
const opciones = require('./opciones');

const DirectorSchema = new Schema(
  {
    nombres: { type: String, required: true, trim: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'], default: 'Activo' },
  },
  opciones
);

module.exports = model('Director', DirectorSchema);

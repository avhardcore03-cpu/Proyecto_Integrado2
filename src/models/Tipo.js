const { Schema, model } = require('mongoose');
const opciones = require('./opciones');

const TipoSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true, trim: true },
    descripcion: { type: String, trim: true, default: '' },
  },
  opciones
);

module.exports = model('Tipo', TipoSchema);

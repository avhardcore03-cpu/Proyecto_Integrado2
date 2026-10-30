const { Schema, model } = require('mongoose');
const opciones = require('./opciones');

const GeneroSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true, trim: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    descripcion: { type: String, trim: true, default: '' },
  },
  opciones
);

module.exports = model('Genero', GeneroSchema);

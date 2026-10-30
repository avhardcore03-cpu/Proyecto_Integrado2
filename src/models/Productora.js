const { Schema, model } = require('mongoose');
const opciones = require('./opciones');

const ProductoraSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true, trim: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    slogan: { type: String, trim: true, default: '' },
    descripcion: { type: String, trim: true, default: '' },
  },
  opciones
);

module.exports = model('Productora', ProductoraSchema);

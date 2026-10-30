// Opciones comunes: renombra createdAt/updatedAt a los nombres del caso de estudio
module.exports = {
  timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
  versionKey: false,
};

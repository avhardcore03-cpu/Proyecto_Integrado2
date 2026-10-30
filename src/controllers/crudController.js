const Media = require('../models/Media');
const errorHttp = require('../helpers/errorHttp');

/**
 * Genera los controladores CRUD para los módulos de catálogo
 * (Género, Director, Productora y Tipo).
 * @param {import('mongoose').Model} Modelo
 * @param {string} nombre      Nombre legible del recurso (para mensajes)
 * @param {string} campoMedia  Campo de Media que referencia este recurso
 * @param {string} o           Terminación de género gramatical: 'o' | 'a'
 */
const crudController = (Modelo, nombre, campoMedia, o = 'o') => ({
  // GET /  (filtro opcional ?estado=Activo|Inactivo)
  listar: async (req, res) => {
    const filtro = {};
    if (req.query.estado && Modelo.schema.path('estado')) filtro.estado = req.query.estado;
    const datos = await Modelo.find(filtro).sort({ fechaCreacion: -1 });
    res.json({ ok: true, total: datos.length, datos });
  },

  // GET /:id
  obtener: async (req, res) => {
    const dato = await Modelo.findById(req.params.id);
    if (!dato) throw errorHttp(404, `${nombre} no encontrad${o}`);
    res.json({ ok: true, dato });
  },

  // POST /
  crear: async (req, res) => {
    const dato = await Modelo.create(req.datos);
    res.status(201).json({ ok: true, mensaje: `${nombre} cread${o}`, dato });
  },

  // PUT /:id
  actualizar: async (req, res) => {
    const dato = await Modelo.findByIdAndUpdate(req.params.id, req.datos, { returnDocument: 'after', runValidators: true });
    if (!dato) throw errorHttp(404, `${nombre} no encontrad${o}`);
    res.json({ ok: true, mensaje: `${nombre} actualizad${o}`, dato });
  },

  // DELETE /:id  (no se permite si alguna media lo usa)
  eliminar: async (req, res) => {
    const enUso = await Media.countDocuments({ [campoMedia]: req.params.id });
    if (enUso > 0) {
      throw errorHttp(409, `No se puede eliminar: ${enUso} media(s) usan est${o==='a'?'a':'e'} ${nombre.toLowerCase()}. Puede inactivarl${o}.`);
    }
    const dato = await Modelo.findByIdAndDelete(req.params.id);
    if (!dato) throw errorHttp(404, `${nombre} no encontrad${o}`);
    res.json({ ok: true, mensaje: `${nombre} eliminad${o}`, dato });
  },
});

module.exports = crudController;

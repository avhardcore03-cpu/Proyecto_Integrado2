const mongoose = require('mongoose');

const conectarDB = async (uri = process.env.MONGO_URI) => {
  try {
    await mongoose.connect(uri);
    console.log(`✔ Conectado a MongoDB: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('✖ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;

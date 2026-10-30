const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rutas = require('./routes');
const { noEncontrado, manejoErrores } = require('./middlewares/manejoErrores');

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.get('/', (req, res) =>
  res.json({
    ok: true,
    api: 'API REST Películas - IU Digital',
    endpoints: ['/api/generos', '/api/directores', '/api/productoras', '/api/tipos', '/api/medias'],
  })
);

app.use('/api', rutas);
app.use(noEncontrado);
app.use(manejoErrores);

module.exports = app;

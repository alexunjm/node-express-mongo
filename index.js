/** Módulos */
// express
const express = require('express');
// aplicación express
const app = express();


/** Carga de módulos creados en esta aplicación */
const middleware = require('./middleware');
middleware.useMiddleware(app);

// Configuración de rutas
require('./api/index')(app);

// Directorio para contenido estático
const options = {
        extensions: ['html', 'jpeg', 'jpg', 'png', 'svg'],
        maxAge: '1d',
        setHeaders: res => res.set('x-timestamp', Date.now())
    }
app.use(express.static(__dirname + '/public', options))

/**
 * Para manejo de errores 404
 */
app.use(function(req, res, next) {
  res.status(404).json({ msg: 'Lo sentimos, este servicio no está disponible', status: false });
});

/**
 * Arranque del servidor
 */ 
app.listen(3000);
console.log('listening on port 3000');

/*
ruta base del proyecto
app.get('/', function (req, res) {
  res.send('Hello World!');
});


validación de errores desde desarrollo
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});*/
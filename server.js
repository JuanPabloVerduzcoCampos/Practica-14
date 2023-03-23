// Importamos la librería express
const express = require('express');

// Creamos la aplicación de express
const app = express();

// Establecemos el puerto que utilizará la aplicación
const PORT = process.env.PORT || 3000;

// Definimos un middleware para servir archivos estáticos
app.use('/assets', express.static(__dirname + '/public'));

// Configuramos el motor de vistas a utilizar
app.set('view engine', 'ejs');

// Definimos un middleware para registrar las URLs que se solicitan
app.use('/', function(req, res, next) {
    console.log('Request Url: ' + req.url);
    next();
});

// Definimos una ruta para el endpoint /person/:id
app.get('/person/:id', function(req, res) {
    // Obtenemos los parámetros de la solicitud
    const message = req.query.message;
    const times = parseInt(req.query.times);
    const person = req.params.id;

    // Validamos el mensaje
    switch (message) {
        case "Hola":
        case "Adios":
        case "Bienvenido":
            break;
        default:
            message = "Hola";
    }

    // Generamos la cadena a mostrar en la vista
    let cad = "";
    if (!isNaN(times) && times > 0) {
        for (let i = 0; i < times; i++) {
            cad += message + " " + person + "\n";
        }
    }

    // Renderizamos la vista person.ejs con los datos obtenidos
    res.render('person', {
        ID: req.params.id,
        message: message,
        times: times,
        cad: cad
    });
});

// Iniciamos la aplicación en el puerto definido
app.listen(PORT);
const express = require('express');

// Crear servidor de express
const app = express();

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true
    });
});

// Escuchar peticiones
app.listen( 4000, () => {
    console.log(`Servidor corriendo en puerto ${ 4000 }`);
});


module.exports = async function (context, req) {
    context.res = {
        body: {
            cont: req
        }
    };
}
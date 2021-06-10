require('dotenv').config();

const express = require ("express");
const cors = require("cors");
const config = require ('./config');


const app = express ();

//middleware: Cada vez que llamas al servidor se va a ejecutar código. La ejecución entera de la respuesta estará compuesta por partes. El middleware te ejecuta una parte común.


//Asumimos que todas las llamadas a la API reciben json y todas las respuestas tienen json.

//cors -->  mecanismo que utiliza cabeceras HTTP adicionales para permitir que un user agent obtenga permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece.
app.use(cors());

// express.json --> utilizaremos el middleware que tiene express de json para que tanto llamadas como respuestas sean formato json. Convierte el body (JSON) en un objeto Javascript
app.use(express.json());

app.use("/teams", require('./teams'));
app.use("/players", require('./players'));

app.listen(config.SERVER_PORT, ()=> {
    console.log(`Futbolsite server on port ${config.SERVER_PORT}`);
})
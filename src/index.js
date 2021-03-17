const express = require('express');
const app = express();
const morgan = require('morgan');

//configuracion
app.set('port', 3000);
app.use(morgan('dev')); 
app.use(express.json());

//rutas
app.use(require('./routes/ingredient_routes'));
app.use(require('./routes/recipe_routes'));

//Empezando el servidor
app.listen(app.get('port'));
console.log("inicio de restaurante");
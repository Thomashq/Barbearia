const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require("cors");
const connectBusboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
require('./dataBase');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(connectBusboy());
app.use(busboyBodyParser());
app.use(cors());

//Variables
app.set('port', 8000);

app.use('/api', require('./src/routes/barber.routes'));
app.use('/services', require('./src/routes/services.routes'));

app.listen(app.get('port'),() => {
    console.log(`WS Escutando porta ${app.get('port')}`);
});
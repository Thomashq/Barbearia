const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require("cors");
require('./dataBase');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Variables
app.set('port', 8000);

app.use('/api', require('./src/routes/barber.routes'));

app.listen(app.get('port'),() => {
    console.log(`WS Escutando porta ${app.get('port')}`);
});
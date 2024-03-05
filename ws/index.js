const express = require('express');
const app = express();
const morgan = require('morgan');

//Middlewares
app.use(morgan('dev'));

//Variables
app.set('port', 8000);

app.listen(app.get('port'),() => {
    console.log(`WS Escutando porta ${app.get('port')}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./app/routes/routes');
const morgan = require('morgan');
const serverPort = require('./app/config/serverPort')

var app = express();
var corsOptions = {
    origin: '*', //definir acesso do front-end para acessar
    optionsSuccessStatus: 200
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan("dev"));


app.use(routes);



app.listen(serverPort, async () => {
    console.log(`\n Server started on port ${serverPort}.\n`);
});

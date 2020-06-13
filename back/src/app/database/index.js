const mongoose = require('mongoose');

//Conexão com a base de dados local do MongoDB
mongoose.connect(
    'mongodb://localhost:27017/mind',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');

routes.use('/users', userController);


module.exports = routes; 
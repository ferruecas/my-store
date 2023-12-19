const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router')
const express = require('express');


function routerApi(app) {
  //generar pat nuevo para el api
  const router = express.Router()
  app.use('/api/v1', router)
  //URL de los api
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;

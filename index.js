const express = require('express');
const routerApi = require('./routes');
const {logErrors,errorHandler,boomErrorHandler} = require('./Middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json())

//aplicacion
routerApi(app);
//error

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(port, () => {
  console.log('Mi port' +  port);
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
var app = express();

//routers
const userRouter = require('./routers/user');
const todoRouter = require('./routers/user');
//middlewares
const tokenMiddleware = require('./middlewares/token-verify');

//parse request json body configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//stablish connection to mongo database
mongoose.connect(`mongodb://${config.database.port}/${config.database.name}`,{useNewUrlParser:true});


//validating token before use API's
app.use('*/app/*',tokenMiddleware);
app.use('/auth/me',tokenMiddleware);

//API's
app.use('/auth',userRouter);
app.use('/app',todoRouter);


var port = process.env.PORT || 3000; 

app.listen(port);

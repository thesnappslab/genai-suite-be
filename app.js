const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('tiny'));

const { success, error } = require('consola');

const mongoose = require('mongoose');

const cors = require('cors');
var options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
  }
  app.use(cors(options));

const { DB_USER, DB_CLUSTER, DB_PASSWORD, DB_NAME } = require('./constants/DatabaseConstants');
const { SERVER_PORT, API_BASE_URL } = require("./constants/AppConstants");
const { EncryptResponseMiddleware, DecryptRequestMiddleware } = require('./middlewares/EncDecMiddleware');
const { createSuperAdmin } = require('./services/AuthService');

const startApp = async () => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`);
        success({message: `Connection to Database is established.`, badge: true});
        createSuperAdmin();
        app.listen(SERVER_PORT, () => {
            success({message: `Server started on port ${SERVER_PORT}`, badge: true});
        })
    }catch(err){
        error({message: `Error occured while starting the application.`+err, badge: true}); 
    }
}
startApp();
app.use(DecryptRequestMiddleware);
app.use(EncryptResponseMiddleware);
app.use(`${API_BASE_URL}/superadmin`, require('./routes/SuperAdmin'));

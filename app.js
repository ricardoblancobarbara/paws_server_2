require('dotenv').config();

var express = require('express');
var app = express();
var sequelize = require('./db');
var user = require('./controllers/usercontroller');
var service = require('./controllers/servicecontroller');

sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));

//UNPROTECTED ROUTES
app.use('/user', user);

//PROTECTED ROUTES
app.use(require('./middleware/validate-session'));
app.use('/service', service);

app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}.`)    
});
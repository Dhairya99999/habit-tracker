//environment variables
const dotenv = require('dotenv');
dotenv.config();

//importing all libraries and modules
const express = require('express');
const db = require('./config/db.config')
const ejsLayout = require('express-ejs-layouts');
const path = require('path');
const habitRouter = require('./src/routes/habits.router');

//initialising server
const server = express();

//parse form data(decode data received from the form)
server.use(express.urlencoded({extended:true}));

//Setup view engine settings
server.set('view engine','ejs');
server.set("views",path.join(path.resolve(),"views"))

//setup ejslayouts middleware
server.use(ejsLayout);

//providing folder 
server.use(express.static('views'));


//routes
server.use('/', habitRouter);


//activating sever and database connection
server.listen(process.env.PORT,()=>{
    console.log("server is listening");
    db.connectUsingMongoose();
})
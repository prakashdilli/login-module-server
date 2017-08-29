const express = require ('express');
const app = express();
var http = require('http');
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/register', require('./controller/login-controller'))

app.listen(3000, function(){
    console.log('server started');
});
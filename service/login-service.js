var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/login", {native_parser: true});

var Q = require('q');
db.bind('logintable');

services = {};

module.exports = services;

services.registerUser = registerUser;
services.checkUser = checkUser;


// function to add new user data into the db
function registerUser(userdata,createdtime,verifytoken){
    //console.log('inside add user services');
    let defered = new Q.defer();

    let data = {
        name:userdata.name,
        password:userdata.password,
        verification:"false",
        createdtime:createdtime,
        verifytoken:verifytoken
    }
   // console.log(data);


    db.logintable.insert(data, function(err, done){
        if(err) defered.reject(err);
        defered.resolve(done);
    });
    return defered.promise;
}


//function to check wheather the user is present in db 
function checkUser(username){
    let defered = new Q.defer();
    //console.log('inside check user',userid);
    let data = {
        name: username
    }
   // console.log(data);
    db.logintable.find(data).count(function(err,count){
        if(err) defered.reject(err);
        defered.resolve(count); 
    });
    
    return defered.promise;

}
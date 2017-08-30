var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/login", {native_parser: true});

var Q = require('q');
db.bind('logintable');
db.bind('validation')

services = {};

module.exports = services;

services.registerUser = registerUser;
services.checkUser = checkUser;

var validatedata = { };

// function to add new user data into the db
function registerUser(userdata,token){
 
    //console.log('inside add user services');
    let defered = new Q.defer(); 
   
    db.logintable.insert(userdata, function(err, done){
        //console.log(token);
        validation(userdata.name,token); //function that adds name and verification token in sep collection
       
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

function validation(name,verfitoken){
    //console.log('======>',name,verfitoken);
    var validatedata = {
        name: name,
        verificationtoken:verfitoken,
        createdat: new Date()
    }
   // console.log('validation data =====>',validatedate);
    db.validation.insert(validatedata);
    console.log('validation',name,verfitoken);

}


router = require('express').Router();
userservice = require('../service/login-service');
const uuidv1 = require('uuid/v1');

router.post('/', registerUser);

module.exports = router;


// registerUser function To register a new user
function registerUser(req,res,next){
   
    // checking the user already exits in the db
    userservice.checkUser(req.body.name)
    .then(function(count){
        //console.log(count);
        
        // Enters if no user exists already
        if(count==0){
          
            var verifytoken = uuidv1();  //  creates random verfication token
            var createdtime = Date.now();   //  creates timestamp
                userservice.registerUser(req.body,createdtime,verifytoken)
                .then(function(done){
                    
                    res.status(200).json("created");
                })
                .catch(function(err){
                    console.log(err);
                })

        }
        else
            res.status(200).json("user already exists");

        

    })
    .catch(function(err){
    console.log(err);
    })
    
     
    
   

}
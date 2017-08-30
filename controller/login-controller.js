router = require('express').Router();
userservice = require('../service/login-service');
const uuidv1 = require('uuid/v1');
var bcrypt = require('bcryptjs');

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

            var salt = bcrypt.genSaltSync(10);          // salt for hash           
            var hash = bcrypt.hashSync(req.body.password, salt);  // hash to be stored in db
            //hashtest = bcrypt.hashSync('prakash1', salt);
           // console.log(hashtest);
            let userdata = {
                name:req.body.name,
                password:hash,
                verification:"false",
                createdtime:new Date()
            }

            //console.log('hash', userdata.password,req.body.password);
           // console.log(bcrypt.compareSync(req.body.password, userdata.password));  //** for checking the password during login
                userservice.registerUser(userdata,verifytoken)
                .then(function(done){
                    console.log('completed');
                    res.status(200).json(done);
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
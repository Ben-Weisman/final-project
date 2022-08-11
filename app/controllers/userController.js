const { randomUUID } = require('crypto');
const userDataAccess = require('./../data-access/userDataAccess');


// IN USE
module.exports.validate = (req,res) => {
    console.log('LOG: in validate')
    let password = req.body.password;
    let email = req.body.email;

    console.log(`email is ${email}, password is ${password}`)
    userDataAccess.fetchUserByEmail(email).then((user) => {
        resJson = validateUser(user,password);
        if (resJson){
            res.status(200);
            res.contentType('application/json');
            res.send(resJson);
        }
        else{
            res.status(401);
            res.send({status:"error", message:"Invalid credentials"});
        } 
    }).catch((err) => {
        res.status(401);
        res.contentType('application/json');
        res.send({status:"error",message: "User isn't found"})
    })
}


// IN USE
module.exports.createUser = (req,res) => {
    
    user = req.body;
    console.log('LOG: in createUser');
    if (validateParams(user)){
        console.log(`LOG: passed validation`)

        userRecord = {
            name:user.name,
            email:user.email,
            password: user.password,
            cookbookID:randomUUID(),
            isAdmin: user.isAdmin,
            active: true
        }
        console.log('LOG: userRecord is: %j', userRecord)
        userDataAccess.insertUser(userRecord).then(() => {
            res.status(200);
            res.contentType('application/json');
            res.send({status:"ok"});
        }).catch((err) => {
            res.status(400);
            res.contentType('application/json');
            res.send({status: "error", message: err});
        })
    }
    else {
        res.status(400);
        res.contentType('application/json');
        res.send({status:"error"});
    }
}

module.exports.removeUser = (req,res) => {
    user = req.body;
    userDataAccess.deActivateUser(user).then(() => {
        res.status(200);
        res.contentType('application/json');
        res.send({status:"ok"});
    }).catch((err) => {
        res.status(400);
        res.contentType('application/json');
        res.send({status:"ERROR"});
    });
}

// IN USE
const validateParams = (user) =>{
    console.log(`LOG: in validateParams`);
    if (user.name.length < 1 || user.password.length < 1 || !validateEmail(user.email))
        return false;
    return true;
}


// IN USE
const validateUser = (user,pass) => {
    console.log(`LOG: user email: ${user.email}`)
    res = null;
    if (user){
        if (user.active == true){
            console.log('LOG: validateUser user: ' + user.password);
            if (user.password == pass){
                console.log('LOG: valid')
                is_admin = isAdmin(user);
                res = {
                    name:user.name,
                    email:user.email,
                    admin: is_admin,
                    status: "ok"
                }
            }
        }
    }
    return res;
}

const isAdmin = (user) => {
    return user.isAdmin;
}
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  


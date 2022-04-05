const { randomUUID } = require('crypto');
const userDataAccess = require('./../data-access/userDataAccess');

module.exports.validate = (req,res) => {
    console.log('Log: In users/validate');
    let password = req.body.user_password;
    let email = req.body.email;

    userDataAccess.fetchUserByEmail(email, (err,data) => {
        if (err){
            res.status(401);
        }
        else {
            resJson = validateUser(data,password);
            if (resJson){
                res.status(200);
                res.contentType('application/json');
                console.log(`LOG: resJson = ${JSON.stringify(resJson)}`);
                res.send(resJson);
            } 
            else res.status(401);
        }
    });
}

module.exports.createUser = (req,res) => {
    console.log('LOG: in createUser');
    user = req.body;
    if (validateParams(user)){
        email = user.email;
        password = user.password;
        username = email;
        cookbook_id = randomUUID();
        user_id = randomUUID();
        fullName = user.name;

        userRecord = {
            user_id:user_id,
            email:email,
            user_password: password,
            full_name:fullName,
            username:email,
            cookbook_id:cookbook_id,
            profile_picture_id:null
        }
        console.log('LOG: userRecord = ' + JSON.stringify(userRecord,null,2));

        userDataAccess.insertUser(userRecord, (err,data) => {
            console.log('LOG: --calledback--')
            if (err){
                res.status(400);
            }
            else{
                res.status(200);
            }
        });
    }
}

module.exports.removeUser = (req,res) => {
    user = req.body;
    resJson = userDataAccess.deleteUser(user);
    res.status(200);
    res.send(resJson);
}

const validateParams = (user) =>{
    if (user.name.length < 1 || user.password.length < 1 || !validateEmail(user.email))
        return false;
    return true;
}

const validateUser = (user,pass) => {
    console.log('LOG: in validateUser')
    res = null;
    if (user){
        console.log('LOG: passed if(user)')
        console.log(`LOG: user = ${JSON.stringify(user[0])}`);
        if (user[0].user_password == pass){
            is_admin = isAdmin(user[0]);
            res = {
                "name":user[0].full_name,
                "email":user[0].email,
                "is_admin": is_admin
            }
        }
    }
    return res;
}

const isAdmin = (user) => {
    if (user.is_admin)
        return true;
    return false;
}
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  


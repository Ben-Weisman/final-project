const { randomUUID } = require('crypto');
const userDataAccess = require('./../data-access/userDataAccess');

module.exports.validate = (req,res) => {
    console.log('LOG: in validate')
    let password = req.body.user_password;
    let email = req.body.email;

    userDataAccess.fetchUserByEmail(email).then((user) => {
        console.log(JSON.stringify(user,null,4));
        resJson = validateUser(user,password);
        if (resJson){
            res.status(200);
            res.contentType('application/json');
            res.send(resJson);
        }
    }).catch((err) => {
        res.status(401);
    })
}

module.exports.createUser = (req,res) => {
    user = req.body;
    if (validateParams(user)){
        email = user.email;
        password = user.password;
        cookbook_id = randomUUID();
        user_id = randomUUID();
        fullName = user.name;

        userRecord = {
            user_id:user_id,
            email:email,
            user_password: password,
            full_name:fullName,
            cookbook_id:cookbook_id,
            profile_picture_id:null,
            is_admin: false
        }
        
        userDataAccess.insertUser(userRecord).then(() => {
            res.status(200);
            res.contentType('application/json');
            res.send("ok");
        }).catch((err) => {
            res.status(400);
            res.contentType('application/json');
            res.send(err);
        })
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
    res = null;
    if (user){
        if (user[0].user_password == pass){
            is_admin = isAdmin(user[0]);
            res = {
                name:user[0].full_name,
                email:user[0].email,
                admin: is_admin
                
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
  


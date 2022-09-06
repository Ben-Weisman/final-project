const { randomUUID } = require('crypto');
const userDataAccess = require('./../data-access/userDataAccess');




module.exports.update = (req,res) => {
    const email = req.body.email;
    const fieldToUpdate = req.body.fieldToUpdate;
    const newValue = req.body.newValue;

    userDataAccess.updateDetails(email,fieldToUpdate,newValue)
    .then((data) => {
        res.status(200);
        res.contentType('application/json');
        res.send({status:"ok", message: data});
    })
    .catch((err) => {
        res.status(400);
        res.contentType('application/json');
        res.send({status:"error",message: err});
    });
}



// IN USE
module.exports.validate = (req,res) => {
    let password = req.body.password;
    let email = req.body.email;

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
        res.send({status:"error",message: err})
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
            isAdmin: false,
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


// const validateUser = (user,pass) => {
//     res = null;
//     if (user){
//         console.log('LOG: validateUser user: ' + user[0].user_password);
//         console.log('LOG: pass = ' + pass);
//         if (user[0].user_password == pass){
//             console.log('LOG: valid')
//             is_admin = isAdmin(user[0]);
//             res = {
//                 name:user[0].full_name,
//                 email:user[0].email,
//                 admin: is_admin,
//                 status: "Success",
//                 userID: user[0].user_id
//             }
//         }
//     }
//     return res;
// }

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
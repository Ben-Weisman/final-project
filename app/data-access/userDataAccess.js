const { query } = require('express');
const db = require('./../db/db');



module.exports.fetchUserByEmail = (email,callback) => {
    // query the db and getch the user by given email address (unique).
    let query = `SELECT email,user_password,is_admin,full_name FROM User WHERE email = '${email}';`
    db.query(query,(err,result) => {
        if (err) callback(err,null);
        else callback(null,result);
    })
    
}

module.exports.insertUser = (userRecord, callback) =>{
    console.log('LOG: in insertUser')
    let query = `INSERT INTO User VALUES ('${userRecord.user_id}','${userRecord.email}','${userRecord.user_password}','${userRecord.full_name}','${userRecord.username}','${userRecord.cookbook_id}','${userRecord.profile_picture_id}');`;
    db.query(query,(err,result)=>{
        if (err){
            callback(err,null);
        }
        else callback (null,result);
    });
}

module.exports.deleteUser = (user) =>{
    email = user.email;

    // delete user record from db
}
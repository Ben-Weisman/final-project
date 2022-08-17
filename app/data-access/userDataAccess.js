const { query } = require('express');
const db = require('./../db/db');
const worker = require('./../data-access/dataAccess');
const queries = require('./../data-access/queries/queries');
const { resolve } = require('path');
const Users = require('../utils/models/user');
const { ensureIndexes } = require('../utils/models/user');
const Cookbooks = require('../utils/models/cookbook');



module.exports.fetchUserByEmail = (email) => {
    return new Promise ((resolve,reject) => {
        console.log(`LOG: in fetchUserByEmail, email is ${email}`);
        Users.findOne({'email':email}, function(err,data) {
            if(err) reject(err);
            else{
                console.log('LOG: found');
                 resolve(data);}
        });
    }) ;
}

// IN USE
module.exports.insertUser = (userRecord) =>{

    console.log('LOG: in insertUser');
    const user = new Users(userRecord);
    const cookbook = new Cookbooks({
        cookbookID: user.cookbookID,
        userEmail: user.email,
        recipes:[]
    })
    return new Promise((resolve,reject) => {
        console.log('LOG: in promise, user: %j', user)
        user.save()
        .then((result) => {
            console.log('LOG: resolved. result: %j', result)
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
        cookbook.save()
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports.deActivateUser = (user) =>{
    email = user.email;
    console.log(`LOG: in deActivateUser, email is ${email}`)
    return new Promise ((resolve,reject) => {
        console.log(`LOG: in deActivateUser`);
        Users.findOneAndUpdate({email:email},{$set:{active:false}},{new: true}, (err,data) => {
            if (err) reject(err);
            else{
                console.log(`LOG: found user--> ${data}`);
                resolve(data);
            } 
        })
    });
}
const { query } = require('express');
const db = require('./../db/db');
const worker = require('./../data-access/dataAccess');
const { resolve } = require('path');
const Users = require('../utils/models/user');
const { ensureIndexes } = require('../utils/models/user');
const Cookbooks = require('../utils/models/cookbook');
// const elasticWorker = require('./../controllers/elasticWorker');


module.exports.updateDetails = async (email,fieldToUpdate,newValue) => {
    console.log(`LOG: email = ${email}, fieldToUpdate = ${fieldToUpdate}, newValue = ${newValue}`)
    switch (fieldToUpdate.toLowerCase()){
        case "password": return Users.findOneAndUpdate({email:email}, {"password":newValue}).exec();
        default: return "error";
    }
}

module.exports.updateDetails = async (email,fieldToUpdate,newValue) => {
    console.log(`LOG: email = ${email}, fieldToUpdate = ${fieldToUpdate}, newValue = ${newValue}`)
    switch (fieldToUpdate.toLowerCase()){
        case "password": return Users.findOneAndUpdate({email:email}, {"password":newValue}).exec();
        default: return "error";
    }
}


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
    return new Promise ((resolve,reject) => {
        Users.findOneAndUpdate({email:email},{$set:{active:false}},{new: true}, (err,data) => {
            if (err) reject(err);
            else{
                // elasticWorker.update('user','active',false,user.email);
                resolve(data);
            } 
        })
    });
}
const { query } = require('express');
const db = require('./../db/db');
const worker = require('./../data-access/dataAccess');
const queries = require('./../data-access/queries/queries');
const { resolve } = require('path');


module.exports.fetchUserByEmail = (email) => {
    return new Promise ((resolve,reject) => {
        console.log('LOG: in fetchUserByEmail Promise');
        worker.executeQuery(queries.getUserByEmail(email)).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}


module.exports.insertUser = (userRecord) =>{
    return new Promise((resolve,reject) => {
        console.log('LOG: ' + JSON.stringify(userRecord,null,4));
            worker.executeQuery(queries.insertNewUser(userRecord)).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
    })
}

module.exports.deleteUser = (user) =>{
    email = user.email;

    // delete user record from db
}
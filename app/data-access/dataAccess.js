
const { query } = require('express');
const db = require('./../db/db');


module.exports.fetchRecordsFromTable = (tableName,columns,callback) => {
    tableName = tableName.trim();
    columns = columns.trim();

    let query = `SELECT ${columns} FROM ${tableName}`;

    db.query(query,(err,result) => {
        if (err)   
            throw err //callback(err,null);
        else {
             return callback(null,result);
    }
})
}

module.exports.executeQuery = (query) => {
    return new Promise((resolve,reject) => {
        console.log(`LOG: executing query: ${query}`)
        db.query(query,(err,result) => {
            if (err)
                reject(err);
            else {
                resolve(result)
            };
        })
    })

}

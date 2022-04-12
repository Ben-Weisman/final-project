
const { query } = require('express');
const db = require('./../db/db');


module.exports.fetchRecordsFromTable = (tableName,columns,callback) => {
    console.log('LOG: in fetchRecordsFromTable');
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
    console.log('LOG: in executeQuery, query = ' + query);
    return new Promise((resolve,reject) => {
        db.query(query,(err,result) => {
            if (err)
                return reject(err);
            else {
                console.log('LOG: resolving..');
                resolve(result)
            };
        })
    })

}

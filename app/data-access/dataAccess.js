
const { query } = require('express');
const db = require('./../db/db');


module.exports.fetchRecordsFromTable = (tableName,columns,callback) => {
    console.log('LOG: in fetchRecordsFromTable');
    tableName = tableName.trim();
    columns = columns.trim();

    let query = `SELECT ${columns} FROM ${tableName}`;
    executeQuery(query,callback);
}

const executeQuery = (query,callback) => {
    console.log('LOG: in executeQuery');
    db.query(query,(err,result) => {
        if (err)   
            callback(err,null);
        else callback(null,result);
    });
}
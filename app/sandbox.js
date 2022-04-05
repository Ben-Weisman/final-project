// const { query } = require('express');
// const { test } = require('media-typer');
// const db = require('./db/db');
const dataAccessMdule = require('./../app/data-access/dataAccess');


// const ben = (callback)=>{
//     let query = 'SELECT * FROM Measurement_Units';
//     db.query(query,(err,result) =>{
//         if (err)
//             console.log(err);
//         else{

//         }
//     })
// }


// const handleResult = (err,data) => {
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log(JSON.stringify(data,null,4));
//     }
// }

// ben(handleResult);


const ben = () => {
    let res = dataAccessMdule.fetchRecordsFromTable('Ingredients','*',(err,data) => {
        console.log('LOG: in callback function');
        if (err) console.log(err);
        else{
            console.log(data);
            // console.log(JSON.stringify(data,null,4));
        } 
    });
    console.log(JSON.stringify(res));
}
ben();
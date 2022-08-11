


const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://admin:admin311@final-project.au3lb1s.mongodb.net/final-project?retryWrites=true&w=majority';

mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    console.log('Connected to DB');
})
.catch((err) => {
    console.log(err);
});



// const mysql = require('mysql');


// create connection
// const db = mysql.createConnection({
//     host: "final-project-db.cnyhhp4b8imt.us-east-1.rds.amazonaws.com",
//     user: "admin",
//     password: "admin311",
//     database: "Final_project"
// });

// // connect
// db.connect((err) => {
//     if (err){
//         throw (err);
//     }
//     console.log(`MySQL Connected...`);
//     let sql = ''
// })

module.exports = mongoose;


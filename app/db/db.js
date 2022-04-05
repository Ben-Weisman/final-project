const mysql = require('mysql');


// create connection
const db = mysql.createConnection({
    host: "final-project-db.cnyhhp4b8imt.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "admin311",
    database: "Final_project"
});

// connect
db.connect((err) => {
    if (err){
        throw (err);
    }
    console.log(`MySQL Connected...`);
    let sql = ''
})

module.exports = db;


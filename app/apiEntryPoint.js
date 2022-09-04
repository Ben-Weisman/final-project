const users = require('./routes/userRoutes');
const recipes = require('./routes/recipesRoutes');
const search = require('./routes/searchRoutes');

const express = require('express');
app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
 });
 
console.log("LOG: in apiEntryPoint");
//middleware
app.use(express.json());

app.use('/api/v1/users',users);
app.use('/api/v1/recipes',recipes);
app.use('/api/v1/search',search)

const port = 3000;

app.listen(port);







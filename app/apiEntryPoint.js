const users = require('./routes/userRoutes');
const recipes = require('./routes/recipesRoutes');
const express = require('express');
app = express();


console.log("LOG: in apiEntryPoint");
//middleware
app.use(express.json());

app.use('/api/v1/users',users);
app.use('/api/v1/recipes',recipes);


const port = 3000;

app.listen(port);







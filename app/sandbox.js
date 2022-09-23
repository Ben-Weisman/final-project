const db = require('./db/db')
const Recipes = require('./utils/models/recipes')




const run = () => {
    Recipes.deleteMany({}).exec();
}

run();
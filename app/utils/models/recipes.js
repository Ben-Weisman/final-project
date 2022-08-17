const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipesSchema = new Schema ({
    recipeID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    ingredients: [{description: String}],
    instructions: [{description: String}],
    upload_date: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, {timestamps:true});


const Recipes = mongoose.model('Recipes',recipesSchema);
module.exports = Recipes;
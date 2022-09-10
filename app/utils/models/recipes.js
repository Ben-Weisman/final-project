const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipesSchema = new Schema ({
    recipeID: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category:[{
        type: String
    }],
    ingredients: [{type: String}],
    instructions: [{type: String}],
    upload_date: {
        type: Date,
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
    },
    public: {
        type: Boolean,
        required: true
    },
    likes: [{type: String}],
    comments: [{
        email: String,
        name: String,
        dateCreated: String,
        content: String
    }],
    url: {
        type: String,
        required: false
    }
}, {timestamps:true});


const Recipes = mongoose.model('Recipes',recipesSchema);
module.exports = Recipes;
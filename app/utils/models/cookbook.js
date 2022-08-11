const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cookbookSchema = new Schema ({
    cookbookID: {
        type: String,
         required: true
        },
    userEmail: {
        type: String,
        required: true
    },
    recipes: [{id: String}]
}
    ,{timestamps:true});

const Cookbooks = mongoose.model('Cookbooks',cookbookSchema);
module.exports = Cookbooks;
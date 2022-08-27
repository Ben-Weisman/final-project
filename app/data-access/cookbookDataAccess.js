const Cookbook = require('../utils/models/cookbook');


module.exports.getRecipesIDsByUserEmail = (email) => {
    return Cookbook.find({userEmail:email},'recipes').select('recipes').exec();
}


module.exports.addRecipe = (recipeID, email) => {

    return new Promise((resolve,reject) => {
        let filter = { userEmail :email};
        let update = {$push: {"recipes":  {id:recipeID}}};
        Cookbook.findOneAndUpdate(filter,update)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
    })
}

module.exports.removeRecipeFromCookbook = async (email,recipeID) => {
    return Cookbook.updateOne({ userEmail: email }, {
        $pull: {
            recipes: {id: recipeID},
        },
    }).exec();
}

const Cookbook = require('../utils/models/cookbook');


module.exports.getRecipesIDsByUserEmail = (email) => {
    return Cookbook.find({'userEmail':email},'recipes').select('recipes').exec();
}


module.exports.addRecipe = (queryVal, pushVal) => {

    return new Promise((resolve,reject) => {
        let filter = { 'userEmail' :queryVal};
        let update = {$push: {"recipes":  {id:pushVal}}};
        Cookbook.findOneAndUpdate(filter,update)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            console.log(err)
            reject(err);
        });
    })
}

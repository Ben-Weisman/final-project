module.exports = {
    getAllRecipesDetails:"SELECT recipe_id,recipe_name,recipe_description,category,uploaded_date FROM Recipes;",
    getAllRecipesIngredients:"SELECT Recipes.recipe_id, Ingredients.ingredient_description FROM (Recipes INNER JOIN Recipe_Ingredients ON Recipes.recipe_id = Recipe_Ingredients.recipe_id) INNER JOIN Ingredients ON Recipe_Ingredients.ingredient_id = Ingredients.id;",
    getAllRecipesInstructions:"SELECT Recipes.recipe_id,Instructions.instruction_description,Instructions.step FROM (Recipes INNER JOIN Recipe_Instructions ON Recipes.recipe_id = Recipe_Instructions.recipe_id) INNER JOIN Instructions ON Recipe_Instructions.instruction_id = Instructions.instruction_id;",
    
}
module.exports.getCookbookByUserID = (id) => {
    return `SELECT recipe_id FROM Cookbook WHERE user_id = ${id};`;
}

module.exports.getRecipeRecordsByIDsBuilder = (ids_array,record_type) => {
    switch (record_type){
        case "ingredients":
             str = this.getAllRecipesIngredients;
             break;
        case "details":
            str = this.getAllRecipesDetails;
            break;
        case "instructions":
            str = this.getAllRecipesInstructions;
            break;
        default: throw err;
    }
    str = str.replace(';','');
    str += ' WHERE';
    for (let i = 0;i<ids_array.length;i++){
        if (i<ids_array.length-1)
            str += ` recipe_id = ${ids_array[i]} OR`;
        else str+= ` recipe_id = ${ids_array[i]};`
    }
    return str;
}

module.exports.getIngredientsByRecipesIDs = (ids_array) => {
    str = this.getAllRecipesIngredients;
    str += ' WHERE';
    for (let i=0;i<ids_array.length;i++){

    }
}

module.exports.getUserByEmail = (email) => {
    return `SELECT user_id, email,user_password,is_admin,full_name FROM User WHERE email = '${email}';`
}


module.exports.insertNewUser = (userRecord) => {
    return `INSERT INTO User VALUES ('${userRecord.user_id}','${userRecord.email}','${userRecord.user_password}','${userRecord.full_name}','${userRecord.cookbook_id}','${userRecord.profile_picture_id}','${userRecord.is_admin}');`;
}

module.exports.deleteUser = (user) => {
    return ``
}

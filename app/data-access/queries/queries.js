

// TO DELETE //


const Tables = require('../../utils/dbEnums');

module.exports = {
    getAllRecipesDetails:"SELECT Recipes.recipe_id,recipe_name,recipe_description,category,uploaded_date FROM Recipes;",
    getAllRecipesIngredients:"INNER JOIN Ingredients i ON ri.ingredient_id = i.id INNER JOIN measurement_qty mq ON ri.measurement_qty_id = mq.measurement_qty_id INNER JOIN measurement_units mu ON mu.measurement_id = ri.measurement_id;",
    getAllRecipesInstructions:"SELECT Recipes.recipe_id,Instructions.instruction_description,Instructions.step FROM (Recipes INNER JOIN Recipe_Instructions ON Recipes.recipe_id = Recipe_Instructions.recipe_id) INNER JOIN Instructions ON Recipe_Instructions.instruction_id = Instructions.instruction_id;",
    getAllIngredients:"select id,ingredient_name from Ingredients;"
}


module.exports.deActivateUser = (email) => {
    return `UPDATE User SET active = ${false} WHERE email = '${email}';`;
}

module.exports.deleteRecipeInstructionsQueryBuilder = (id) => {
    return `DELETE ri,ins FROM ${Tables.Tables.RECIPE_INSTRUCTIONS_TABLE} ri JOIN ${Tables.Tables.INSTRUCTIONS_TABLE} ins ON ri.instruction_id = ins.instruction_id WHERE recipe_id = ${id};`;
}

module.exports.deleteQueryBuilder = (tableName,id) => {
    return `DELETE FROM ${tableName} WHERE recipe_id = ${id}`;  
}


module.exports.insertQueryBuilder = (table,values) => {
    return `INSERT INTO ${table} VALUES ${values};`;
}


module.exports.getCookbookByUserID = (id) => {
    return `SELECT recipe_id FROM Cookbook WHERE user_id = '${id}';`;
}

module.exports.getAllRecipesIDsByOwner = (owner_id) => {
    return `SELECT recipe_id FROM Recipes WHERE owner_id = '${owner_id}';`;
}


// params: ids_array (an array of recipes ids to be queried), record_type (what type of recipe component to query)
// returns: a QUERY STRING to later execute, adapted to the recipes ids and the component type.
module.exports.getRecipeComponentsByIDsQueryBuilder = (ids_array,record_type) => {
    
    switch (record_type){
        case "ingredients":
             str = module.exports.getAllRecipesIngredients;
             break;
        case "details":
            str = module.exports.getAllRecipesDetails;
            break;
        case "instructions":
            str = module.exports.getAllRecipesInstructions;
            break;
        default: throw err;
    }
    str = str.replace(';','');
    str += ' WHERE';
    console.log('LOG: record_type = ' + record_type);
    for (let i = 0;i<ids_array.length;i++){
        console.log(`LOG: ids_array[${i}] = ${ids_array[i]}`);
        if (i<ids_array.length-1)
            str += ` Recipes.recipe_id = '${ids_array[i]}' OR`;
        else str+= ` Recipes.recipe_id = '${ids_array[i]}';`
    }
    return str;
}


module.exports.getUserByEmail = (email) => {
    return `SELECT email,user_password,is_admin,full_name FROM User WHERE email = '${email}';`
}


module.exports.insertNewUser = (userRecord) => {
    return `INSERT INTO User VALUES ('${userRecord.email}','${userRecord.user_password}','${userRecord.full_name}','${userRecord.cookbook_id}','${userRecord.profile_picture_id}','${userRecord.is_admin}','${active}');`;
}


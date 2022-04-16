module.exports.parseToRecipe = (data) =>{
    res = {};
    res['recipes'] = [];
    recipes = res['recipes'];

    data.recipes.forEach(recipe => {
        ingredients = data.ingredients.filter(ingredient => ingredient.recipe_id == recipe.recipe_id);
        recipe.ingredients = [];
        ingredients.forEach( i => {
            console.log(`LOG: i => ${i}`);
            (recipe.ingredients).push(i);
        });
        instructions = data.instructions.filter(instruction => instruction.recipe_id == recipe.recipe_id);
        recipe.instructions = [];
        instructions.forEach(is => {
            recipe.instructions.push(is);
        });

        recipes.push(recipe);
    });
    return res;
}
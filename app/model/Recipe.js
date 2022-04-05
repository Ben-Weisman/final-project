const { type } = require("os");


class Recipe {
    constructor(name,typeArr,description,ingredients,instructions,picturePath)
    {
        this.name = name;
        this.typeArr = typeArr;
        this.description = description;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.picturePath = picturePath;
    }
    
    getRecipe(){
        return this;
    }
    getIngredients(){
        return this.ingredients;
    }
    getInstructions(){
        return this.instructions;
    }
    getPictureFilePath(){
        return this.picturePath;
    }
    getDescription(){
        return this.description;
    }
    getRecipeType(){
        return this.typeArr;
    }
    getAsJsonObj()
    {
        return JSON.stringify(this);
    }
}
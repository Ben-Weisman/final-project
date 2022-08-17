
const { query } = require('express');
const db = require('./../db/db');
const dbAccess = db.connection;
const recipesDataAccess = require ('./recipesDataAccess');
const cookbookDataAccess = require ('./cookbookDataAccess')
const Recipes = require('../utils/models/recipes')


/*
params = {
        collection: ,
        queryField: ,
        queryVal: ,
        arrayToUpdate: ,
        pushVal: 
    }
*/
const handleCookbook = (params) => {
    switch (params.arrayToUpdate){
        case 'recipes': return new Promise((resolve,reject) => {
            cookbookDataAccess.addRecipe(params.queryVal, params.pushVal)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    })
}
}

module.exports.pushValueToArrayField = (params) => {

    switch (params.collection){
        case 'cookbooks': return handleCookbook(params);
    }

}

module.exports.fetchRecipeByName = (name) => {
    return new Promise((resolve,reject) => {
        recipesDataAccess.findByName(name)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        })
    });
}



module.exports.zombifyRecipe = (id) => {

    return new Promise((resolve,reject) => {
        Recipes.findOneAndUpdate({recipeID:id}, {active:false})
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
    }); 
}


module.exports.addRecipeToCookbook = (recipeID,email) => {
    
    return new Promise ((resolve,reject) => {
        cookbookDataAccess.addRecipe(recipeID,email)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
    });
}


module.exports.fetchRecordsFromTable = (tableName,columns,callback) => {
    tableName = tableName.trim();
    columns = columns.trim();

    let query = `SELECT ${columns} FROM ${tableName}`;

    db.query(query,(err,result) => {
        if (err)   
            throw err //callback(err,null);
        else {
             return callback(null,result);
    }
})
}

module.exports.executeQuery = (query) => {
    return new Promise((resolve,reject) => {
        db.query(query,(err,result) => {
            if (err)
                reject(err);
            else {
                resolve(result)
            };
        })
    })

}



// ======================================= //


module.exports.insertNewDocument = (doc,collectionName) => {
    return dbAccess.collection(collectionName).insertOne(doc);
}

module.exports.getCookbookByUser = (email) => {
    return new Promise ((resolve,reject) => {
        recipesDataAccess.fetchCookbookByUserID(email)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports.getAllRecipes = () => {
    return recipesDataAccess.fetchAll();
}

module.exports.getRecipesByOwner = (email) => {
    return recipesDataAccess.fetchRecipesByOwner(email);
}



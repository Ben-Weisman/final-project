
const { query } = require('express');
const db = require('./../db/db');
const dbAccess = db.connection;
const recipesDataAccess = require ('./recipesDataAccess');
const cookbookDataAccess = require ('./cookbookDataAccess')
const Recipes = require('../utils/models/recipes')
// const elasticWorker = require('./../controllers/elasticWorker')

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
            cookbookDataAccess.addRecipe(params.pushVal,params.queryVal)
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
    // elasticWorker.appendToArray('cookbook','recipes',params.queryVal,params.pushVal);
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
        console.log(`LOG: in zombifyRecipe, id is ${id}`);
        Recipes.findOneAndUpdate({recipeID:id}, {active:false})
        .then((data) => {
            console.log(`LOG: deactivated recipeID ${id}`)
            // elasticWorker.update('recipe','active',false,id).then((data) => {
            //     elasticWorker.refresh();
            // });
            
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
            // elasticWorker.appendToArray('cookbook','recipes',email,recipeID);
            // elasticWorker.refresh();
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
    // elasticWorker.insert('recipe',doc);
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

module.exports.getAllRecipes = async () => {
    console.log('in getAllRecipes');
    return await recipesDataAccess.fetchAll();
}

module.exports.getRecipesByOwner = (email) => {
    return recipesDataAccess.fetchRecipesByOwner(email);
}



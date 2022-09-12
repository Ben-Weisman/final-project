const elasticWorker = require('./elasticWorker');

/*
Gets: 
{
    fieldName: name/ownerName,
    value:,
}
*/
const searchRecipes = async (req,res) => {
    fieldName = req.body.fieldName;
    searchValue = req.body.value;

    let searchOBJ = {
        index: 'recipe',
        size: 10000,
        query:{
            match:{}
        }
    }
    
    
    searchOBJ.query.match[fieldName] = searchValue;
    console.log(JSON.stringify(searchOBJ))
    res.contentType('application/json');

    try{
        const data = await elasticWorker.search(searchOBJ);
        res.status(200);
        res.send(data)
    } catch (err) {
        res.status(400);
        res.send({status:"error",message: err});
    }
    

}


/*
Gets: {
    ingredients: [ingredient1,ingredient2,...]
}
*/
const searchIngredients = async (req,res) => {
    let searchOBJ = {
        size:10000,
        query: {
            bool: {
                must: []
            }
        }
    }

    const values = req.body.ingredients;
    
    values.forEach(ingredient => {
        let wildcard = {
            wildcard: {
                ingredients: {
                    case_insensitive: true,
                    value: ingredient + '*'
                }
            }

        }
        searchOBJ.query.bool.must.push(wildcard);
    });     
    res.contentType('application/json');

    try {
        const data = await elasticWorker.search(searchOBJ);
        res.status(200);
        res.send(data);
    } catch(err) {
        res.status(400);
        res.send({status:"error",message:err});
    }
}

/*
Gets: {
    categories: [category1,category2,...]
}
*/
const searchByCategory = async (req,res) => {
    const values = req.body.categories;

    let searchOBJ = {
        index: 'recipe',
        size:10000,
        query:{
            bool:{
                should: []
            }
        }
    }

    values.forEach(category => {
        let wildcard = {
            wildcard: {
                category: {
                    case_insensitive: true,
                    value: category + '*'
                }
            }

        }
        searchOBJ.query.bool.should.push(wildcard);
    }); 

    console.log(JSON.stringify(searchOBJ))
    res.contentType('application/json');

    try {
        const data = await elasticWorker.search(searchOBJ);
        res.status(200);
        res.send(data);
    } catch(err) {
        res.status(400);
        res.send({status:"error",message:err});
    }

}

module.exports = {searchRecipes,searchIngredients,searchByCategory};
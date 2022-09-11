const elasticWorker = require('./elasticWorker');

/*
Gets: 
{
    fieldName: name/owner,
    value:,
}
*/
const searchRecipes = async (req,res) => {
    fieldName = req.body.fieldName;
    searchValue = req.body.value;

    let searchOBJ = {
        index: 'recipe',
        query:{
        }
    }
    
    searchOBJ.query.wildcard = {};
    searchOBJ.query.wildcard[fieldName] = {
        case_insensitive:true,
        value: searchValue
    }
    res.contentType('application/json');

    try{
        const data = await elasticWorker.search(searchOBJ);
        res.status(200);
        res.send({status:"ok",message:data})
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
    let searchObj = {
        query: {
            bool: {
                should: []
            }
        }
    }

    const values = req.body.ingredients;
    values.forEach(ingredient => {
        let wildcard = {
            ingredients: {
                case_insensitive: true
            }
        }
        wildcard.ingredients[value] = ingredient+'*';
        searchObj.should.push(wildcard);
    }); 

    res.contentType('application/json');

    try {
        const data = await elasticWorker.search(searchObj);
        res.status(200);
        res.send({status:"ok", message: data});
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
        query:{
            bool:{
                should: []
            }
        }
    }
    
    // searchOBJ.query.wildcard = {};
    // searchOBJ.query.wildcard[fieldName] = {
    //     case_insensitive:true,
    //     value: searchValue
    // }




    // ======================================
  

    values.forEach(category => {
        let wildcard = {
            wildcard: {
                category: {
                    case_insensitive: true,
                    value: category + '*'
                }
            }

        }
        // wildcard.category[value] = category+'*';
        searchOBJ.query.bool.should.push(wildcard);
    }); 

    console.log(JSON.stringify(searchOBJ))
    res.contentType('application/json');

    try {
        const data = await elasticWorker.search(searchOBJ);
        res.status(200);
        res.send({status:"ok", message: data});
    } catch(err) {
        res.status(400);
        res.send({status:"error",message:err});
    }

}

module.exports = {searchRecipes,searchIngredients,searchByCategory};
const { Client } = require('@elastic/elasticsearch')
const { query } = require('express')
const { removeRecipeFromCookbook } = require('./recipesController')
// const config = require('config');



// const client = new Client({
// cloud: {
//       id: 'My_deployment:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGU1OTFlZGMxZjYyMjRkZGQ5MjAyZTQ3MTZmNzZhYThkJDk4YWVkNGM1MTg3NjQ3OWVhN2M4NGQ0NmZlMzcyODli'
//     },
//     auth: {
//       apiKey: 'VTdTZzdvSUJYazJXalJ3c2lJcW06a005RXVPaTRUMnlEYktaSmhWYTZtZw=='
//     }
//   })

//   client.info()
//   .then(response => console.log(response))
//   .catch(error => console.error(error))


const search = async (searchOBJ) => {
  console.log('in search')
  const raw =  await client.search(searchOBJ);
  console.log(raw)
  let res = [];
  raw.hits.hits.forEach(elem => {
    res.push(elem._source)
  });
  return res;
}

//.removeFromArray('cookbook','recipes',recipeID,userEmail);
const removeFromArray = async (indexName,arrayToRemoveFrom,valueToRemove,idToSearch) => {
  let obj = {};
  obj.index = indexName;
  obj.id = idToSearch;
  let script = {
    lang: "painless",
    source: "ctx._source."+arrayToRemoveFrom+".remove(ctx._source."+arrayToRemoveFrom+".indexOf('"+valueToRemove+"'));" //// modify
  }
  obj.script = script;

  return await client.update(obj);
}


const appendToArray = async (indexName,fieldToAppendTo,idToSearch,newValue) => {
  let obj = {};
  obj.index = indexName;
  obj.id = idToSearch;
  let script = {
    lang: "painless",
    source: "ctx._source."+fieldToAppendTo+".add('"+newValue+"')"
  }
  obj.script = script;

  return await client.update(obj);
}


const insert = async (indexName,objectToAdd) => {
  let obj = {};
  obj.index = indexName;
  obj.body = objectToAdd;
  obj.refresh = true;

  switch(indexName){
    case 'recipe': obj.id = objectToAdd.recipeID;break;
    case 'user': obj.id = objectToAdd.email;break;
    case 'cookbook': obj.id = objectToAdd.userEmail;break;
  }
  console.log('\n\nobj ===== >\n\n')
  console.log(JSON.stringify(obj))
  return await client.index(obj);

}

const update = async (indexName,fieldToUpdate,newValue,idToSearch) => {
  let obj = {};
  obj.index = indexName;
  obj.refresh = true;
  // obj.id = idToSearch;
  // let script = {
  //   lang: "painless",
  //   source: "ctx._source."+fieldToUpdate+"="+newValue
  // }
  obj.size = 1000;
  let script = {
    lang: "painless",
    source: "ctx._source."+fieldToUpdate+"= params.value;",
    params: {
      value: newValue
    }
  }
  // script.params[value] = newValue;
  obj.script = script;
  obj.query = {
    match_phrase:{
      recipeID: idToSearch
    }
  }

  console.log(obj);

  const res =  await client.updateByQuery(obj);
  
  return res;

}

/*
  Query format is:
  {
     index: THE INDEX WE WANT TO SEARCH AT
     query : {
       match: { THE FIELD WE WANT TO SEARCH: THE VALUE WE WANT TO SEARCH}
     }
   }
*/
const searchByMatch = async (theIndex,field, matcher) => {
  const searchOBJ = {};
  searchOBJ.index = theIndex;
  searchOBJ.query = {};
  searchOBJ.query.match = {};
  searchOBJ.query.match[field] = matcher;


  const response = await client.search(searchOBJ);
  return response.hits.hits;
}

const refresh = () => {
  client.indices.refresh();
}



module.exports = {insert,update,appendToArray, search,refresh};

const { Client } = require('@elastic/elasticsearch')
const { query } = require('express')
const { removeRecipeFromCookbook } = require('./recipesController')
// const config = require('config');

const recipe = {
    ownerEmail: "ben.weisman15@gmail.com",
    name: "Marrow soupppppppppppppppppp",
    description: "Make marrow the star of the show in this filling soup. Made with butter beans, coconut milk and curry powder, it has a delicate spiced flavour",
    category: "italian",
    instructions: ["STEP 1Heat the oil in a large pan over a medium heat and fry the onions with a pinch of salt for 6-8 mins until soft. Add the potatoes and cook for 2 mins more, then tip in the marrow and curry powder. Cook for 1 min. Pour in the stock, butter beans and most of the coconut milk (reserve a few tablespoons). Bring the mixture to the boil, then reduce the heat to medium-low and simmer for 20 mins until all the vegetables are tender.", "STEP 2Remove from the heat and leave to cool slightly, then transfer the mixture to a blender and blitz until smooth. Return the soup to the pan and warm through over a low heat, then spoon into bowls. Drizzle with the reserved coconut milk and scatter with the coriander."],
    ingredients: ["1 tbsp vegetable oil", "2 onions, roughly chopped", "250g potatoes,  roughly chopped", "1 marrow (about 750g), peeled, deseeded and roughly chopped (see tip, below)", "1-2 tbsp curry powder, to taste", "500ml vegetable or chicken stock", "400g can butter beans, drained", "400ml can light coconut milk", "small handful of coriander leaves"],
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/07/marrow-soup-ccc3c5d.jpg?resize=960,872?quality=90&resize=556,505",
    recipeID: "c1679bc5-d8ff-4a22-9b0e-20dead6a4cac",
    active: false,
    comments: [{
      "email": "ben.weisman15@gmail.com",
      "name": "Ben Weisman",
      "dateCreated": "26.8.22",
      "content": "This is an amazing recipe! Can't wait to make it again.",
      "_id": {
          "$oid": "63090b11148b55ee565b2ae1"
      }
  }],
  likes: ["ben", "gal", "guy", "tal", "ben", "gal", "guy", "tal", "ben", "gal", "guy", "tal"]
}

const client = new Client({
    cloud: {
      id: 'My_deployment:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGU1OTFlZGMxZjYyMjRkZGQ5MjAyZTQ3MTZmNzZhYThkJDk4YWVkNGM1MTg3NjQ3OWVhN2M4NGQ0NmZlMzcyODli'
    },
    auth: {
      apiKey: 'VTdTZzdvSUJYazJXalJ3c2lJcW06a005RXVPaTRUMnlEYktaSmhWYTZtZw=='
    }
  })

  client.info()
  .then(response => console.log(response))
  .catch(error => console.error(error))


const search = async (searchOBJ) => {
  const res =  await client.search(searchOBJ);
  return res.hits.hits;
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
  obj.id = idToSearch;
  let script = {
    lang: "painless",
    source: "ctx._source."+fieldToUpdate+"="+newValue
  }
  obj.script = script;


  return await client.update(obj);

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


const run = async () => {

  // await client.update({
  //   index: 'recipe',
  //   id: 
  // })
  // await insert('recipe',recipe);
  // let response = await searchByMatch('recipe','name','Marrow');

  search('recipe','name','marr')
  // update('user','active',false,'ben.weisman15@gmail.com');

  // response.forEach(res => {
  //   console.log(res._source.name)
  // });
  // console.log(response)
  // const json = response.hits.hits;
  // console.log(response.hits.hits[0]._source.likes)
  // console.log(Object.keys(response.hits.hits[0]._source));

}

run();

module.exports = {insert,update,appendToArray, search};
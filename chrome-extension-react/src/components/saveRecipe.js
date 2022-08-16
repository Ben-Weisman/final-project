import * as React from 'react';

    

const scraperUrl = "http://localhost:5000/";   

export default function SaveRecipe(props) {

    //create new updated json of the recipe
    const newJson = {
        "owner_id": "59dc8b97-6fae-4dcc-82ed-7cd8e21340a0",
        "recipe_name": props.recipe_name,
        "recipe_description": props.description,
        "category": "italian",
        "recipe_instructions": props.instructions,
        "ingredients": props.ingredients,
        "image": props.image
    }

    
    //send the updated json to the scraper
    async function sendJson(newJson) {
        const response =  await fetch(scraperUrl+"/receiveJson", {
            method: "POST",
            body: JSON.stringify(newJson)
        })

        if (response.status===200){
            return true
        }


        else {
            return false
        }
          
    }


    return (
  
        sendJson(newJson)? alert("The recipe was added to your cookbook :)"): alert("Something went wrong, please try again")

    )

 



}
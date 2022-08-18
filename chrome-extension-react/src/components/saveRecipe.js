import * as React from 'react';

    

const scraperUrl = "http://localhost:5000/";   

export default function SaveRecipe(props) {

    //create new updated json of the recipe
    const newJson = {
        "ownerEmail": "ben.weisman15@gmail.com",
        "name": props.recipe_name,
        "description": props.description,
        "category": "italian",
        "instructions": props.instructions,
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
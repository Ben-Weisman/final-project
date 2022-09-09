import { useState, useEffect } from "react";
import * as React from 'react';
//import NewWindow from "react-new-window
import NewWindow from 'rc-new-window';
import EditIngredients from './EditRecipe/editIngredients'
import EditInstructions from './EditRecipe/editInstructions'
import EditDescription from './EditRecipe/editDescription'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import Select from 'react-select'
import{
    RecipeWrapper,
    RecipeTitle,
    SaveButton,
    EditButton,
    ParentDiv,
    ChildDiv,
    RecipeHeader,
    Title,
    Description
} from "./recipes.styles";
import Swal from "sweetalert2";

const categories = [
    {value: 'Breakfast', label: "Breakfast"},
    {value: 'Lunch', label:"Lunch"},
    {value: 'Dinner', label:'Dinner'},
    {value: 'Beverages', label:'Beverages'},
    {value: 'Appetizers', label:'Appetizers'},
    {value: 'Soups', label:'Soups'},
    {value: 'Salads', label:'Salads'},
    {value: 'Main dishes', label:'Main dishes'},
    {value: 'Side dishes', label:'Side dishes'},
    {value: 'Vegetarian', label:'Vegetarian'},
    {value: 'Desserts', label:'Desserts'},
    {value: 'Breads', label:'Breads'},
    {value: 'Holidays', label:'Holidays'},
    {value: 'Other', label:'Other'}

]






export default function RecipePreview({recipe, closeWindow}) {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const [recipe_name, setRecipeName] = useState(recipe.recipe_name);
    const [description, setDescription] = useState(recipe.recipe_description);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.recipe_instructions);
    const image = recipe.image;
    const email = getUserEmail();

    const [editIng, setEditIng] = useState(false);
    const [editIns, setEditIns] = useState(false);
    const [editDes, setEditDes] = useState(false);

    const openEditDes = () => {
        setEditDes(!editDes)
    }

    const openEditIng = () => {
        setEditIng(!editIng)
    }

    const openEditIns = () => {
        setEditIns(!editIns)
    }

    const changeTitle = ({ value}) => {
        setRecipeName(value)
    };

    function getUserEmail() {
        const user = localStorage.getItem("user");
        const userJson = JSON.parse(user);
        return userJson["email"];
    }


    async function setPrivacy() {
        await Swal.fire({
            
            title: 'Would you like to make this recipe public?',
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        })
        .then((result) => {   
            if(result.isConfirmed){
                sendJson(true)
            }
            else{
                sendJson(false)
            }            
        })
        
    }

    

  
    //send the updated json to the scraper
    const sendJson = async(privacy) => {
       
        const newJson = {
            "ownerEmail": email,
            "name": recipe_name,
            "description": description,
            "category": "italian",
            "instructions": instructions,
            "ingredients": ingredients,
            "image": image,
            "public": privacy
        }

   

        const response =  await fetch("http://localhost:5000/receiveJson", {
            method: "POST",
            body: JSON.stringify(newJson)
        })

        if (response.status===200){
            Swal.fire("Added!", "Your recipe was Added.", "success")            
        }


        else {
            Swal.fire("something went wrong")
        }

        
    }



    return (  
        <NewWindow title="Recipe Preview" center="screen">   
            <RecipeWrapper> 
                <RecipeHeader>Recipe Preview</RecipeHeader>         
                <RecipeTitle>
                     <EditText 
                        defaultValue={recipe_name}
                        onSave = {changeTitle}/>
                </RecipeTitle>
                <Description>
                    {description}
                </Description>               
                <EditButton onClick={openEditDes}>Edit Description</EditButton>
                {wait(1 * 1000) && editDes && 
                <EditDescription description={description}  changeDes={description=>setDescription(description)} closeWindow={()=> setEditDes(false)}>
                    </EditDescription>} 
                <br></br>
                <img src={image} alt="recpie img" width="300" style={{marginTop:'2rm'}} />               
                <ParentDiv>
                    <ChildDiv>
                        <Title>Ingredients:</Title>
                        <EditButton onClick={()=> setEditIng(true)}>Edit Ingredients</EditButton>
                        {wait(1 * 1000) && editIng && 
                        <EditIngredients ingredients={ingredients}  changeIng={ingredients=>setIngredients(ingredients)} closeWindow={()=>setEditIng(false)}>
                            </EditIngredients>} 
                        {ingredients.map(item => (
                            <li>{item}</li>
                        ))}                 
                    </ChildDiv>
                    <ChildDiv>
                        <Title>Instructions:</Title>  
                        <EditButton onClick={openEditIns}>Edit Instructions</EditButton>
                        {wait(1 * 1000) && editIns && 
                        <EditInstructions instructions={instructions} changeIns={instructions=>setInstructions(instructions)} closeWindow={()=> setEditIns(false)}>
                            </EditInstructions>}                     
                        {instructions.map(item => (
                                <li>{item}</li>
                            ))}
                    </ChildDiv>
                </ParentDiv>
                <Select options={categories}> </Select>                          
                <SaveButton onClick={()=> {setPrivacy(); closeWindow()}}>Save Recipe</SaveButton>
            </RecipeWrapper>            
        </NewWindow>
    );

}


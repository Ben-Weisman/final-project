
import { useState, useEffect } from "react";
import * as React from 'react';
import NewWindow from "react-new-window";
import SaveRecipe from './saveRecipe';
import EditIngredients from './editIngredients'
import EditInstructions from './editInstructions'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';


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
} from "./Recipes.styles";


export default function ShowRecipe({ recipe }) {


    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    const [save, setSave] = useState(false);
    const [recipe_name, setRecipeName] = useState(recipe.recipe_name);
    const [description, setDescription] = useState(recipe.recipe_description);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.recipe_instructions);
    const image = recipe.image;

    const [editIng, setEditIng] = useState(false);
    const [editIns, setEditIns] = useState(false);

    const openEditIng = () => {
        setEditIng(!editIng)
    }

    const openEditIns = () => {
        setEditIns(!editIns)
    }

    const changeTitle = ({ value}) => {
        setRecipeName(value)
    };

    const changeDescription = ({ value}) => {
        setDescription(value)
    };




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
                    {description? 
                     <EditTextarea 
                        defaultValue={description}
                        onSave = {changeDescription}
                        rows= "event.target.rows"
                        /> : ""}
                </Description>               
                <img src={image} alt="recpie img" width="300" height="auto" />               
                <ParentDiv>
                    <ChildDiv>
                        <Title>Ingredients:</Title>
                        <EditButton onClick={openEditIng}>Edit Ingredients</EditButton>
                        {wait(1 * 1000) && editIng && 
                        <EditIngredients ingredients={ingredients}  changeIng={ingredients=>setIngredients(ingredients)}>
                            </EditIngredients>} 
                        {ingredients.map(item => (
                            <li>{item}</li>
                        ))}                 
                    </ChildDiv>
                    <ChildDiv>
                        <Title>Instructions:</Title>  
                        <EditButton onClick={openEditIns}>Edit Instructions</EditButton>
                        {wait(1 * 1000) && editIns && 
                        <EditInstructions instructions={instructions} changeIns={instructions=>setInstructions(instructions)}>
                            </EditInstructions>}                     
                        {instructions.map(item => (
                                <li>{item}</li>
                            ))}
                    </ChildDiv>
                </ParentDiv>              
                <SaveButton onClick={() => setSave(true)}>Save Recipe</SaveButton>
                    {wait(1 * 1000) && save &&
                    <SaveRecipe
                        recipe_name={recipe_name}
                        description={description}
                        ingredients={ingredients}
                        instructions={instructions}
                    />}
            </RecipeWrapper>            
        </NewWindow>
    );
}







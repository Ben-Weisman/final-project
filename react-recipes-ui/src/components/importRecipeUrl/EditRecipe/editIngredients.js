import { useState, useEffect } from "react";
import * as React from 'react';
import NewWindow from "react-new-window";
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import{
    RecipeWrapper,
    SaveButton,
    RecipeHeader,
    Wrapper
} from "../recipes.styles";


export default function EditIngredients (props) {


    const [ingredients, setIngredients] = useState(props.ingredients);

    const changeIngredients = ({ value, previousValue }) => {
        setIngredients(ingredients.map((item) => item === previousValue ? value : item
        ));
    };

    
    return (
        <NewWindow title="Ingredients Preview">
            <RecipeWrapper>
                <RecipeHeader>Ingredients Preview</RecipeHeader>   
                <Wrapper>
                    <ul>
                     {ingredients.map(item => (
                                <li>
                                    {<EditText
                                        defaultValue={item}
                                        onSave={changeIngredients}
                                        />}
                                </li>
                            ))}
                    </ul>
                    
                </Wrapper>
                <SaveButton onClick={()=>{props.changeIng(ingredients); props.closeWindow()}}>Save Ingredients</SaveButton>
            </RecipeWrapper>          
        </NewWindow>
       
    )

};
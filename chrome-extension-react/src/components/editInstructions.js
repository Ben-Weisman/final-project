import { useState, useEffect } from "react";
import * as React from 'react';
import NewWindow from "react-new-window";
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import{
    RecipeWrapper,
    SaveButton,
    RecipeHeader,
    Wrapper
} from "./Recipes.styles";

export default function EditInstructions(props) {

    const [instructions, setInstructions] = useState(props.instructions);

    const changeInstructions = ({ value, previousValue }) => {
        setInstructions(instructions.map((item) => item === previousValue ? value : item
        ));
    };

    
    return (
        <NewWindow name="win" title="Instructions Preview">
            <RecipeWrapper>
                <RecipeHeader>Instructions Preview</RecipeHeader>   
                <Wrapper>
                    <ul>
                     {instructions.map(item => (
                                <li>
                                    {<EditTextarea
                                        rows= "event.target.rows"
                                        defaultValue={item}
                                        onSave={changeInstructions}
                                        />}
                                </li>
                            ))}
                    </ul>

                </Wrapper>
                <SaveButton onClick={()=>{props.changeIns(instructions)}}>Save Instructions</SaveButton>
            </RecipeWrapper>          
        </NewWindow>
       
    )
};


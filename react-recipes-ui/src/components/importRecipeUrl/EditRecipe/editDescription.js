import { useState, useEffect } from "react";
import * as React from 'react';
import NewWindow from "react-new-window";
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import{
    RecipeWrapper,
    SaveButton,
    RecipeHeader,
    Description,
    Wrapper

} from "../recipes.styles";


export default function EditDescription (props) {


    const [description, setDescription] = useState(props.description);

    const changeDescription = ({ value}) => {
        setDescription(value)
    };

    
    return (
        <NewWindow title="Description Preview">
            <RecipeWrapper>
                <RecipeHeader>Description Preview</RecipeHeader>
                    <Wrapper> 
                        <Description>
                            <EditTextarea 
                                defaultValue={description}
                                onSave = {changeDescription}
                                rows= "event.target.rows"
                                />                     
                         </Description>
                    </Wrapper>  
                <SaveButton onClick={()=>props.changeDes(description)}>Save Description</SaveButton>
            </RecipeWrapper>          
        </NewWindow>
       
    )

};
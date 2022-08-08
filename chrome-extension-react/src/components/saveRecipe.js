
import NewWindow from "react-new-window";
import * as React from 'react';
import {Card,  CardHeader} from "@mui/material";
    

   

export default function SaveRecipe(props) {



    return (

        <newWindow>
         <Card sx={{ minHeight: 450, minWidth: 345 }}>
            <CardHeader
            title={props.recipe_name}
            />
            <h1>{props.description}</h1>
            <h2>{props.ingredients}</h2>
            <h3>{props.instructions}</h3>
            <h4>{props.comments}</h4>
        </Card>
        </newWindow>


    )

 



}

import { useState, useEffect } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    Avatar,
    ListItemText,
    Typography
  } from "@mui/material";
import { makeStyles } from "@mui/styles";
import NewWindow from "react-new-window";
import { EditText, EditTextarea } from 'react-edit-text';
import SaveRecipe from './saveRecipe';
import 'react-edit-text/dist/index.css';



function ShowRecipe({ recipe }) {


    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    const [save, setSave] = useState(false);
    const [recipe_name, setRecipeName] = useState(recipe.recipe_name);
    const [description, setDescription] = useState(recipe.recipe_description);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.recipe_instructions);


    const changeRecipeName = ({ value }) => {
        setRecipeName(value);
    };

    const changeDescription = ({ value }) => {
        setDescription(value);
    };

    const changeIngredients = ({ value, previousValue }) => {
        setIngredients(ingredients.map((item) => item === previousValue ? value : item
        ));
    };

    const changeInstructions = ({ value, previousValue }) => {
        setInstructions(instructions.map((item) => item === previousValue ? value : item
        ));
    };


    return (
        <NewWindow>

            <Card >
                <CardHeader
                    title={<Typography gutterBottom variant="h5" component="h2">
                        <EditTextarea rows="1"
                            defaultValue={recipe_name}
                            style={{ fontSize: '16px' }}
                            onSave={changeRecipeName} />
                    </Typography>} />
                <CardContent>
                    <EditTextarea
                        defaultValue={description}
                        onSave={changeDescription} />
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" color="text.secondary">
                            Ingredients:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {ingredients.map(item => (
                                <ListItem>
                                    {<EditText
                                        defaultValue={item}
                                        onSave={changeIngredients} />}
                                </ListItem>
                            ))}
                        </Typography>
                    </Grid>
                    <Typography variant="h6" color="text.secondary">
                        Instructions:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <List>
                            {instructions.map(item => (
                                <li>
                                    {<EditTextarea
                                        defaultValue={item}
                                        onSave={changeInstructions} />}
                                </li>
                            ))}
                        </List>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="Medium" variant="contained" onClick={() => setSave(true)}>Save</Button>
                    {wait(1 * 1000) && save &&
                        <SaveRecipe
                            recipe_name={recipe_name}
                            description={description}
                            ingredients={ingredients}
                            instructions={instructions}
                        ></SaveRecipe>}
                </CardActions>
            </Card>
        </NewWindow>
    );
}

export default ShowRecipe;






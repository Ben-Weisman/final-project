import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  List,
  TextField,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from '@mui/icons-material/Clear';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import RecipePreview from "../importRecipeUrl/RecipePreview";
import Select from 'react-select'


const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: "block"
    },
    btn: {
      marginTop: 5,
      marginBottom: 5,
      width: 210
    },
    addListItem: {
      width: `calc(100% - ${AddIcon}px)`
    }
  });

export default function AddRecipeManual(){

     const classes = useStyles();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState("")
    const [instructions, setInstructions] = useState([]);
    const [instruction, setInstruction] = useState("")
    const [image, setImage] = useState([]);
    const [imageURL, setImageURL] = useState([]);
    const [recipeData, setRecipeData] = useState({});

    const [open, setOpen] = useState(false);

    const openWindow = () => {
      setOpen(!open)
    }


    useEffect(()=>{
      if(image.length < 1) return;
      const newImageUrl = [];
      image.forEach(img=> newImageUrl.push(URL.createObjectURL(img)));
      setImageURL(newImageUrl)
    }, [image]);

    function onImageChange(e) {
      setImage([...e.target.files])
    }


    const deleteIngredient = (index) => {
      let temp = ingredients.filter((item, i) => i !== index);  
      setIngredients(temp);
    };

    const deleteInsruction = (index) => {
      let temp = instructions.filter((item, i) => i !== index);  
      setInstructions(temp);
    };

    function updateData(){
      const newJson = {

        "recipe_name": title,
        "recipe_description": description,
        "recipe_instructions": instructions,
        "ingredients": ingredients,
        "image": imageURL
      }
      setRecipeData(newJson)

    }



  
    return (
      <Grid align="center">
        <FormControl>
          <div className="insert-reciped-manual-form-container">
            <Typography component="h1" variant="h5">
              Write your recipe
            </Typography>
            <form
              noValidate
              className="insert-reciped-manual-form"
            >
              <div className="title-div">
                <TextField
                  onChange={e => setTitle(e.target.value)}
                  required
                  id="outlined-basic"
                  label="Title"
                  fullWidth
                />
              </div>
              <div className={classes.field}>
                <TextField
                  on
                  onChange={e => setDescription(e.target.value)}
                  required
                  id="outlined-basic"
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                />
              </div>
              <div className={classes.field}>
              <Grid>
                <FormControl fullWidth>
                  <form noValidate className="insert-reciped-manual-form">
                    <TextField
                      className="addListItem"
                      required
                      id="outlined-basic"
                      label="Ingredients"
                      onChange={e => {
                          setIngredient(e.target.value);
                      }}
                      value={ingredient}
                      fullWidth

                    ></TextField>
                    <IconButton>
                        <AddIcon onClick={()=>{setIngredients([...ingredients,ingredient]); setIngredient("")}}></AddIcon>
                    </IconButton>
                    {ingredients.length > 0 &&
                        ingredients.map((item, i) =>
                        <List>
                            {item}                             
                            <IconButton>
                                <ClearIcon onClick={() => deleteIngredient(i)}/>
                            </IconButton>                            
                        </List>)}                 
                    </form>
                  </FormControl> 
                </Grid>
              </div>

              <div className={classes.field}>
              <Grid>
                <FormControl fullWidth>
                  <form noValidate className="insert-reciped-manual-form">
                    <TextField
                      className="addListItem"
                      required
                      id="outlined-basic"
                      label="Instructions"
                      onChange={e => {
                          setInstruction(e.target.value);
                      }}
                      value={instruction}
                      fullWidth

                    ></TextField>
                    <IconButton>
                        <AddIcon onClick={()=>{setInstructions([...instructions,instruction]); setInstruction("")}}></AddIcon>
                    </IconButton>
                    {instructions.length > 0 &&
                        instructions.map((item, i) =>
                        <List>
                            {item}                             
                            <IconButton>
                                <ClearIcon onClick={() => deleteInsruction(i)}/>
                            </IconButton>                            
                        </List>)}                 
                    </form>
                  </FormControl>
                  <div>
                    <input
                       type="file" 
                       name="Choose image"
                       id="icon-button-photo"
                       accept="image/*" 
                       onChange={onImageChange}/>
                    <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                        <PhotoCameraIcon />
                    </IconButton>
                  
                </label>
                </div>

                </Grid>
              </div>
  
              <Button onClick={()=>{openWindow(); updateData()}} className={classes.btn}  variant="contained" color="secondary">
                Add Recipe
              </Button>
              {open  && <RecipePreview recipe={recipeData} closeWindow={()=>openWindow()}></RecipePreview>}

            </form>
          </div>
          
        </FormControl>
      </Grid>

    );


}
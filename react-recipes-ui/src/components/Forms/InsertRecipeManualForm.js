import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  List,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { width } from "@mui/system";
import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IngredientItem from "../Elements/IngredientItem";
import IngredientsList from "../Elements/IngredientsList";
import { CompressOutlined } from "@mui/icons-material";
import { uuid, v4 } from "uuidv4";
import DynamicListElement from "../Elements/DynamicListElement";
import { useHistory } from "react-router-dom";

const foodTipes = [
  "veggie",
  "vegan",
  "sweet",
  "asian",
  "italian",
  "mexican",
  "burger"
];

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

const InsertRecipeManualForm = () => {
  const history = useHistory();
  const [ingredientInput, setIngredientInput] = useState("");
  const [instructionsInput, setInstructionsInput] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = e => {
    e.prevetDefault();
    console.log(ingredients);
    const recipe = { name, foodType, description, ingredients, instructions };
    console.log(recipe);
    // fetch("http://localhost:8000/recipes", {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify(recipe)
    // })
    //   .then(() => console.log("recipe added"))
    //   .then(() => history.push("/home"));
  };

  const handleChange = event => {
    setFoodType({
      ...foodType,
      [event.target.name]: event.target.checked
    });
  };

  const classes = useStyles();
  const [foodType, setFoodType] = React.useState({
    veggie: false,
    vegan: false,
    sweets: false,
    asian: false,
    italian: false,
    mexiacan: false,
    burger: false
  });

  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const removeIngredientItem = id => {
    const newIngredients = ingredients.filter(
      ingredient => ingredient.id !== id
    );
    setIngredients(newIngredients);
  };
  const removeInstructuinItem = id => {
    const newInstructoins = instructions.filter(
      instruction => instruction.id !== id
    );
    setInstructions(newInstructoins);
  };

  useEffect(() => {
    console.log("use effect run");
    console.log(ingredients);
  }, []);

  const addIngredient = e => {
    const newIngredients = ingredients.concat({
      text: ingredientInput,
      id: uuid()
    });
    setIngredients(newIngredients);
    setIngredientInput("");
    console.log(ingredients);
  };

  const addInstructions = e => {
    const newInstructions = instructions.concat({
      text: instructionsInput,
      id: uuid()
    });
    setInstructions(newInstructions);
    setIngredientInput("");
    console.log(newInstructions);
  };

  return (
    <Grid align="center">
      <FormControl>
        <div className="insert-reciped-manual-form-container">
          <Typography className={classes.field} component="h2" variant="h6">
            Insert recipe
          </Typography>
          <form
            noValidate
            className="insert-reciped-manual-form"
            onSubmit={handleSubmit}
          >
            <div className="title-div">
              <TextField
                onChange={e => setName(e.target.value)}
                required
                id="outlined-basic"
                label="Name"
                fullWidth
              />
            </div>
            <FormLabel>Choose type</FormLabel>
            <FormGroup row>
              {foodTipes.map(item => (
                <FormControlLabel
                  control={<Checkbox onChange={handleChange} name={item} />}
                  label={item}
                ></FormControlLabel>
              ))}
            </FormGroup>
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
                <List>
                  {/* <IngredientsList
                    ingredients={ingredients}
                    removeItem={removeItem}
                  ></IngredientsList> */}
                  {ingredients.map(ingredient => (
                    <DynamicListElement
                      element={ingredient}
                      removeItem={removeIngredientItem}
                    ></DynamicListElement>
                  ))}
                </List>
                <FormControl fullWidth>
                  <form noValidate className="insert-reciped-manual-form">
                    <TextField
                      className="addListItem"
                      required
                      id="outlined-basic"
                      label="Insert ingredients"
                      onChange={e => {
                        setIngredientInput(e.target.value);
                      }}
                      fullWidth
                    ></TextField>
                    <IconButton>
                      <AddIcon type="submit" onClick={addIngredient}></AddIcon>
                    </IconButton>
                  </form>
                </FormControl>
              </Grid>
            </div>
            <div className={classes.field}>
              <Grid>
                <List>
                  {/* <IngredientsList
                    ingredients={ingredients}
                    removeItem={removeItem}
                  ></IngredientsList> */}
                  {instructions.map(instruction => (
                    <DynamicListElement
                      element={instruction}
                      removeItem={removeInstructuinItem}
                    ></DynamicListElement>
                  ))}
                </List>
                <FormControl fullWidth>
                  <form noValidate className="insert-reciped-manual-form">
                    <TextField
                      className="addListItem"
                      required
                      id="outlined-basic"
                      label="Insert instructions"
                      onChange={e => {
                        setInstructionsInput(e.target.value);
                      }}
                      fullWidth
                    ></TextField>
                    <IconButton>
                      <AddIcon
                        type="submit"
                        onClick={addInstructions}
                      ></AddIcon>
                    </IconButton>
                  </form>
                </FormControl>
              </Grid>
            </div>

            <Button className={classes.btn} type="submit" variant="contained">
              Add Recipe
            </Button>
          </form>
        </div>
      </FormControl>
    </Grid>
  );
};

export default InsertRecipeManualForm;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RecipePreview from "../importRecipeUrl/RecipePreview";
import { useState, useEffect } from "react";
import { WindowRounded } from "@mui/icons-material";


const theme = createTheme();

export default function AddRecipeURl() {

  const [recipeData, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");


  async function handleSubmit(event) {
  
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const recipeURL = data.get("recipe_url");
    addRecipeHandler(recipeURL)
  }

  async function addRecipeHandler(recipeURL) {
    const response = await fetch("http://localhost:5000/getUrl?url="+recipeURL);
    if (response.status===200){
      const recipe_data = await response.json(); 
      setRecipeData(recipe_data)
      console.log(recipeData)
         
  }

  function setRecipeData(recipe_data){

    setData(recipe_data)
    setOpen(true)
    //setUrl("");
  }

  
   
    

};
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <ShoppingCartOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Paste URL to import recipe
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  //value={url}
                  //onChange={(e)=> setUrl(e.target.value)}
                  id="recipe_url"
                  label="Recipe URL"
                  name="recipe_url"
                  //autoComplete="recipe_url"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}              
            >
              Import recipe
            </Button>
            {open  && <RecipePreview recipe={recipeData} closeWindow={()=>setOpen(false)}></RecipePreview>}
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

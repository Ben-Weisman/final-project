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
const theme = createTheme();

const handleSubmit = async event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const recipeURL = data.get("recipe_url");
  console.log(recipeURL);
  //   const email = data.get("email");
  //   const firstName = data.get("firstName");
  //   const lastName = data.get("lastName");
  //   const password = data.get("password");
  //   const name = firstName.trim() + " " + lastName.trim();
  //   console.log({
  //     email,
  //     name,
  //     password
  //   });
  //   const response = await CreateUser({
  //     email,
  //     password,
  //     name
  //   });
  //   if (response.status === "Success") {
  //     window.location.href = "/login";
  //   } else {
  //     Swal.fire("Failed", response.message, "error");
  //     // data.delete;
  //   }
};

export default function AddRecipeURl() {
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
            Insert the recipe url
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
                  id="recipe_url"
                  label="Recipe URL"
                  name="recipe_url"
                  autoComplete="recipe_url"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add!
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

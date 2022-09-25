import {
  AppBar,
  Container,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Grid,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import image from "./captainCook.png"
import image2 from "./image.png"

const menuItems = [
  {
    text: "Login",
    path: "/login"
  },
  {
    text: "Sign up",
    path: "/signup"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Nunito",
    
  },
  appbar: {
    backgroundColor : 'green'
  },
  appbarWrapper: {
    width: "90%",
    backgroundColor: "F4F6F6",
    margin: "0 auto"
  },
  appbarTitle: {
    flexGrow: "1"

  },
  icon: {
    color: "#fff",
    fontSize: "2rem"
  },
  colorText: {
    color: "black"
  },
  container: {
    textAlign: "center"
  },
  title: {
    fontFamily: "Muli"
  },
  goDown: {
    color: "#5AFF3D",
    fontSize: "4rem"
  },
  button: {variant:"contained", color:"secondary"},

  list: { display: "flex", flexDirection: "row", padding: 20 }
}));

const LandingNavbar = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0} color='default'>
        <Toolbar className={classes.appbarWrapper}>
          <div className={classes.appbarTitle}>
            <img src={image} id="captainCook" width="170"/>
          </div>
          
          <List className={classes.list} >
            {menuItems.map(item => (
              <ListItemButton
                key={item.text}
                onClick={() => history.push(item.path)}
                className={
                  location.pathname == item.path ? classes.active : null
                }
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Toolbar>
      </AppBar>
      <Container>
      <Grid container spacing={2} align="center">
        <Grid item xs={4} md={6}>
          <Typography align= "center" fontSize="2.625rem" fontFamily="Helvetica Neue" fontWeight="900" marginTop="0px">
            The home for<br></br>all your recipes        
         </Typography>
         <Typography align= "center" fontSize="1.625rem"  >
         Save your favorite recipes in one place.
         <br></br> Import just the recipe from any website without the distractions or clutter.
         </Typography >
         <br></br>
         <Button color="secondary" variant="contained" 
                         onClick={() => history.push("/signup")}
                         className={
                           location.pathname == "/signup" ? classes.active : null
                         }> Create an Account</Button>       
        </Grid>
          
        <Grid item xs={6} md={6}>
        <img src={image2} width="100%"/>


        </Grid>



      </Grid>
      </Container>

      {/* mathod to scroll down the landing page */}

      {/* <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <Typography variant="h1" className={classes.title}>
            Welcome to <br />
            My<span className={classes.colorText}>Recipes.</span>
          </Typography>
          <Scroll to="about-us" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse> */}
    </div>
  );
};

export default LandingNavbar;

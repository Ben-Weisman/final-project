import {
  AppBar,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
// import { Link as Scroll } from "react-scroll";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as Scroll } from "react-scroll";
import { Button } from "react-scroll/modules";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { color } from "@mui/system";

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
    fontFamily: "Nunito"
  },
  appbar: {
    backgroundColor: "none"
  },
  appbarWrapper: {
    width: "80%",
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
    color: "#5AFF3D"
  },
  container: {
    textAlign: "center"
  },
  title: {
    color: "#fff",
    fontSize: "4.5rem"
  },
  goDown: {
    color: "#5AFF3D",
    fontSize: "4rem"
  },
  list: { display: "flex", flexDirection: "row", padding: 20 }
}));

const LandingNavbar = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            My<span className={classes.colorText}>Recipes.</span>
          </h1>
          <List className={classes.list}>
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

      <Collapse
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
      </Collapse>
    </div>
  );
};

export default LandingNavbar;

import React from "react";
import { makeStyles } from "@mui/styles";
import { Drawer } from "@mui/material";
import { Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Avatar } from "@mui/material";
import MainNavbar from "./MainNavbar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const drawerWidth = 240;

const useStyles = makeStyles(theme => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3)
    },
    root: {
      display: "flex"
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    active: {
      background: "#f4f4f4"
    },
    title: {
      padding: theme.spacing(2)
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    date: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    }
  };
});

export default function SideBar({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "Home",
      icon: <HomeOutlinedIcon color="primary" />,
      path: "/home"
    },
    {
      text: "Add Recipe",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: "/create"
    },
    {
      text: "My Recipes",
      icon: <SubjectOutlined color="primary" />,
      path: "/cookbook"
    }
  ];

  return (
    // <div className={classes.root}>
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
    >
      <div>
        <Typography variant="h5" className={classes.title}>
          Recipes
        </Typography>
      </div>

      {/* links/list section */}
      <List>
        {menuItems.map(item => (
          <ListItem
            button
            key={item.text}
            onClick={() => history.push(item.path)}
            className={location.pathname == item.path ? classes.active : null}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

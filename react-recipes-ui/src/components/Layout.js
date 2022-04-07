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
import SideBar from "./Navbars/SideBar";
import MainNavbar from "./Navbars/MainNavbar";

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

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "My Recipes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/"
    },
    {
      text: "Add Recipe",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create"
    }
  ];

  return (
    <div className={classes.root}>
      {/* app bar */}
      <MainNavbar />
      <SideBar />

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}

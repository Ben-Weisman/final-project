import React from "react";
import { makeStyles } from "@mui/styles";
import { Drawer } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Swal from "sweetalert2";
import image from "./captainCook.png";


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
      width: drawerWidth,
      minHeight: "100vh",
      backgroundColor: "#FAEBD7",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
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
    },
    secondMenuItems: {
      bottom: 0
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
      text: "Categories",
      icon: <CategoryIcon color="primary" />,
      path: "/categories"
    },
    {
      text: "Add Recipe",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: "/create"
    },
    {
      text: "My Cookbook",
      icon: <MenuBookIcon color="primary" />,
      path: "/cookbook"
    },
    {
      text: "Search",
      icon: <SearchIcon color="primary" />,
      path: "/search"
    }

    
  ];


  const handleEditProfile = () => {};
  const handleLogout = e => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire("Logged Out", "");
        localStorage.removeItem("user");
        history.push("/");
      }

    });
  };
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
    >
    <div alignItems="center">
      <img src={image} id="captainCook" width="170" align='center'/>
    </div>
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
      <List className="secondMenuItems">
        <ListItem button key="Logout" onClick={() => handleLogout()}>
          <ListItemIcon>
            <LogoutOutlinedIcon color="primary" />,
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
}

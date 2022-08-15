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
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Swal from "sweetalert2";
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
  //need to check how to insert a function inside an array list
  //like there
  // const SecondMenu = [
  //   {
  //     text: "Edit profile",
  //     icon: <PermIdentityOutlinedIcon color="primary" />,
  //     function: handleEditProfile()
  //   },
  //   {
  //     text: "Logout",
  //     icon: <LogoutOutlinedIcon color="primary" />,
  //     function: handleLogout()
  //   }
  // ];

  const handleEditProfile = () => {};
  const handleLogout = e => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Loging out", "");
        localStorage.removeItem("user");
        history.push("/");
      }
      // } else if (result.isDenied) {
      //   Swal.fire('Changes are not saved', '', 'info')
      // }
    });
  };
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
      <List className="secondMenuItems">
        <ListItem button key="Edit profile" onClick={() => handleEditProfile()}>
          <ListItemIcon>
            <PermIdentityOutlinedIcon color="primary"></PermIdentityOutlinedIcon>
          </ListItemIcon>
          <ListItemText primary="Edit profile" />
        </ListItem>
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

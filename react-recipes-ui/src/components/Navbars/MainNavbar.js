import {
  AppBar,
  Box,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import React from "react";
import { Redirect } from "react-router-dom";

// const useStyles = makeStyles((theme)=>{

//   return({
//     appbar: {
//       width: `calc(100%)`
//     }
//   })
// })
const pages = ["Home", "My Recipes"];

const RedirectToPage = e => {};
const MainNavbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  //  const classes = useStyles()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipes Helper
          </Typography>
        </Toolbar>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={Boolean(anchorElNav)}
          sx={{
            display: { xs: "block", md: "none" }
          }}
        >
          {pages.map(page => (
            <MenuItem key={page} onClick={RedirectToPage}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </AppBar>
    </Box>
  );
};

export default MainNavbar;

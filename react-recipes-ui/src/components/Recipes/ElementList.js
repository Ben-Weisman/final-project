import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";

const ElementList = (ItemsArray, title) => {
  useEffect(() => {
    console.log(ItemsArray, "---------------------------");
  }, []);
  return (
    <div>here</div>
    // <Grid item xs={12} md={6}>
    //   <Typography variant="h6" className={"classes.title"}>
    //     {title}
    //   </Typography>
    //   <div className={"classes.demo"}>
    //     {/* <List>
    //       {ItemsArray.map(item => (
    //         <ListItem>
    //           <ListItemText primary={item[1]} />
    //         </ListItem>
    //       ))}
    //     </List> */}
    //   </div>
    // </Grid>
  );
};

export default ElementList;

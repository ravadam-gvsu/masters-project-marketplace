import React from "react";
import { makeStyles } from "@mui/material";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { ShoppingCart, Storefront } from "@mui/icons-material";

export const Sidebar = () => {
  const { isOpen } = { isOpen: false };

  return (
    <React.Fragment>
      <Drawer anchor="left" open={isOpen}>
        {" "}
        {/*onClose={() => handleDrawer(false)}*/}
        <Grid>
          <List>
            <ListItem>
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary={`Buy & Sell`} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                // props.history.push("/profile");
                // handleDrawer(false);
              }}
            >
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary={"Your Profile"} />
            </ListItem>
          </List>
        </Grid>
      </Drawer>
    </React.Fragment>
  );
};

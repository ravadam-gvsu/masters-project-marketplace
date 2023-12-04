import React from "react";
import { makeStyles } from "@mui/styles";
import {AppBar, CssBaseline, Toolbar, Typography} from "@mui/material";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    position: "fixed",
  },
  grow: {
    flexGrow: 1,
  },
  mainText: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    margin: "0 auto",
    textAlign: "center",
  },
}));

export const Footer = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid className={classes.mainText}>
            <Typography>Created by: Mounika Ravada</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

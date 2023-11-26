import React, { Component } from "react";
import { Box, CircularProgress } from "@mui/material";
import { createStyles, withStyles } from "@mui/styles";
// const styles = (theme: any) =>
//   createStyles({
//     loader: {
//       position: "fixed",
//       top: "calc(50% - 20px)",
//       left: "calc(50% - 20px)",
//       color: theme.palette.primary,
//     },
//     loaderPanel: {
//       top: 0,
//       bottom: 0,
//       right: 0,
//       left: 0,
//       position: "fixed",
//       zIndex: 1500,
//       backgroundColor: "#00000047",
//     },
//   });

class AppLoader extends Component<any> {
  render() {
    // const { classes } = this.props;
    return (
      <Box >
        <CircularProgress  disableShrink />
      </Box>
    );
  }
}
export default AppLoader;

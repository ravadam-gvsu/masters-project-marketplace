import React, { Component } from "react";
import { Box, CircularProgress } from "@mui/material";

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

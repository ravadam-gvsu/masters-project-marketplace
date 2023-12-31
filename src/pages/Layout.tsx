import { Box, Grid } from "@mui/material";
import { Cart } from "../components/cart/Cart";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/components/navbar/Navbar";

const LayoutPage = () => {
  return (
    <Box sx={{ background: "#fff" }}>
      <Cart />
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Navbar />
          </Grid>
          <Grid item xs={12} sx={{marginTop: "120px"}}>
            <Outlet></Outlet>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LayoutPage;

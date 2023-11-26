import { Box } from "@mui/material";
import { Product } from "./components/product/Product";
import { useSelector } from "react-redux";

const styles = () => ({
  root: {
    overflowX: "hidden",
  },
});

export const Dashboard = () => {
  const store = useSelector((state: any) => ({
    // filteredProducts: selectFilter(state.products.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    products: state.products,
  }));
  return (
    <Box>
      <Product {...store} />
    </Box>
  );
};

import { Box, Grid, Typography } from "@mui/material";
import useCart from "../../hooks/useCart";
import ProductItem from "./ProductItem";

const ProductGrid = ({ products }: any) => {
  const { addToCart, isItemOnCart } = useCart();

  return (
    <Box mt={3}>
      <Grid container direction="column" alignItems="center" spacing={6}>
        <Grid item xs={9}>
          <Typography variant="h4">Dashboard</Typography>
        </Grid>
        <Grid item xs={9}>
          Some Advertisement Offers
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={4}>
            {products.items.length === 0
              ? new Array(12).fill({}).map((product, index) => (
                  <ProductItem
                    key={`product-skeleton ${index}`}
                    product={product}
                    isItemOnCart={isItemOnCart}
                    addToCart={addToCart}
                  />
                ))
              : products.items.map((product) => (
                  <ProductItem
                    key={product.id}
                    isItemOnCart={isItemOnCart}
                    addToCart={addToCart}
                    product={product}
                  />
                ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductGrid;

import { Box, Grid, Typography } from "@mui/material";
import useCart from "../../hooks/useCart";
import ProductItem from "./ProductItem";
import { useUIContext } from "../../common/context/context";

const ProductGrid = () => {
  // const { addToCart, isItemOnCart } = useCart();
  const { productsCollection } = useUIContext();
  console.log('products');
  console.log(productsCollection);
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
            {productsCollection.total === 0
              ? new Array(12).fill({}).map((product, index) => (
                  <ProductItem
                    key={`product-skeleton ${index}`}
                    product={product}
                  />
                ))
              : productsCollection.products.map((product) => (
                  <ProductItem
                    key={product.id}
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

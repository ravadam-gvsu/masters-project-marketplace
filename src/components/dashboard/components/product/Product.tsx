import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ProductCard } from "../../../../common/components/ProductCard";
import AppLoader from "../../../../common/components/AppLoader";
import { useUIContext } from "../../../../hooks/context";
import { getProducts } from "../../../../services/firebaseapi";

export const Product = () => {
  const { productsCollection, setProducts } = useUIContext();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!productsCollection.lastRefKey) {
      fetchProducts();
      console.log("products fetched", productsCollection);
    }

    window.scrollTo(0, 0);
    setLoader(false);
  }, []);

  const fetchProducts = async () => {
    setLoader(true);
    const res: any = await getProducts();
    setProducts(res);
    setLoader(false);
  };

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
            {productsCollection.total &&
              productsCollection.products.map((product: any, index: string) => {
                return (
                  <Grid item key={"pc" + index}>
                    <ProductCard key={"pc" + index} product={product} />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
      {loader && <AppLoader />}
    </Box>
  );
};

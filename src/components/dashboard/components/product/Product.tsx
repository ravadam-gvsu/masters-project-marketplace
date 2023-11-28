import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ProductCard } from "../../../../common/components/ProductCard";
import { setCartTotalCount } from "../../../../redux/actions/app";
import AppLoader from "../../../../common/components/AppLoader";
import { deepMergeObjectSub } from "../../../../utility/commonUtility";
import { useUIContext } from "../../../../common/context/context";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../redux/actions/other";
import _get from "lodash/get";
import useCart from "../../../../hooks/useCart";
import { getProducts } from "../../../../services/firebaseapi";

export const Product = () => {
  const {productsCollection, setProducts, cart, setCart} = useUIContext();
  const [loader, setLoader] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const isItemOnCart = (id) => !!(cart && cart.find((item) => item.id === id));

  useEffect(() => {
    if (// !productsCollection || // productsCollection.length === 0 ||
       !productsCollection.lastRefKey) {
      fetchProducts();
      console.log("products fetched", productsCollection);
    }

    window.scrollTo(0, 0);
    setLoader(false);
    //return () => dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [productsCollection]);

  // useEffect(() => {
  //   setFetching(true);
  //   fetchProducts();
  // }, []);

  const fetchProducts = async () => {
    setLoader(true);
    setFetching(true);
    const res: any = await getProducts();
    setProducts(res);
    setLoader(false);
  };

  const calculateCartQuantity = () => {
    const cartItems: any = [];
    let cartCountTemp = 0;
    (cartItems || []).length &&
      cartItems.forEach((item: any) => {
        cartCountTemp += item.quantity;
      });
    setCartTotalCount(cartCountTemp);
  };

  const decreaseQuantity = (product: any) => {
    let cartItems: any = [];
    cartItems.totalPrice = 0;
    const index = cartItems.findIndex((x: any) => x["_id"] === product["_id"]);

    if (cartItems[index].quantity === 1) {
      let quant = product.quantity - 1;
      product.quantity = quant;
      cartItems[index].quantity = quant;
      cartItems.splice(index, 1);
    } else {
      let quant = product.quantity - 1;
      product.quantity = quant;
      cartItems[index].quantity = quant;
    }
    let totalPrice = deepMergeObjectSub(
      cartItems.totalPrice,
      _get(product, "sellingPrice")
    );
    cartItems.totalPrice = totalPrice;
    calculateCartQuantity();
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
                // console.log({ product });
                return (
                  <Grid item key={"pc" + index}>
                    <ProductCard
                      key={"pc" + index}
                      product={product}
                    />
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

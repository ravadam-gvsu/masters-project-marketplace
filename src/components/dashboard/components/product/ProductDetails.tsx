import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ProductCard } from "../../../../common/components/ProductCard";
import AppLoader from "../../../../common/components/AppLoader";
import _get from "lodash/get";
import { useUIContext } from "../../../../common/context/context";
import Gallery from "./Gallery";
import Description from "./Description";
import { useParams } from "react-router-dom";
import useProduct from "../../../../hooks/useProduct";

export const ProductDetails = () => {
  const { id } = useParams();
  const { product, isLoading, error } = useProduct(id);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const { cart, setCart } = useUIContext();
  const [quant, setQuant] = useState(0);
  const [orderedQuant, setOrderedQuant] = useState(0);
  // const addToCartItems = (product: any) => {
  //   setCart([...cart, product]);
  // };

  const addQuant = () => {
    setQuant(quant + 1);
  };

  const removeQuant = () => {
    setQuant(quant - 1);
  };

  const resetQuant = () => {
    setQuant(0);
    setOrderedQuant(0);
  };

  return (
    <section className="core">
      <Gallery product={product} />
      {/* <MobileGallery /> */}
      <Description
        product={product}
        onQuant={quant}
        onAdd={addQuant}
        onRemove={removeQuant}
        onSetOrderedQuant={setOrderedQuant}
      />
    </section>
  );
};

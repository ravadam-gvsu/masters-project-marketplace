import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { useUIContext } from "../../../../hooks/context";
import Gallery from "./Gallery";
import Description from "./Description";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../../../../services/firebaseapi";
import { ArrowBack } from "@mui/icons-material";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const { cart, setCart, addToCart, reduceFromCart } = useUIContext();

  const orderQuant = cart.find((prod) => prod.id === id);
  useEffect(() => {
    if (id) {
      getSingleProduct(id).then((pd) => setProduct(pd as any));
    }
  }, [id]);

  const backToProducts = () => {
    navigate("/");
  };

  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          flexDirection: "column",
        }}
      >
        <IconButton
          style={{ margin: "10px", background: "none" }}
          onClick={backToProducts}
        >
          <ArrowBack style={{ marginRight: "10px" }} />
          {" Back to Products"}
        </IconButton>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {product && (
            <>
              <Gallery product={product} />
              <Description
                product={product}
                onQuant={orderQuant?.quantity || 0}
                onAdd={() => addToCart(product)}
                onRemove={() => reduceFromCart(product)}
              />
            </>
          )}
        </section>
      </Box>
    </Grid>
  );
};

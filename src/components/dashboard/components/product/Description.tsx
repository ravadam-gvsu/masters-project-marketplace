import { ShoppingCart } from "@mui/icons-material";
import QuantityButton from "./QuantityButton";
import { Button } from "@mui/material";
import React  from 'react';

const Description = ({
  product,
  onQuant,
  onAdd,
  onRemove
}: any) => {
  console.log("product details", product);
  return (
    <section className="description">
      <p className="pre">{product.productTitle}</p>
      <h1>{product.productDescription}</h1>
      <div className="price">
        <div className="main-tag">
          <p>${product.sellingPrice}</p>
        </div>
      </div>
      <div className="buttons">
        <QuantityButton onQuant={onQuant} onRemove={onRemove} onAdd={onAdd} />
        <Button
          className="add-to-cart"
          onClick={onAdd}
        >
          <ShoppingCart />
          add to cart
        </Button>
      </div>
    </section>
  );
};

export default Description;

import { ShoppingCart } from "@mui/icons-material";
import QuantityButton from "./QuantityButton";
import { Button } from "@mui/material";

const Description = ({
  product,
  onQuant,
  onAdd,
  onRemove,
  onSetOrderedQuant,
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
          onClick={() => {
            onSetOrderedQuant(onQuant);
          }}
        >
          <ShoppingCart />
          add to cart
        </Button>
      </div>
    </section>
  );
};

export default Description;

/* eslint-disable react/jsx-props-no-spreading */
import ProductList from "../components/product/ProductList";
import ProductGrid from "../components/product/ProductGrid";

const Product = () => {
  return (
    <main className="content">
      <section className="product-list-wrapper">
        <ProductList>
          <ProductGrid />
        </ProductList>
      </section>
    </main>
  );
};

export default Product;

/* eslint-disable react/forbid-prop-types */
import { useEffect, useState } from "react";
import MessageDisplay from "../../common/components/DisplayMessage";
import Boundary from "../../common/components/Boundary";
import { useUIContext } from "../../common/context/context";
import { getProducts } from "../../services/firebaseapi";

const ProductList = (props: any) => {
  const { products, setProducts } = useUIContext();
  const { children } = props;
  const [isFetching, setFetching] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchProducts = async () => {
    setFetching(true);
    const productsRes = await getProducts("");
    setProducts(productsRes);
  };

  useEffect((): any => {
    if (products.length === 0 || !products.lastRefKey) {
      fetchProducts();
    }

    window.scrollTo(0, 0);
    return () => setLoader(false);
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [products.lastRefKey]);

  if (products.length === 0) {
    return <MessageDisplay message={"No products found."} />;
  }
  // if (products.length === 0) {
  //   return (
  //     <MessageDisplay
  //       message={"Something went wrong :("}
  //       action={fetchProducts}
  //       buttonLabel="Try Again"
  //     />
  //   );
  // }
  return (
    <Boundary>
      {children}
      {/* Show 'Show More' button if products length is less than total products */}
      {/* {products.items.length < products.total && (
        <div className="d-flex-center padding-l">
          <button
            className="button button-small"
            disabled={isFetching}
            onClick={fetchProducts}
            type="button"
          >
            {isFetching ? "Fetching Items..." : "Show More Items"}
          </button>
        </div>
      )} */}
    </Boundary>
  );
};

export default ProductList;

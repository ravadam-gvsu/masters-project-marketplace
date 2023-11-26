/* eslint-disable react/forbid-prop-types */
import PropType from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions/other";
import { getProducts } from "../../redux/actions/product";
import MessageDisplay from "../../common/components/DisplayMessage";
import Boundary from "../../common/components/Boundary";

const ProductList = (props) => {
  const { products, isLoading, requestStatus, children } =
    props;
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const fetchProducts = () => {
    setFetching(true);
    dispatch(getProducts(products.lastRefKey));
  };

  useEffect((): any => {
    if (products.items.length === 0 || !products.lastRefKey) {
      fetchProducts();
    }

    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [products.lastRefKey]);

  if (products.items.length === 0 && !isLoading) {
    return (
      <MessageDisplay
        message={requestStatus?.message || "No products found."}
      />
    );
  }
  if (products.items.length === 0 && requestStatus) {
    return (
      <MessageDisplay
        message={requestStatus?.message || "Something went wrong :("}
        action={fetchProducts}
        buttonLabel="Try Again"
      />
    );
  }
  return (
    <Boundary>
      {children}
      {/* Show 'Show More' button if products length is less than total products */}
      {products.items.length < products.total && (
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
      )}
    </Boundary>
  );
};

ProductList.defaultProps = {
  requestStatus: null,
};

ProductList.propTypes = {
  products: PropType.object.isRequired,
  isLoading: PropType.bool.isRequired,
  requestStatus: PropType.string,
  children: PropType.oneOfType([PropType.arrayOf(PropType.node), PropType.node])
    .isRequired,
};

export default ProductList;

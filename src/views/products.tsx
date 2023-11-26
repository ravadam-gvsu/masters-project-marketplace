/* eslint-disable react/jsx-props-no-spreading */
// import { useDocumentTitle, useScrollTop } from '@/hooks';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import ProductList from '../components/product/ProductList';
import ProductGrid from '../components/product/ProductGrid';
import { selectFilter } from '../utility/selector';
// import { selectFilter } from '@/selectors/selector';

const Product = () => {
//   useDocumentTitle('Shop | Salinaka');
//   useScrollTop();

  const store: any = useSelector((state: any) => ({
    // filteredProducts: selectFilter(state.products.items, state.filter),
    products: state.products,
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading
  }), shallowEqual);

  return (
    <main className="content">
      <section className="product-list-wrapper">
        {/* <AppliedFilters filteredProductsCount={store.filteredProducts.length} /> */}
        <ProductList {...store}>
          <ProductGrid products={store.products} />
        </ProductList>
      </section>
    </main>
  );
};

export default Product;

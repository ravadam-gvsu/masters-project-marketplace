import {
  ADD_ITEM,
    ADD_ITEM_SUCCESS,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    CANCEL_GET_PRODUCTS,
    CLEAR_SEARCH_STATE,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    REMOVE_PRODUCT,
    REMOVE_PRODUCT_SUCCESS,
    SEARCH_PRODUCT,
    SEARCH_PRODUCT_SUCCESS
  } from '../../constants/constants';
  
  export const getProducts = (lastRef: any) => ({
    type: GET_PRODUCTS,
    payload: lastRef
  });
  
  export const getProductsSuccess = (products: any) => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: products
  });
  
  export const cancelGetProducts = () => ({
    type: CANCEL_GET_PRODUCTS
  });
  
  export const addProduct = (product: any) => ({
    type: ADD_PRODUCT,
    payload: product
  });
  
  export const searchProduct = (searchKey: any) => ({
    type: SEARCH_PRODUCT,
    payload: {
      searchKey
    }
  });
  
  export const searchProductSuccess = (products: any) => ({
    type: SEARCH_PRODUCT_SUCCESS,
    payload: products
  });
  
  export const clearSearchState = () => ({
    type: CLEAR_SEARCH_STATE
  });
  
  export const addProductSuccess = (product: any) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
  });
  
  export const removeProduct = (id: any) => ({
    type: REMOVE_PRODUCT,
    payload: id
  });
  
  export const removeProductSuccess = (id: any) => ({
    type: REMOVE_PRODUCT_SUCCESS,
    payload: id
  });
  
  export const editProduct = (id: any, updates: any) => ({
    type: EDIT_PRODUCT,
    payload: {
      id,
      updates
    }
  });
  
  export const editProductSuccess = (updates: any) => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: updates
  });

  
//Lost and found implementation
  export const addItem = (item: any) => ({
    type: ADD_ITEM,
    payload: item
  });
  
  export const addItemSuccess = (item: any) => ({
    type: ADD_ITEM_SUCCESS,
    payload: item
  });
  
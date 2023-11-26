import {
    ADD_QTY_ITEM, ADD_TO_CART,
    CLEAR_CART,
    MINUS_QTY_ITEM, REMOVE_FROM_CART,
    SET_CART_ITEMS
  } from '../../constants/constants';
  
  export const setCartItems = (items = []) => ({
    type: SET_CART_ITEMS,
    payload: items
  });
  
  export const addToCart = (product: any) => ({
    type: ADD_TO_CART,
    payload: product
  });
  
  export const removeFromCart = (id: any) => ({
    type: REMOVE_FROM_CART,
    payload: id
  });
  
  export const clearCart = () => ({
    type: CLEAR_CART
  });
  
  export const addQtyItem = (id: any) => ({
    type: ADD_QTY_ITEM,
    payload: id
  });
  
  export const minusQtyItem = (id: any) => ({
    type: MINUS_QTY_ITEM,
    payload: id
  });
  
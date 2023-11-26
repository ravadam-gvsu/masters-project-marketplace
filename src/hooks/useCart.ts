import { useDispatch, useSelector } from 'react-redux';
import { addToCart as dispatchAddToCart, removeFromCart } from '../redux/actions/cart';

const useCart = () => {
  const { cart } = useSelector((state: any) => ({ cart: state.cart }));
  const dispatch = useDispatch();

  const isItemOnCart = (id) => !!(cart.cartItems && cart.cartItems.find((item) => item.id === id));

  const addToCart = (product) => {
    if (isItemOnCart(product.id)) {
      dispatch(removeFromCart(product.id));
    //   displayActionMessage('Item removed from basket', 'info');
    } else {
      dispatch(dispatchAddToCart(product));
    //   displayActionMessage('Item added to basket', 'success');
    }
  };

  return { cart, isItemOnCart, addToCart };
};

export default useCart;

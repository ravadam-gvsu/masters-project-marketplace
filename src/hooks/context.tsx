import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../common/auth/firebase-init";
import { getUser } from "../services/firebaseapi";

export const UIContext = createContext<any>({});
export const useUIContext = () => useContext(UIContext);

const auth = getAuth(app);

export const UIProvider = ({ children }: any) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [productsCollection, setProducts] = useState({
    products: []
  });

  const isItemOnCart = (id: any) => {
    return cart.some((item:any) => item.id === id);
  }

  const addToCart = (product) => {
    const cartItem:any = cart.find((item:any) => item.id === product.id);
    if (cartItem) {
      cartItem.quantity += 1;
      setCart([...cart]);
    } else {
      setCart([...cart, product] as any);
    }
  };

  const reduceFromCart = (product) => {
    const cartItem:any = cart.find((item:any) => item.id === product.id);
    if (cartItem) {
      cartItem.quantity -= 1;
      setCart([...cart]);
    }
  };

  const trashFromCart = (product) => {
    setCart(cart.filter((item: any) => item.id !== product.id));
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getUser(user.uid).then((userDetails: any) => {
          setUserDetails(userDetails.data());
        });
      }
    });
  }, []);

  return (
    <UIContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        showSearchBox,
        setShowSearchBox,
        showCart,
        setShowCart,
        cart,
        setCart,
        wishlist,
        setWishlist,
        showWishlist,
        setShowWishlist,
        productsCollection,
        setProducts,
        userDetails,
        isItemOnCart,
        addToCart,
        reduceFromCart,
        trashFromCart
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

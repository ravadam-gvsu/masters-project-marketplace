import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../common/auth/firebase-init";
import { getUser, searchProductsMod, updateProfile } from "../services/firebaseapi";

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
  const [itemsCollection, setItems] = useState({
    items: []
  });

  const updateCart = (newCart:any[]) => {
    setCart(newCart as any);
    updateProfile((userDetails as any).user.id, { cart: newCart });
  }

  const isItemOnCart = (id: any) => {
    return cart.some((item:any) => item.id === id);
  }

  const addToCart = (product) => {
    const cartItem:any = cart.find((item:any) => item.id === product.id);
    if (cartItem) {
      cartItem.quantity += 1;
      updateCart([...cart]);
    } else {
      updateCart([...cart, product] as any);
    }
  };

  const reduceFromCart = (product) => {
    const cartItem:any = cart.find((item:any) => item.id === product.id);
    if (cartItem) {
      cartItem.quantity -= 1;
      updateCart([...cart]);
    }
  };

  const trashFromCart = (product) => {
    updateCart(cart.filter((item: any) => item.id !== product.id));
  };

  const clearCart = () => updateCart([]);


  const searchProducts = async (key) => {
    const products = await searchProductsMod(key);
    setProducts(products as any);
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getUser(user.uid).then((userDetails: any) => {
          setUserDetails( { user: {id: user.uid, ...userDetails.data().user} });
          setCart(userDetails.data().cart || []);
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
        itemsCollection,
        setItems,
        userDetails,
        isItemOnCart,
        addToCart,
        reduceFromCart,
        trashFromCart,
        clearCart,
        searchProducts
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

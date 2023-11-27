import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../auth/firebase-init";
import { getUser } from "../../services/firebaseapi";

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
  const [products, setProducts] = useState([]);

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
        products,
        setProducts,
        userDetails,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

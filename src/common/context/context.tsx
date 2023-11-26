import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../auth/firebase-init";
// import { fetchUserDetails } from "../../services/firebaseapi";

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
  // const [userDetails, setUserDetails] = useState({});

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       fetchUserDetails(user.uid).then((userDetails: any) => {
  //         setUserDetails(userDetails);
  //       });
  //     }
  //   });
  // }, []);

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
        // userDetails,
        // setUserDetails,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

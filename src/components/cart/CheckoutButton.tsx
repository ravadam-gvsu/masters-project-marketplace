import axios from "axios";
import { useSelector } from "react-redux";
import { productsCheckout } from "../../services/middleware";
import { Button } from "@mui/material";

const CheckoutButton = ({ cartItems }: any) => {  
  const { user } = useSelector((state: any) => ({
    user: state.auth,
  }));
  
  console.log("userDetails", user);
  const handleCheckout = async () => {
    const payload = {
      cartItems,
      userId: user.id,
    };

    await productsCheckout(payload)
      .then((res) => {
        if (res.url) {
          window.location.href = res.url;
        } else {
        //   setErrMsg("Email already exists");
        }
      })
      .catch((err) => console.log(err));
    // axios
    //   .post(`${url}/stripe/create-checkout-session`, {
    //     cartItems,
    //     userId: userDetails._id,
    //   })
    //   .then((response) => {
    //     if (response.data.url) {
    //       window.location.href = response.data.url;
    //     }
    //   })
    //   .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Button variant="contained" onClick={() => handleCheckout()}>Check out</Button>
    </>
  );
};

export default CheckoutButton;
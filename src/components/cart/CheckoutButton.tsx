import { productsCheckout } from "../../services/middleware";
import { Button } from "@mui/material";
import { useUIContext } from "../../hooks/context";

const CheckoutButton = ({ cartItems }: any) => {  
  const {userDetails} = useUIContext();
  
  console.log("userDetails", userDetails.user.id);
  const handleCheckout = async () => {
    const payload = {
      cartItems,
      userId: userDetails.user.id,
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

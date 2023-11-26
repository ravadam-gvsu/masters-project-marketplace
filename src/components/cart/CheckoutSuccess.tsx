import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes";
import { ArrowLeftOutlined } from "@mui/icons-material";
// import styled from "styled-components";
// import { clearCart, getTotals } from "../slices/cartSlice";

const CheckoutSuccess = () => {
    const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(clearCart());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getTotals());
//   }, [cart, dispatch]);

  return (
    <Container>
        <Button
          className="button button-muted w-100-mobile"
          onClick={() => navigate("/home")}
          type="button"
        >
          <ArrowLeftOutlined />
          &nbsp;
          Continue shopping
        </Button>
      <h2>Checkout Successful</h2>
      <p>Check your order status at your profile after about 10mins for more details.</p>
    </Container>
  );
};

export default CheckoutSuccess;

// const Container = styled.div`
//   min-height: 80vh;
//   max-width: 800px;
//   width: 100%;
//   margin: auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;

//   h2 {
//     margin-bottom: 0.5rem;
//     color: #029e02;
//   }
// `;

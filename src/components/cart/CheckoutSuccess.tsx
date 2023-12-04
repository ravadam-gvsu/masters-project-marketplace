import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@mui/icons-material";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Button
        className="button button-muted w-100-mobile"
        onClick={() => navigate("/home")}
        type="button"
      >
        <ArrowLeftOutlined />
        &nbsp; Continue shopping
      </Button>
      <h2>Checkout Successful</h2>
      <p>
        Check your order status at your profile after about 10mins for more
        details.
      </p>
    </Container>
  );
};

export default CheckoutSuccess;
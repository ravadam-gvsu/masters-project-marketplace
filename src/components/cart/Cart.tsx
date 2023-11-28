import { useTheme } from "@mui/material/styles";
import {
  Drawer,
  Box,
  Paper,
  IconButton,
  Button,
  List,
  Typography,
  Avatar,
  useMediaQuery,
  ButtonGroup,
} from "@mui/material";
import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
  Close,
} from "@mui/icons-material";
import { useUIContext } from "../../hooks/context";
import CheckoutButton from "./CheckoutButton";
import { calculateTotal, displayMoney } from "../../utility/commonUtility";

const useStyles = () => ({
  cartHeader: {
    display: "flex",
    alignItems: "center",
    position: "sticky",
    top: "-20",
    background: "#fff",
  },
  CartDetails: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid rgb(243, 245, 249)",
    borderTopColor: "rgb(243, 245, 249)",
    borderRightColor: "rgb(243, 245, 249)",
    borderLeftColor: "rgb(243, 245, 249)",
  },
  cartControls: {
    display: "flex",
    webkitBoxAlign: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  productDetails: {
    flex: "1 1 0%",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  priceCalc: {
    fontSize: "10px",
    fontWeight: "400",
    color: "rgb(125, 135, 156)",
  },
  sellingPrice: {
    fontSize: "14px",
    fontWeight: "600",
    color: "rgb(210, 63, 87)",
    marginTop: "4px",
  },
  quantity: {
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "3px",
    marginBottom: "3px",
  },
});

export const Cart = () => {
  const classes = useStyles();
  const { cart, setCart, showCart, setShowCart, addToCart, reduceFromCart, trashFromCart } =
    useUIContext();

  console.log("setShowCart", showCart);
  console.log("cart details", cart);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const cartEmptyContent = (
    <>
      <Typography variant={matches ? "h5" : "h3"}>
        Your cart is empty
      </Typography>
      <Button onClick={() => setShowCart(false)}>Continue Shopping</Button>
    </>
  );

  const cartContent =
    cart &&
    cart.map((item: any, index: string) => (
      <Box key={"cart" + index} sx={classes.CartDetails}>
          <Box sx={classes.cartControls}>
            <IconButton
              sx={{ color: "rgb(210, 63, 87)" }}
              onClick={() => addToCart(item)}
              disabled={item.maxQuantity === item.quantity}
            >
              <AddCircleOutlineRounded />
            </IconButton>
            <Typography variant="h6">{item.quantity}</Typography>
            <IconButton
              sx={{ color: item.quantity && "rgb(210, 63, 87)" }}
              onClick={() => reduceFromCart(item)}
              disabled={item.quantity === 1}
            >
              <RemoveCircleOutlineRounded />
            </IconButton>
          </Box>
          <Avatar
            alt={item.productTitle}
            src={item.images[0]}
            sx={{ width: 90, height: 90, mr: 2 }}
          />
          <Box sx={classes.productDetails}>
            <Typography variant="h6">{item.productTitle}</Typography>
            <small style={classes.priceCalc}>
              {item.sellingPrice}X{item.quantity}
            </small>
            <Typography sx={classes.sellingPrice} variant="h6">
              {item.sellingPrice}
            </Typography>
          </Box>
          <IconButton onClick={() => trashFromCart(item)}>
            <Close />
          </IconButton>
        </Box>
    ));

  // const cartFilledContent = cart.map((item: any) => (
  //   <>
  //     <ListItem
  //       key={item.id}
  //       alignItems="flex-start"
  //       sx={{ padding: "15px 0 30px 0" }}
  //     >
  //       <ListItemAvatar>
  //         <Avatar
  //           alt={item.productTitle}
  //           src={item.images[0]}
  //           sx={{ width: 90, height: 90, mr: 2 }}
  //         />
  //       </ListItemAvatar>
  //       <ListItemText
  //         primary={
  //           <Typography variant="h4" fontSize="20px">
  //             {item.productTitle}
  //           </Typography>
  //         }
  //         secondary={
  //           <>
  //             <Typography variant="body1">{item.productDescription}</Typography>
  //             <Typography variant="h6">{`$${item.sellingPrice}`}</Typography>
  //           </>
  //         }
  //       />
  //       <Stack direction="row">
  //         <Toolbar
  //           variant="dense"
  //           sx={{
  //             "&.MuiToolbar-root": {
  //               padding: 0,
  //             },
  //             position: "absolute",
  //             bottom: 0,
  //             right: 0,
  //           }}
  //         >
  //           <Tooltip title="Move to wishlist">
  //             <IconButton onClick={() => moveToWishlist(item)}>
  //               <Favorite />
  //             </IconButton>
  //           </Tooltip>
  //           <Tooltip title="Remove from cart">
  //             <IconButton onClick={() => removeItem(item.id)}>
  //               <Delete />
  //             </IconButton>
  //           </Tooltip>
  //         </Toolbar>
  //       </Stack>
  //     </ListItem>
  //     <Divider variant="inset" component="li" />
  //   </>
  // ));

  return (
    <Drawer
      open={showCart}
      onClose={() => setShowCart(false)}
      anchor="right"
      PaperProps={{
        sx: {
          width: matches ? "100%" : 500,
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{ p: 4 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {cart && cart.length ? (
          <>
            <Box sx={classes.cartHeader}>
              <Typography variant="h5" flexGrow={1} marginRight={10}>
                Your cart{" "}
                <span>
                  ({`${cart.length} ${cart.length > 1 ? "items" : "item"}`})
                </span>
              </Typography>
              <ButtonGroup
                size="small"
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button onClick={() => setShowCart(false)}>Close</Button>
                <Button
                  disabled={cart.length === 0}
                  onClick={() => setCart([])}
                >
                  <span>Clear</span>
                </Button>
              </ButtonGroup>
            </Box>

            <Paper elevation={0} sx={{ mt: 2, width: "95%", p: 4 }}>
              <List>{cartContent}</List>
            </Paper>

            <Box
              sx={{ width: "100%" }}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              <Box alignItems="center" justifyContent="center">
                <Typography variant="caption" display="block" gutterBottom>
                  Subtotal Amout:
                </Typography>
                <Typography variant="button" display="block" gutterBottom>
                  {displayMoney(
                    calculateTotal(
                      cart.map((product: any) => {
                        console.log("calculating product price", product);
                        return product.sellingPrice * product.quantity;
                      })
                    )
                  )}
                </Typography>
              </Box>
              <Box alignItems="center" justifyContent="center">
                <CheckoutButton cartItems={cart} />
              </Box>
            </Box>
          </>
        ) : (
          cartEmptyContent
        )}
      </Box>

      {/* <Button onClick={() => setShowCart(false)}>Continue Shopping</Button> */}
    </Drawer>
  );
};

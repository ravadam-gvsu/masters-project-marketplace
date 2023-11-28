import { CheckOutlined } from "@mui/icons-material";
import ImageLoader from "../../common/components/ImageLoader";
import {
  displayMoney,
  usagePeriodConverter,
} from "../../utility/commonUtility";
import PropType from "prop-types";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import _, { toUpper } from "lodash";
import {
  MoreVert as MoreVertIcon,
  AcUnit as AcUnitIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  colors,
  createTheme,
} from "@mui/material";
import Carousel from "../../common/components/ImageCarousel";
import dayjs from "dayjs";
import constants from "../../constants/validators";
import { useUIContext } from "../../common/context/context";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const styles = (theme: any) => ({
  root: {
    width: "350px",
    // minWidth: "361px",
    // height: "489.06px",
    // maxHeight: "489.06px",
    position: "relative",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: colors.red[500],
  },
  fW500: {
    fontWeight: 600,
    fontSize: theme.spacing(2.3),
  },
  ribbon: {
    position: "absolute",
    overflow: "hidden",
    width: 135,
    height: 135,
    "&::before": {
      content: "close-quote",
      position: "absolute",
      display: "block",
      border: `5px solid ${colors.red[500]}`,
    },
    "&::after": {
      content: "close-quote",
      position: "absolute",
      display: "block",
      border: `5px solid ${colors.red[500]}`,
    },
  },
  ribbonTopRight: {
    top: -10,
    right: -10,
    "&::before": {
      content: "close-quote",
      borderTopColor: "transparent",
      borderRightColor: "transparent",
      top: 0,
      left: 30,
    },
    "&::after": {
      content: "close-quote",
      borderTopColor: "transparent",
      borderRightColor: "transparent",
      bottom: 30,
      right: 0,
    },
  },
  ribbonText: {
    position: "absolute",
    display: "block",
    padding: theme.spacing(1, 0),
    margin: theme.spacing(2),
    width: 225,
    fontSize: 12,
    backgroundColor: colors.red[500],
    color: "#000",
    textTransform: "uppercase",
    textAlign: "center",
    left: -25,
    top: 30,
    transform: "rotate(45deg)",
  },
  addedToCartBtn: {
    border: `2px solid ${theme.palette.primary.main}`,
    "&:hover": {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
  incBtn: {
    background: theme.palette.common.white,
    minWidth: theme.spacing(7),
    padding: theme.spacing(0),
    border: `1px solid ${theme.palette.warning.light}`,
    borderRadius: theme.spacing(0, 50, 50, 0),
    "&:hover": {
      background: theme.palette.warning.light,
      color: theme.palette.common.white,
    },
  },
  decBtn: {
    background: theme.palette.common.white,
    minWidth: theme.spacing(7),
    padding: theme.spacing(0),
    border: `1px solid ${theme.palette.warning.light}`,
    borderRadius: theme.spacing(50, 0, 0, 50),
    "&:hover": {
      background: theme.palette.warning.light,
      color: theme.palette.common.white,
    },
  },
  cartCount: {
    background: theme.palette.common.white,
    padding: theme.spacing(0, 2),
    borderRadius: 0,
    borderTop: `1px solid ${theme.palette.warning.light}`,
    borderBottom: `1px solid ${theme.palette.warning.light}`,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(10, 30, 10),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  iconBtn: {
    // position: "absolute",
    display: "flex",
    justifyContent: "flexEnd",
    float: "right",
  },
  indicatorStyle: {
    background: "#CFCECD",
    width: 7,
    height: 7,
    borderRadius: 50,
    display: "inline-block",
    margin: "0 4px 0 4px",
    zIndex: 8,
  },
});
const ProductItem = ({ product }) => {
  const classes = styles(theme);
  const navigate = useNavigate();
  const {isItemOnCart, addToCart} = useUIContext();

  const onClickItem = () => {
    if (!product) return;

    if (product.id) {
      navigate(`/product/${product.id}`);
    }
  };

  const itemOnBasket = isItemOnCart ? isItemOnCart(product.id) : false;

  const handleAddToCart = () => {
    if (addToCart) addToCart({ ...product, selectedQuantity: 1 });
  };

  const productTitle = _.get(product, "productTitle", "");
  const productImages = _.get(product, "images", "");
  const productDescription = _.get(product, "productDescription", "");
  const originalPrice = product["itemPrice"];
  const sellingPrice = _.get(product, "sellingPrice", 0); //priceValueFormatter
  const usagePeriod = usagePeriodConverter(_.get(product, "dateOfPurchase"));
  const availableInState = _.get(product, "availabilityArea.state", {});
  const availableInCity = _.get(product, "availabilityArea.city", {});
  const postedOn = dayjs(_.get(product, "timestamp")).format(
    constants.dateFormat.fullMonthFirstFull
  );
  const sellerDetails = _.get(product, "sellerDetails", {});
  const sellerName = _.get(product, "sellerName", ""); //sellerDetails
  const specialRibbon = _.get(product, "specialRibbon", true);
  const quantity = _.get(product, "quantity", 1);
  const limit = _.get(product, "limit");

  return (
    <Card sx={classes.root} onClick={onClickItem}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" sx={classes.avatar}>
            {toUpper(sellerName.charAt(0))}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={sellerName}
        subheader={postedOn}
      />
      {specialRibbon && (
        <Box sx={[classes.ribbon, classes.ribbonTopRight]}>
          <Typography sx={classes.ribbonText}>
            DISCOUNT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
        </Box>
      )}
      <Carousel images={productImages} />
      {/* <CardMedia
  sx={classes.media}
  image={productImages[0]}
  title={productTitle}
/> */}
      <CardContent>
        <Tooltip title={productTitle}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {productTitle.length > 80
              ? `${productTitle.slice(0, 80)}...`
              : productTitle}
          </Typography>
        </Tooltip>
        {productTitle.length < 45 ? <br /> : ""}
        <Grid container alignItems="baseline">
          <Grid item>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              ${sellingPrice}
            </Typography>
          </Grid>
          <Grid item>&nbsp;</Grid>
          <Grid item>
            <Typography
              variant="body2"
              style={{
                textDecorationLine: specialRibbon ? "line-through" : "none",
              }}
            >
              ${originalPrice}
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid container alignItems="baseline">
    <Grid item>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>$ </Typography>
    </Grid>
    <Grid item>
      <Typography
        variant="body2"
        sx={{ fontWeight: "bold" }}
        style={{
          textDecorationLine: specialRibbon ? "line-through" : "none",
        }}
      >
        {originalPrice}
      </Typography>
    </Grid>
  </Grid> */}
      </CardContent>

      <CardActions disableSpacing>
        {/* {quantity > 0 ? (
    <Grid container>
      <Box px={-10}>
        <Button onClick={() => removeFromCart(product)}>-</Button>
      </Box>
      <Typography>{quantity}</Typography>
      <Box px={-10}>
        <Button
          sx={classes.incBtn}
          onClick={() => addToCart(product)}
          disabled={quantity >= limit ? true : false}
        >
          +
        </Button>
      </Box>
    </Grid>
  ) : ( */}
        <Button
          onClick={handleAddToCart}
          variant="outlined"
          sx={classes.addedToCartBtn}
        >
          <Typography variant="button">
            Add to Cart
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

ProductItem.defaultProps = {
  isItemOnBasket: undefined,
  addToBasket: undefined,
};

ProductItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropType.object.isRequired,
  isItemOnBasket: PropType.func,
  addToBasket: PropType.func,
};

export default ProductItem;

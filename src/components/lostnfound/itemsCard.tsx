import { useState } from "react";
// import { Carousel } from "react-responsive-carousel";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  colors,
  Box,
  Button,
  Grid,
  Tooltip,
  Popover,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import _, { toUpper } from "lodash";
import constants from "../../constants/validators";
import dayjs from "dayjs";
import { usagePeriodConverter } from "../../utility/commonUtility";
import { createTheme } from "@mui/material/styles";
import Carousel from "../../common/components/ImageCarousel";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../../hooks/context";
import Chats from "./chats/chats";
import ConversationPage from "./chats/conversations";
import React from "react";

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
  selectCartBtn: {
    border: `2px solid ${theme.palette.primary.main}`,
    "&:hover": {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    marginRight: 2,
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

export const ItemCard = ({ item }: any) => {
  let navigate = useNavigate();
  const classes = styles(theme);

  const itemName = _.get(item, "itemName", "");
  const itemImages = _.get(item, "images", "");
  const description = _.get(item, "description", "");
  const picklocation = _.get(item, "picklocation", "");
  const postedOn = dayjs(_.get(item, "timestamp")).format(
    constants.dateFormat.fullMonthFirstFull
  );
  const status = _.get(item, "status", "");

  const handleChatButton = () => {
    navigate(`/conversation/${"xPpSNCcDmFhzKOo5tU4F7qEWnUZ2"}`); //item.user?.uid
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Card sx={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" sx={classes.avatar}>
            {/* {toUpper(sellerName.charAt(0))} */}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        // title={sellerName}
        subheader={postedOn}
      />

      <Box sx={[classes.ribbon, classes.ribbonTopRight]}>
        <Typography sx={classes.ribbonText}>
          {status}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Typography>
      </Box>

      <Carousel images={itemImages} />
      <CardContent>
        <Tooltip title={itemName}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {itemName.length > 80 ? `${itemName.slice(0, 80)}...` : itemName}
          </Typography>
        </Tooltip>
        <Grid container alignItems="baseline">
          <Grid item>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {picklocation}
            </Typography>
          </Grid>
          <Grid item>&nbsp;</Grid>
          <Grid>
            <button
              className={`${
                status === "lost" ? "bg-lostColor" : "bg-foundColor"
              }  text-white font-bold py-2 px-4 rounded w-1/2 min-w-[100px] self-center hover:bg-opacity-80`}
              onClick={handleClick}
            >
              Chat
            </button>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Box
                p={1}
                bgcolor="transparent"
                mx="auto"
                justifyContent="center"
                alignItems="center"
              >
                <ConversationPage
                  itemOwnerId={"xPpSNCcDmFhzKOo5tU4F7qEWnUZ2"}
                />
              </Box>
            </Popover>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

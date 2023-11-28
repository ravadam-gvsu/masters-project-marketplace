import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Fade,
  alpha,
  createTheme,
  styled,
} from "@mui/material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Badge,
  Grid,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  AccountCircle,
  Storefront,
  ExitToApp,
  ShoppingCart,
} from "@mui/icons-material";
import { Sidebar } from "./Sidebar";
import constants from "../../../../constants/validators";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUIContext } from "../../../../hooks/context";
import routes from "../../../../constants/routes";

const theme = createTheme();
const StyledBadge = styled(Badge)(({ theme }) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const useStyles = (theme: any) => ({
  bgColor: {
    background: theme.palette.primary.light,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  textWhite: {
    color: "#fff !important",
  },
});

const pages = [
  { name: "Products", path: routes.home },
  { name: "Lost & Found", path: routes.profile },
];

export const Navbar = () => {
  const classes = useStyles(theme);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { cart, setShowCart, wishlist, setShowWishlist } = useUIContext();
  console.log("setShowCart ", useUIContext());
  let navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleNavMenu = (page) => {
    navigate(page.path);
  };

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleDrawer = (val: any) => {
    setOpenDrawer(val);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    sessionStorage.removeItem(constants.userInfo);
    // props.setCart([]);
    // props.setCartTotalAmount({});
    // props.setCartTotalCount(0);
    handleMenuClose();
    navigate("/login");
    // props.history.push("/login");
  };

  const onProfile = () => {
    handleMenuClose();
    navigate("/profile");
    // props.history.push("/profile");
  };

  const goToDashboard = () => {
    // props.history.push("/home");
    navigate("/home");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={onProfile}>Profile</MenuItem>
      <MenuItem onClick={logOut}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={onProfile}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography>Profile</Typography>
      </MenuItem>
      <MenuItem onClick={logOut}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToApp />
        </IconButton>
        <Typography>Log Out</Typography>
      </MenuItem>
    </Menu>
  );

  // return (
  //   <Box sx={classes.grow}>
  //     <AppBar position="static" sx={classes.bgColor}>
  //       {/* <Container maxWidth="xl"> */}
  //       <Toolbar>
  //         {/* <IconButton
  //             edge="start"
  //             sx={classes.menuButton}
  //             color="inherit"
  //             aria-label="open drawer"
  //             onClick={() => handleDrawer(true)}
  //           >
  //             <MenuIcon />
  //           </IconButton> */}
  //         <IconButton onClick={goToDashboard}>
  //           <Storefront sx={classes.textWhite} />
  //         </IconButton>

  //         <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
  //           {pages.map((page) => (
  //             <Button
  //               key={page.name}
  //               onClick={() => handleNavMenu(page)}
  //               sx={{ my: 2, color: "white", display: "block" }}
  //             >
  //               {page.name}
  //             </Button>
  //           ))}
  //         </Box>

  //         <Box sx={classes.grow} />
  //         <Box sx={classes.search}>
  //           <InputBase
  //             placeholder="Search…"
  //             sx={{ root: classes.inputRoot, input: classes.inputInput }}
  //             endAdornment={
  //               <IconButton color="inherit">
  //                 <Search sx={classes.textWhite} />
  //               </IconButton>
  //             }
  //             inputProps={{ "aria-label": "search" }}
  //           />
  //         </Box>
  //         <Box sx={classes.sectionDesktop}>
  //           <Grid container spacing={3}>
  //             <Grid item>
  //               <IconButton
  //                 edge="end"
  //                 aria-label="cart"
  //                 aria-controls={menuId}
  //                 aria-haspopup="true"
  //                 color="inherit"
  //                 onClick={() => {
  //                   setShowCart(true);
  //                 }}
  //               >
  //                 <StyledBadge badgeContent={cart?.length} color="secondary">
  //                   <ShoppingCart />
  //                 </StyledBadge>
  //               </IconButton>
  //             </Grid>
  //             <Grid item>
  //               {/* <IconButton
  //                   edge="end"
  //                   aria-label="account of current user"
  //                   aria-controls={menuId}
  //                   aria-haspopup="true"
  //                   onClick={handleProfileMenuOpen}
  //                   color="inherit"
  //                 >
  //                   <AccountCircle />
  //                 </IconButton> */}
  //             </Grid>
  //           </Grid>
  //         </Box>
  //         <Box>
  //           <IconButton
  //             aria-label="account of current user"
  //             aria-controls={mobileMenuId}
  //             aria-haspopup="true"
  //             onClick={handleMobileMenuOpen}
  //             color="inherit"
  //           >
  //             <AccountCircle />
  //           </IconButton>
  //         </Box>
  //       </Toolbar>
  //       {/* </Container> */}
  //     </AppBar>
  //     {/* <Sidebar
  //       isOpen={openDrawer}
  //       history={props.history}
  //       handleDrawer={handleDrawer}
  //     /> */}
  //     {renderMobileMenu}
  //     {renderMenu}
  //   </Box>
  // );

  const navbar = useRef(null);
  
  return (
    <nav className="navigation" style={classes.bgColor} ref={navbar}>
      <div className="logo">
        {/* <Link onClick={goToDashboard} to="/"> */}
        <Storefront sx={classes.textWhite} />
        {/* </Link> */}
      </div>
      <ul className="navigation-menu-main">
        {pages.map((page) => (
          <li key={page.name}>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "activeNav" : "inactiveNav"
              }
              to={page.path}
            >
              {page.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <Box sx={classes.search}>
        <InputBase
          placeholder="Search…"
          sx={{ root: classes.inputRoot, input: classes.inputInput }}
          endAdornment={
            <IconButton color="inherit">
              <Search sx={classes.textWhite} />
            </IconButton>
          }
          inputProps={{ "aria-label": "search" }}
        />
      </Box>

      {/* <Box sx={classes.sectionDesktop}>
        <Grid container spacing={3}>
          <Grid item>
            <IconButton
              edge="end"
              aria-label="cart"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                setShowCart(true);
              }}
            >
              <StyledBadge badgeContent={cart?.length} color="secondary">
                <ShoppingCart />
              </StyledBadge>
            </IconButton>
          </Grid>
        </Grid>
      </Box> */}

      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <IconButton
            edge="end"
            aria-label="cart"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            onClick={() => {
              setShowCart(true);
            }}
          >
            <StyledBadge badgeContent={cart?.length} color="secondary">
              <ShoppingCart sx={classes.textWhite}/>
            </StyledBadge>
          </IconButton>
        </li>

        <li className="navigation-menu-item">
          <IconButton
            aria-label="account of current user"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <AccountCircle sx={classes.textWhite}/>
          </IconButton>
        </li>
        {renderMobileMenu}
        {renderMenu}
      </ul>
    </nav>
  );
};

export default Navbar;

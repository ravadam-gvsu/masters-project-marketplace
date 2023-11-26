import React, { Component, Fragment, useState } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  Typography,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { TextField } from "formik-mui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  AccountCircle,
  VpnKey,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { withStyles, createStyles } from "@mui/styles";
import vaidators from "../../constants/validators";
import { getUserInfo } from "../../services/middleware";
import { signIn } from "../../services/firebaseapi";
import routes from "../../constants/routes";
import { Route, Routes, useNavigate } from "react-router-dom";
import classnames from "classnames";
import AppLoader from "../../common/components/AppLoader";
import { useStyles } from "./styles";
import { render } from "react-dom";

import SignUp from "../signup/SignUp";
import CommonToast from "../../common/components/CommonToast";
import { useUIContext } from "../../common/context/context";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  // .min(8, 'User name length should be minimum 8')
  // .max(10, 'User name length should be maximum 10'),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password length should be minimum 8"),
});

const theme = createTheme();
const styles = (theme: any) => ({
  loader: {
    position: "absolute",
    height: "100vh",
  },
  textWhite: {
    color: "#fff !important",
  },
  loginContainer: {
    height: "100vh",
    color: "#ffffff",
    background:
      "url(assets/banner.png) 50% center / cover no-repeat fixed",
  },
  loginPanel: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // "#00000870",
    borderRadius: 0,
    height: "100%",
    textAlign: "center",
    padding: theme.spacing(12),
  },
  loginButton: {
    background: "#ffcb05",
    padding: "5px 30px",
    borderRadius: 15,
    "&:hover": {
      background: "#ffffff",
    },
  },
  registerBtn: {
    color: "#ffffff",
    borderColor: "#ffcb05",
    padding: "5px 30px",
    borderRadius: 15,
  },
  backBtn: {
    color: "#ffffff",
    borderColor: "#ffcb05",
    borderRadius: 20,
    marginRight: 10,
  },
  whiteText: {
    color: "#ffffff",
  },
  pointer: {
    cursor: "pointer",
  },
  enrollFormContrl: {
    "& .MuiInput-underline:before": {
      borderBottom: `1px solid '#ffffff'`,
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #fffffa",
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderBottomColor: "#FF99BC",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiFormLabel-root": {
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "normal",
    },
  },
});

export const Login = () => {
  const classes = styles(theme);

  const [showLoader, setShowLoader] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  //   constructor(props: any) {
  //     super(props);
  //     this.state = {
  //       showLoader: false,
  //       isLogin: true,
  //       showPassword: false,
  //     };
  //   }

  let navigate = useNavigate();
  const { authStatus, isAuthenticating } = useSelector((state: any) => ({
    authStatus: state.app.authStatus,
    isAuthenticating: state.app.isAuthenticating
  }));
  const dispatch = useDispatch();
  // const routeChange = () =>{
  //   let path = `newPath`;
  //   navigate(path);
  // }

  const goToSignup = () => {
    let path = routes.customerRegistration;
    navigate(path);
    // this.props.history.push(
    //   `${this.props.match.path}${routes.customerRegistration}`
    // );
    setIsLogin(false);
  };

  const comebackToLogin = ({ type = "", message = "" }) => {
    // this.props.history.push({
    //   pathname: `${this.props.match.path}`,
    //   state: { type, message },
    // });

    // if (this.props.location.state) {
    //   this.props.handleShowToast({
    //     type: this.props.location.state.type,
    //     message: this.props.location.state.message,
    //   });
    // }

    setIsLogin(true);
  };

  const onSubmit = async (user: any, { setSubmitting }: any) => {
    setShowLoader(true);
    setSubmitting(true);
    
    // dispatch(signIn(user.email, user.password));
    await signIn(user)
      .then((res: any) => {
        if (res && res.status === vaidators.success) {
          let path = routes.home.baseurl;
          navigate(path);
          //   this.props.history.push("/home");
        } else {
          //   this.props.handleShowToast({
          //     type: "error",
          //     message: "Please enter correct email and password!",
          //   });
        }
      })
      .catch((err: any) => {
        // this.props.handleShowToast({
        //   type: "error",
        //   message: err,
        // });
        console.log(err);
      });

    setSubmitting(false);
    setShowLoader(false);
  };

  const handleClickShowPassword = (value: string) => {
    setShowPassword(!showPassword);
  };

  //   render() {
  // const { isLogin, showPassword, showLoader } = this.state;

  // const { classes } = this.props;

  console.log("login screen classes", classes);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={classes.loginContainer}
    >
      {/* <Grid item>
        <CommonToast />
      </Grid> */}
      <Grid item xs={5}>
        <Paper sx={classes.loginPanel}>
          <Grid container>
            <Grid item xs={12}>
              {isLogin ? (
                <Fragment>
                  <Grid item xs={12}>
                    <Typography variant="h4" sx={classes.textWhite}>
                      Login to GVSU Marketplace
                    </Typography>
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <Typography sx={classes.textWhite}>
                      Simple & Convenient <br /> access to marketplace
                    </Typography>
                  </Grid>
                  <br />
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                  >
                    {({ submitForm, isValid }) => (
                      <Form>
                        <Grid item xs={12} sx={classes.enrollFormContrl}>
                          <Box maxWidth="75%" p={2}>
                            <Field
                              component={TextField}
                              fullWidth
                              id="emailId"
                              placeholder="Enter Email Address"
                              title="Enter Email Address"
                              type="text"
                              name="email"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircle sx={classes.whiteText}/>
                                  </InputAdornment>
                                ),
                              }}
                              autoComplete="off"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sx={classes.enrollFormContrl}
                          textAlign={"center"}
                        >
                          <Box maxWidth="75%" p={2}>
                            <Field
                              component={TextField}
                              id="password"
                              placeholder="Enter Password"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              fullWidth
                              autoComplete="off"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <VpnKey  sx={classes.whiteText}/>
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        handleClickShowPassword("showPassword")
                                      }
                                    >
                                      {showPassword ? (
                                        <Visibility color="primary" />
                                      ) : (
                                        <VisibilityOff color="primary" />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} textAlign={"center"}>
                          <Box maxWidth="75%" m={4}>
                            <Button
                              variant="outlined"
                              disabled={!isValid}
                              onClick={submitForm}
                              sx={classes.loginButton}
                            >
                              Sign-in
                            </Button>
                          </Box>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                  <Grid item xs={12}>
                    <Typography sx={classes.textWhite}>
                      New user,
                      <Typography
                        onClick={goToSignup}
                        sx={[classes.textWhite, classes.pointer]}
                      >
                        <u>Register here</u>
                      </Typography>
                    </Typography>
                  </Grid>
                </Fragment>
              ) : (
                <Grid item xs={12}>
                  {/* <Switch>
                      <Route
                        exact
                        path={`${this.props.match.path}${appRoutes.customerRegistration}`}
                        render={(props) => (
                          <SignUp
                            parentClasses={classes}
                            handleShowToast={this.props.handleShowToast}
                            backToLogin={this.comebackToLogin}
                          />
                        )}
                      />
                    </Switch> */}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {showLoader ? (
        <Grid container sx={classes.loader}>
          <Grid item xs={12}>
            <AppLoader />
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
  //   }
};

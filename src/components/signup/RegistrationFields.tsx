import React, { Fragment, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  Paper,
  createTheme,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ChevronRightOutlined,
  KeyboardBackspace,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import constants from "../../constants/validators";
import { TextField } from "formik-mui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { duplicateEmailAddressValidate } from "../../services/middleware";
import _ from "lodash";
import { validateEmail } from "../../utility/commonUtility";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
import { app } from "../../common/auth/firebase-init";
import { withStyles } from "@mui/styles";
import routes from "../../constants/routes";
import { useNavigate } from "react-router-dom";
const auth = getAuth(app);
const theme = createTheme();
const styles = (theme: any) => ({
  textWhite: {
    color: "#fff !important",
  },
  regPanel: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // "#00000870",
    borderRadius: 0,
    height: "100%",
    textAlign: "center",
    padding: theme.spacing(12),
  },
  displayCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottom: `1px solid '#ffffff'`,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
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
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "yellow",
      },
    },
  },
})(TextField);

export const RegistrationFieldsForm = (props: any) => {
  const classes = styles(theme);
  const state = {
    showLoader: false,
    isLogin: true,
    showPassword: false,
  };
  const { parentClasses, isValid, dirty } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  let navigate = useNavigate();

  const checkDuplicateEmailValidation = async (e: any) => {
    if (!_.isEmpty(e.target.value)) {
      const isEmail = validateEmail(e.target.value);
      if (isEmail) {
        fetchSignInMethodsForEmail(auth, e.target.value)
          .then((signInMethods) => {
            console.log("signinmethods", signInMethods);
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
          });

        // this.props.toggleLoader(true);
        await duplicateEmailAddressValidate(e.target.value)
          .then((res) => {
            if (res === constants.passed) {
              setErrMsg("");
            } else {
              setErrMsg("Email already exists");
            }
          })
          .catch((err) => console.log(err));
        // this.props.toggleLoader(false);
      }
    } else {
      setErrMsg("Email address cannot be empty");
    }
  };

  const handleClickShowPassword = (value: string) => {
    value === "showPassword" && setShowPassword(!showPassword);
    value === "showConfirmPassword" &&
      setShowConfirmPassword(!showConfirmPassword);
  };

  const initialValues: any = {
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values: any) => {
    props.customerRegistrationPost(values);
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(
        constants.fieldLengths.firstName,
        `First Name max length is ${constants.fieldLengths.firstName}`
      )
      .required("First name cannot be empty"),

    lastName: Yup.string()
      .max(
        constants.fieldLengths.lastName,
        `Last Name max length is ${constants.fieldLengths.lastName}`
      )
      .required("Last name cannot be empty"),

    mobile: Yup.string()
      .max(
        constants.fieldLengths.mobile,
        `Mobile max length is ${constants.fieldLengths.mobile}`
      )
      .matches(constants.regex.mobile, "Enter a valid Mobile number")
      .required("Mobile number cannot be empty"),

    email: Yup.string()
      .email("Not a valid email address")
      .required("Email address cannot be empty"),

    city: Yup.string().required("City cannot be empty"),

    password: Yup.string()
      .required("Password cannot be empty")
      .matches(constants.regex.password, "Enter a valid Password")
      .max(
        constants.fieldLengths.password,
        `Password max length is ${constants.fieldLengths.password}`
      ),

    confirmPassword: Yup.string()
      .required("Password cannot be empty")
      .matches(constants.regex.password, "Enter a valid Password")
      .oneOf([Yup.ref("password"), ""], "Passwords do not match")
      .max(
        constants.fieldLengths.password,
        `Password max length is ${constants.fieldLengths.password}`
      ),
  });

  const backToLogin = () => {
    let path = routes.login;
    navigate(path);
  };

  return (
    <Paper sx={classes.regPanel}>
      <Grid container sx={{ marginTop: "-65px" }}>
        <Grid item xs={12}>
          <Box width="75%" p={2}>
            <Grid container alignItems="center">
              <Grid item>
                <IconButton onClick={backToLogin}>
                  <KeyboardBackspace sx={classes.textWhite} fontSize="large" />
                </IconButton>
              </Grid>

              <Typography variant="h4" sx={classes.textWhite}>
                Register
              </Typography>
            </Grid>
          </Box>
          <Fragment>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {() => (
                <Form
                  noValidate
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box width="75%" p={2}>
                    <Field
                      required
                      type="text"
                      label={"Enter First Name"}
                      name="firstName"
                      component={CssTextField}
                      fullWidth
                      className={parentClasses.enrollFormContrl}
                      variant="outlined"
                    />
                  </Box>
                  <Box width="75%" p={2}>
                    <Field
                      required
                      type="text"
                      label={"Enter Last Name"}
                      name="lastName"
                      component={CssTextField}
                      fullWidth
                      className={parentClasses.enrollFormContrl}
                      variant="outlined"
                    />
                  </Box>
                  <Box width="75%" p={2}>
                    <Field
                      required
                      type="text"
                      name="mobile"
                      label={"Enter Mobile Number"}
                      component={CssTextField}
                      fullWidth
                      className={parentClasses.enrollFormContrl}
                      variant="outlined"
                    />
                  </Box>
                  <Box width="75%" p={2}>
                    <Field
                      required
                      type="text"
                      label={"Enter Email Address"}
                      name="email"
                      component={CssTextField}
                      fullWidth
                      className={parentClasses.enrollFormContrl}
                      variant="outlined"
                    />
                    <Typography color="error" variant="caption">
                      {errMsg}
                    </Typography>
                  </Box>
                  <Box width="75%" p={2}>
                    <Field
                      required
                      type="text"
                      label={"Enter City"}
                      name="city"
                      component={CssTextField}
                      fullWidth
                      className={parentClasses.enrollFormContrl}
                      variant="outlined"
                    />
                  </Box>
                  <Box width="75%" p={2}>
                    <Field
                      required
                      type={showPassword ? "text" : "password"}
                      label={"Enter Password"}
                      name="password"
                      component={CssTextField}
                      fullWidth
                      className={parentClasses.enrollFormContrl}
                      InputProps={{
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
                  <Box width="75%" p={2}>
                    <Field
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      label={"Confirm Password"}
                      name="confirmPassword"
                      component={CssTextField}
                      fullWidth
                      className={parentClasses.enrollFormContrl}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                handleClickShowPassword("showConfirmPassword")
                              }
                            >
                              {showConfirmPassword ? (
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
                  <Box mt={8}>
                    <Typography variant="caption" sx={parentClasses.whiteText}>
                      By creating an account you accept the Terms & Conditions
                    </Typography>
                    <Box mt={4}>
                      <Button
                        type="submit"
                        sx={parentClasses.loginButton}
                        // disabled={
                        //   (!isValid && dirty) ||
                        //   !_.isEmpty(errMsg) ||
                        //   (_.isEmpty(errMsg) && !dirty)
                        // }
                      >
                        Proceed
                        <ChevronRightOutlined />
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Fragment>
        </Grid>
      </Grid>
    </Paper>
  );
};

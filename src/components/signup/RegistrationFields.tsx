import React, { Component, useState } from "react";
import { Grid, Typography, Button, Box, IconButton } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ChevronRightOutlined,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import constants from "../../constants/validators";
import { TextField as FTextField } from "formik-mui";
import { Field, Form, Formik, useFormik, withFormik } from "formik";
import * as Yup from "yup";
import { duplicateEmailAddressValidate } from "../../services/middleware";
import _ from "lodash";
import { validateEmail } from "../../utility/commonUtility";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
import { app } from "../../common/auth/firebase-init";
const auth = getAuth(app);

export const RegistrationFieldsForm = (props: any) => {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     showPassword: false,
  //     showConfirmPassword: false,
  //     errMsg: "",
  //   };
  // }

  const state = {
    showLoader: false,
    isLogin: true,
    showPassword: false,
  };
  const { parentClasses, isValid, dirty } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form noValidate>
          <Box alignItems={"center"} justifyContent={"center"}>
            <Box mt={2} maxWidth="80%">
              <Grid container direction="column">
                <Grid item>
                  <Box minHeight="3rem" textAlign={"left"}>
                    <Field
                      required
                      type="text"
                      label={"Enter First Name"}
                      name="firstName"
                      component={FTextField}
                      fullWidth
                      className={parentClasses.enrollFormContrl}
                      variant="standard"
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box minHeight="3rem">
                    <Field
                      required
                      type="text"
                      label={"Enter Last Name"}
                      name="lastName"
                      component={FTextField}
                      fullWidth
                      className={parentClasses.enrollFormContrl}
                      variant="standard"
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box minHeight="3rem">
                    <Field
                      required
                      type="text"
                      name="mobile"
                      label={"Enter Mobile Number"}
                      component={FTextField}
                      fullWidth
                      className={parentClasses.enrollFormContrl}
                      variant="standard"
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box minHeight="3rem">
                    <Field
                      required
                      type="text"
                      label={"Enter Email Address"}
                      name="email"
                      component={FTextField}
                      fullWidth
                      // InputProps={{
                      //   onBlur: checkDuplicateEmailValidation,
                      // }}
                      className={parentClasses.enrollFormContrl}
                      variant="standard"
                    />
                    <Typography color="error" variant="caption">
                      {errMsg}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box minHeight="3rem" textAlign={"left"}>
                    <Field
                      required
                      type="text"
                      label={"Enter City"}
                      name="city"
                      component={FTextField}
                      fullWidth
                      className={parentClasses.enrollFormContrl}
                      variant="standard"
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box minHeight="3rem">
                    <Field
                      required
                      type={showPassword ? "text" : "password"}
                      label={"Enter Password"}
                      name="password"
                      component={FTextField}
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
                      variant="standard"
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box minHeight="3rem">
                    <Field
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      label={"Confirm Password"}
                      name="confirmPassword"
                      component={FTextField}
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
                      variant="standard"
                    />
                  </Box>
                </Grid>
                <Grid item>
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
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

// const RegistrationFields = withFormik({
//   mapPropsToValues(props) {
//     return {
//       props,
//       firstName: "",
//       lastName: "",
//       mobile: "",
//       email: "",
//       city: "",
//       password: "",
//       confirmPassword: "",
//     };
//   },
//   validateOnChange: true,
//   validateOnBlur: true,

//   validationSchema: Yup.object().shape({
//     firstName: Yup.string()
//       .max(
//         constants.fieldLengths.firstName,
//         `First Name max length is ${constants.fieldLengths.firstName}`
//       )
//       .required("First name cannot be empty"),

//     lastName: Yup.string()
//       .max(
//         constants.fieldLengths.lastName,
//         `Last Name max length is ${constants.fieldLengths.lastName}`
//       )
//       .required("Last name cannot be empty"),

//     mobile: Yup.string()
//       .max(
//         constants.fieldLengths.mobile,
//         `Mobile max length is ${constants.fieldLengths.mobile}`
//       )
//       .matches(constants.regex.mobile, "Enter a valid Mobile number")
//       .required("Mobile number cannot be empty"),

//     email: Yup.string()
//       .email("Not a valid email address")
//       .required("Email address cannot be empty"),

//     city: Yup.string().required("City cannot be empty"),

//     password: Yup.string()
//       .required("Password cannot be empty")
//       .matches(constants.regex.password, "Enter a valid Password")
//       .max(
//         constants.fieldLengths.password,
//         `Password max length is ${constants.fieldLengths.password}`
//       ),

//     confirmPassword: Yup.string()
//       .required("Password cannot be empty")
//       .matches(constants.regex.password, "Enter a valid Password")
//       .oneOf([Yup.ref("password"), ""], "Passwords do not match")
//       .max(
//         constants.fieldLengths.password,
//         `Password max length is ${constants.fieldLengths.password}`
//       ),
//   }),

//   handleSubmit: async (values, { props, setSubmitting }) => {
//     // props.toggleLoader(true);

//     const payload = {
//       firstName: _.get(values, "firstName"),
//       lastName: _.get(values, "lastName"),
//       mobile: _.get(values, "mobile"),
//       email: _.get(values, "email"),
//       city: _.get(values, "city"),
//       password: _.get(values, "password"),
//     };

//     // await props.customerRegistrationPost(payload);
//     // props.toggleLoader(false);
//     setSubmitting(false);
//   },
// })(RegistrationFieldsForm);

// export default RegistrationFields;

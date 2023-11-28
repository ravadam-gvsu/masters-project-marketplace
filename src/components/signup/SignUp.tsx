import React, { useState } from "react";
import { RegistrationFieldsForm } from "./RegistrationFields";
import { Grid, IconButton, Typography, createTheme } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import AppLoader from "../../common/components/AppLoader";
import { addUser, createAccount } from "../../services/firebaseapi";

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
    background: "url(assets/banner.png) 50% center / cover no-repeat fixed",
  },
  loginPanel: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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

function SignUp(props: any) {
  const { backToLogin } = props;
  const classes = styles(theme);
  const [loader, setLoader] = useState(false);

  const customerRegistrationPost = async (payload: any) => {
    setLoader(true);
    await createAccount(payload.email, payload.password).then(async (res: any) => {
      const user = await addUser(res.user.uid, payload);
      console.log("User registered", user);
    });
    setLoader(false);
  };

  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"center"}
      sx={classes.loginContainer}
    >
      {loader && <AppLoader />}
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton onClick={backToLogin}>
              <KeyboardBackspace sx={classes.textWhite} fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h4" sx={classes.textWhite}>
              Register
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <RegistrationFieldsForm
          customerRegistrationPost={customerRegistrationPost}
          parentClasses={classes}
        />
      </Grid>
    </Grid>
  );
}

export default SignUp;

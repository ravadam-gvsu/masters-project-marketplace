
import { createStyles } from "@mui/styles";


export const useStyles = () =>
  createStyles({
    loader: {
      position: "absolute",
      height: "100vh",
    },
    textWhite: {
      color: "#fff !important",
    },
    loginPanel: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // "#00000870",
      borderRadius: 0,
      height: "100%",
      textAlign: "center",
      padding: '12px'
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
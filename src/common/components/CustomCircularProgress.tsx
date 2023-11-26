import { CircularProgress, createTheme } from "@mui/material";

const theme = createTheme();
const styles = (theme: any) => ({
  buttonProgress: {
    position: "absolute",
    color: theme.palette.success.main,
  },
});

export const CustomCircularProgress = () => {
  const classes = styles(theme);
  return <CircularProgress size={24} sx={classes.buttonProgress} />;
};

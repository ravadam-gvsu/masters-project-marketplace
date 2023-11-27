import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Stack,
  IconButton,
  InputAdornment,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { Field, Form, Formik, useFormikContext } from "formik";
import { TextField as FTextField } from "formik-mui";
import { PhotoCamera } from "@mui/icons-material";
import { flushSync } from "react-dom";
import { addItem } from "../../redux/actions/product";
import dayjs from "dayjs";
import {
  IGMapsApiStatus,
  useScript,
} from "../../utility/externalScriptProvider";
import Map from "../../common/components/MapLocationPicker";
import { locationsMap, pickupLocations } from "./Constants";
import { useUIContext } from "../../common/context/context";
import product from "../../redux/reducers/product";
import { generateKey, saveItem, saveProduct } from "../../services/firebaseapi";

export const Profile = () => {
  const key: string = "AIzaSyD-xBLLTuMQU7LTtB9_q8kw5wtfVbEcnF8";
  const GMapsApiStatus: IGMapsApiStatus = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=Function.prototype`
  );
  const [open, setOpen] = useState(false);
  const { userDetails } = useUIContext();
  // const [mapDirections, setMapDirections] =
  //   useState<google.maps.DirectionsResult>();
  // const { isAuthenticating, profile } = useSelector((state: any) => {
  //   return {
  //     isAuthenticating: state.app.isAuthenticating,
  //     profile: state.profile,
  //   };
  // });

  const today = dayjs().format("MM/DD/YYYY");
  const yesterday = dayjs().subtract(1, "day");
  // const todayStartOfTheDay = today.startOf("day");
  // const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues: any = {
    productTitle: "",
    productImage: "",
    productDescription: "",
    // costPrice: "",
    sellingPrice: "",
    // dateOfPurchase: "",
    availabilityArea: {
      state: "",
      city: "",
    },
    // createdAt: "",
    // sellerDetails: "",
    sellerName: "",
    quantity: 1,
    // limit: "",
    status: "",
    coordinates: locationsMap[pickupLocations[1].location],
    date: "",
    itemName: "",
    picklocation: "",
    itemImage: "",
    description: "",
    category: "sell",
  };

  type formType = typeof initialValues;
  const RowRadioButtonsGroup = () => {
    const { handleChange, handleBlur, values, errors, touched } =
      useFormikContext<formType>();
    return (
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Category</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <FormControlLabel
            value="sell"
            control={<Radio />}
            label="Sell Product"
          />
          <FormControlLabel
            value="lostnfound"
            control={<Radio />}
            label="Report Lost & Found"
          />
        </RadioGroup>
      </FormControl>
    );
  };

  const handleSubmit = async (details: any, { setSubmitting }: any) => {
    const key = await generateKey();
    if (details.category === "sell") {
      const payload = {
        productTitle: details.productTitle,
        productImage: details.productImage,
        productImages: details.productImages,
        productDescription: details.productDescription,
        sellingPrice: details.sellingPrice,
        availabilityArea: {
          state: "",
          city: "",
        },
        sellerName: details.sellerName,
        quantity: details.quantity,
      };
      saveProduct(key, payload);
    } else {
      const payload = {
        status: details.status,
        // date: details.date,
        itemName: details.itemName,
        picklocation: details.picklocation,
        coordinates: locationsMap[details.picklocation],
        itemImage: details.itemImage,
        description: details.description,
        category: details.category,
      };
      saveItem(key, payload);
    }
  };

  const firstName = userDetails.user && userDetails.user["firstName"];
  const lastName = userDetails.user && userDetails.user["lastName"];
  const mobile = userDetails.user && userDetails.user["mobile"];
  const registeredEmailAddress = userDetails.user && userDetails.user["email"];
  const city = userDetails.user && userDetails.user["city"];

  return (
    <Box>
      <Grid item mt={3}>
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Box>
              <Grid container>
                <Grid item xs={6}>
                  <Avatar
                    variant="square"
                    style={{ height: "150px", width: "150px" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid item>
                    <Typography variant="h5" align="left">
                      Profile Details:
                    </Typography>
                  </Grid>
                  <br />
                  <Grid container direction="column" spacing={0}>
                    <Grid item>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">Full Name</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            {`: ${firstName} ${lastName}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            Mobile Number
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            {`: ${mobile}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            Registered Email Address
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            {`: ${registeredEmailAddress}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">City</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            {`: ${city}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={8}>
            {/* <Paper> */}
            <Grid
              container
              style={{ alignItems: "center", justifyContent: "space-around" }}
            >
              <Grid item>
                <Typography variant="button">
                  Would you like to post an ad of your product?
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleOpen}
                >
                  Post Ad!
                </Button>
              </Grid>
            </Grid>
            {/* </Paper> */}
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({
            setFieldValue,
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
          }) => (
            <Form autoComplete="off">
              <DialogTitle>Post a Product</DialogTitle>
              <DialogContent>
                <DialogContentText></DialogContentText>
                <RowRadioButtonsGroup />
                {values.category && values.category === "sell" ? (
                  <>
                    <Field
                      component={FTextField}
                      autoFocus
                      margin="dense"
                      id="productTitle"
                      name="productTitle"
                      label="Product Title"
                      variant="outlined"
                      fullWidth
                    />
                    <Field hidden name="productImages" />
                    <Field
                      component={FTextField}
                      autoFocus
                      margin="dense"
                      name="productImage"
                      label="Product Image"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="label"
                            >
                              <input
                                hidden
                                accept="image/*"
                                type="file"
                                multiple
                                onChange={(e) =>
                                  flushSync(() => {
                                    setFieldValue(
                                      "productImage",
                                      e.target.value
                                    );
                                    setFieldValue(
                                      "productImages",
                                      e.target.files
                                    );
                                  })
                                }
                              />
                              <PhotoCamera />
                            </IconButton>
                          </Stack>
                        ),
                      }}
                    />
                    <Field
                      component={FTextField}
                      autoFocus
                      margin="dense"
                      id="productDescription"
                      name="productDescription"
                      label="Product Description"
                      variant="outlined"
                      fullWidth
                    />
                    <Field
                      component={FTextField}
                      autoFocus
                      margin="dense"
                      id="itemPrice"
                      name="itemPrice"
                      label="Item Price"
                      type="number"
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                    <Field
                      component={FTextField}
                      autoFocus
                      margin="dense"
                      id="sellingPrice"
                      name="sellingPrice"
                      label="Selling Price"
                      type="number"
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                    <Field
                      component={FTextField}
                      autoFocus
                      margin="dense"
                      id="sellerDetails"
                      name="sellerDetails"
                      label="Seller Details"
                      fullWidth
                      variant="outlined"
                    />
                    <Field
                      component={FTextField}
                      autoFocus
                      margin="dense"
                      id="sellerName"
                      name="sellerName"
                      label="Seller Name"
                      fullWidth
                      variant="outlined"
                    />
                    <Field
                      component={FTextField}
                      autoFocus
                      margin="dense"
                      id="quantity"
                      name="quantity"
                      label="Quantity"
                      fullWidth
                      variant="outlined"
                    />
                  </>
                ) : (
                  <>
                    <FormControl
                      fullWidth
                      sx={{ marginTop: "8px", marginBottom: "4px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        label="Status"
                        name="status"
                        variant="outlined"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.suffix && Boolean(errors.suffix)}
                      >
                        {[
                          { label: "Lost", value: "lost" },
                          { label: "Found", value: "found" },
                        ].map((suffix, i) => (
                          <MenuItem key={i} value={suffix.value}>
                            {suffix.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Field
                      component={FTextField}
                      autoFocus
                      margin="dense"
                      id="itemName"
                      name="itemName"
                      label="Item Name"
                      variant="outlined"
                      fullWidth
                    />
                    <FormControl
                      fullWidth
                      sx={{ marginTop: "8px", marginBottom: "4px" }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          defaultValue={today}
                          disablePast
                          views={["year", "month", "day"]}
                          value={values.date}
                          onChange={(value) =>
                            setFieldValue("date", value, true)
                          }
                        />
                      </LocalizationProvider>
                    </FormControl>
                    <FormControl
                      fullWidth
                      sx={{ marginTop: "8px", marginBottom: "4px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Pickup Location
                      </InputLabel>
                      <Select
                        label="Pickup Location"
                        name="picklocation"
                        variant="outlined"
                        value={values.picklocation}
                        onChange={(e: any) => {
                          setFieldValue("coordinates", locationsMap[e]);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        error={touched.suffix && Boolean(errors.suffix)}
                      >
                        {pickupLocations.map((suffix, i) => (
                          <MenuItem key={i} value={suffix.location}>
                            {suffix.location}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Map
                      gMapsApiStatus={GMapsApiStatus.status === "ready"}
                      mapDirections={values.coordinates}
                    />
                    <Field hidden name="itemImages" />
                    <Field
                      component={FTextField}
                      autoFocus
                      margin="dense"
                      name="itemImage"
                      label="Item Image(s)"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="label"
                            >
                              <input
                                hidden
                                accept="image/*"
                                type="file"
                                multiple
                                onChange={(e) =>
                                  flushSync(() => {
                                    setFieldValue("itemImage", e.target.value);
                                    setFieldValue("itemImages", e.target.files);
                                  })
                                }
                              />
                              <PhotoCamera />
                            </IconButton>
                          </Stack>
                        ),
                      }}
                    />
                    <Field
                      component={FTextField}
                      autoFocus
                      margin="dense"
                      id="description"
                      name="description"
                      label="Description"
                      variant="outlined"
                      fullWidth
                    />
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleClose}>
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default Profile;

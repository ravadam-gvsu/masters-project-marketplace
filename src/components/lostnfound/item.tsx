// import React, { useEffect, useState } from "react";
// import { Box, Grid, Typography } from "@mui/material";
// // import { ProductCard } from "../../../../common/components/ProductCard";
// import AppLoader from "../../common/components/AppLoader";
// import { getItems } from "../../services/firebaseapi";
// import { useUIContext } from "../../hooks/context";
// import { ItemCard } from "./itemsCard";

// export const Item = () => {
//   const { itemsCollection, setItems } = useUIContext();
//   const [loader, setLoader] = useState(false);

//   useEffect(() => {
//     if (!itemsCollection.lastRefKey) {
//       fetchItems();
//       console.log("items fetched", itemsCollection);
//     }

//     window.scrollTo(0, 0);
//     setLoader(false);
//   }, []);

//   const fetchItems = async () => {
//     setLoader(true);
//     const res: any = await getItems();
//     setItems(res);
//     setLoader(false);
//   };

//   return (
//     <Box mt={3}>
//       <Grid container direction="column" alignItems="center" spacing={6}>
//         <Grid item xs={10}>
//           <Grid container spacing={4}>
//             {itemsCollection.total &&
//               itemsCollection.items.map((item: any, index: string) => {
//                 return (
//                   <Grid item key={"pc" + index}>
//                     <ItemCard key={"pc" + index} item={item} />
//                   </Grid>
//                 );
//               })}
//           </Grid>
//         </Grid>
//       </Grid>
//       {loader && <AppLoader />}
//     </Box>
//   );
// };

import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useUIContext } from "../../hooks/context";
import { useEffect, useState } from "react";
import { getItems } from "../../services/firebaseapi";
import { Grid } from "@mui/material";
import { ItemCard } from "./itemsCard";
import AppLoader from "../../common/components/AppLoader";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const Item = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const { itemsCollection, setItems } = useUIContext();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!itemsCollection.lastRefKey) {
      fetchItems();
      console.log("items fetched", itemsCollection);
    }

    window.scrollTo(0, 0);
    setLoader(false);
  }, []);

  const fetchItems = async () => {
    setLoader(true);
    const res: any = await getItems();
    setItems(res);
    setLoader(false);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", alignItems: "center", display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <AppBar position="static" style={{width: "50%"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Lost Items" {...a11yProps(0)} />
          <Tab label="Found Items" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box mt={3}>
            <Grid container direction="column" alignItems="center" spacing={6}>
              <Grid item xs={10}>
                <Grid container spacing={4}>
                  {itemsCollection.total &&
                    itemsCollection.items
                      .filter((item) => item.status === "lost")
                      .map((item: any, index: string) => {
                        return (
                          <Grid item key={"pc" + index}>
                            <ItemCard key={"pc" + index} item={item} />
                          </Grid>
                        );
                      })}
                </Grid>
              </Grid>
            </Grid>
            {loader && <AppLoader />}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box mt={3}>
            <Grid container direction="column" alignItems="center" spacing={6}>
              <Grid item xs={10}>
                <Grid container spacing={4}>
                  {itemsCollection.total &&
                    itemsCollection.items
                      .filter((item) => item.status === "found")
                      .map((item: any, index: string) => {
                        return (
                          <Grid item key={"pc" + index}>
                            <ItemCard key={"pc" + index} item={item} />
                          </Grid>
                        );
                      })}
                </Grid>
              </Grid>
            </Grid>
            {loader && <AppLoader />}
          </Box>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
};

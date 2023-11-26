
export const pickupLocations = [
  {
    location: "Kirkhof Center (KC)",
    latitude: 42.9627322,
    longitude: -85.8885661766,
  },
  {
    location: "Mackinac Hall (MAK)",
    latitude: 42.966662,
    longitude: -85.8868928186,
  },
];

export const locationsMap: any = pickupLocations.reduce((acc, val) => {
  const { location, ...latlong } = val;
  acc[location] = latlong;
  return acc;
}, {});


// export const useStyles = makeStyles((theme: any) => ({
//   borderBox: {
//     borderBlock: "1px solid black",
//   },
//   paperPadding: {
//     padding: 24,
//     borderRadius: 16,
//   },
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paperOutline: {
//     outline: "none",
//     padding: 24,
//     width: 680,
//     height: 400,
//   },
// }));

// export const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };
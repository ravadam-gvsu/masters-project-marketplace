import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { Skeleton } from "@mui/material";
import { useState } from "react";

interface Props {
  gMapsApiStatus: boolean;
  mapDirections: google.maps.DirectionsResult | undefined;
}

const containerStyle = {
  width: "100%",
  height: "350px",
};

const Map = ({ gMapsApiStatus, mapDirections }: any) => {
//   const originalCenter = {
//       lat: 51.5287718,
//       lng: -0.2416822
//   };
  const [originalCenter] = useState({
    lat: mapDirections?.latitude,
    lng: mapDirections?.longitude,
  });
  return (
    <>
      {gMapsApiStatus ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={originalCenter}
          zoom={18}
        >
            <Marker position={originalCenter} />
        </GoogleMap>
      ) : (
        <Skeleton height={300} />
      )}
    </>
  );
};

export default Map;

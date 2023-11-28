import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import Routes from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { UIProvider } from "./hooks/context";
import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";
import { SnackBarProvider } from "./common/components/SnackBarProvider";

// function App({ store, persistor }: any) {
//   return (
//     <BrowserRouter>
//       <Provider store={store}>
//         <UIProvider>
//           <PersistGate persistor={persistor}>
//             <CssBaseline />
//             <Routes />
//           </PersistGate>
//         </UIProvider>
//       </Provider>
//     </BrowserRouter>
//   );
// }

const App = () => (
  <StrictMode>
    <SnackBarProvider>
      <UIProvider>
        <CssBaseline />
        <Routes />
      </UIProvider>
    </SnackBarProvider>
  </StrictMode>
);

export default App;

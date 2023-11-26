import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import Routes from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { UIProvider } from "./common/context/context";
import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";

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

const App = ({ store, persistor }) => (
  <StrictMode>
    <Provider store={store}>
      <UIProvider>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </UIProvider>
    </Provider>
  </StrictMode>
);

export default App;

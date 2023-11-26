import React from "react";
import { render } from "react-dom";
import configureStore from "./redux/store/store";
import {
  onAuthStateFail,
  onAuthStateSuccess,
} from "./redux/actions/auth";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { auth } from "./services/firebaseapi";

const { store, persistor } = configureStore();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// render(<Preloader />, root);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(onAuthStateSuccess(user));
  } else {
    store.dispatch(onAuthStateFail("Failed to authenticate"));
  }
  // then render the app after checking the auth state
  root.render(<App store={store} persistor={persistor} />);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

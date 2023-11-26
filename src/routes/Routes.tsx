import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/login/Login";
import { ProductDetails } from "../components/dashboard/components/product/ProductDetails";
import routes from "../constants/routes";
import SignUp from "../components/signup/SignUp";
import Profile from "../components/profile";
import LayoutPage from "../pages/Layout";
import CheckoutSuccess from "../components/cart/CheckoutSuccess";
import Product from "../views/products";
import { Dashboard } from "../components/dashboard/Dashboard";

const Router = () => (
  <BrowserRouter>
    <>
      <Routes>
        <Route path="/" element={<LayoutPage />} >
          <Route index element={<Dashboard />} />
          <Route path={routes.home.baseurl} element={<Dashboard />} />,
          <Route path={routes.checkoutSuccess} element={<CheckoutSuccess />} />
          <Route path={routes.product} element={<Product />} />
          <Route path={routes.viewProduct} element={<ProductDetails />} />
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.lostnfound} element={<Profile />} />
        </Route>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.customerRegistration} element={<SignUp />} />
      </Routes>
    </>
  </BrowserRouter>
);

export default Router;

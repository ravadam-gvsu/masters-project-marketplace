import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/login/Login";
import { ProductDetails } from "../components/dashboard/components/product/ProductDetails";
import routes from "../constants/routes";
import SignUp from "../components/signup/SignUp";
import Profile from "../components/profile";
import LayoutPage from "../pages/Layout";
import CheckoutSuccess from "../components/cart/CheckoutSuccess";
import { Dashboard } from "../components/dashboard/Dashboard";
import { Item } from "../components/lostnfound/item";
import ConversationPage from "../components/lostnfound/chats/conversations";

const Router = () => (
  <BrowserRouter>
    <>
      <Routes>
        <Route path="/" element={<LayoutPage />} >
          <Route index element={<Dashboard />} />
          <Route path={routes.home} element={<Dashboard />} />,
          <Route path={routes.checkoutSuccess} element={<CheckoutSuccess />} />
          <Route path={routes.product} element={<Dashboard />} />
          <Route path={routes.viewProduct} element={<ProductDetails />} />
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.lostnfound} element={<Item />} />
          <Route path="/conversation/:itemOwnerId" element={<ConversationPage />}
        />
        </Route>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.customerRegistration} element={<SignUp />} />
      </Routes>
    </>
  </BrowserRouter>
);

export default Router;

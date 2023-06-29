import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignInCard from "../pages/login/signin/SignInCard";
import SignUpCard from "../pages/login/signup/SignUpCard";
import ForgotPasswordCard from "../pages/login/forgot-password/ForgotPasswordCard";
import EmailCodeCard from "../pages/login/forgot-password/email-code/EmailCodeCard";
import ResetPasswordCard from "../pages/login/forgot-password/reset-password/ResetPasswordCard";
import DashboardCard from "../pages/dashboard/DashboardCard";
import ProfileCard from "../pages/profile/ProfileCard";
import ProductCard from "../pages/products/ProductCard";
import MovimentCard from "../pages/stock/moviments/MovimentCard";
import SuplierCard from "../pages/supliers/SuplierCard";
import BodyLayout from "../layouts/body/BodyLayout";
import PrivateRoute from "./PrivateRoute";
import SettingsCard from "../pages/settings/SettingsCard";
import NotFound from "../pages/not-found/NotFound";
import ProductMovimentation from "../pages/products/movimentation/ProductMovimentation";

import PurchaseOrderFormCard from "../pages/purchase-order/registration/PurchaseOrderFormCard"

function RouteController(props) {
  const [isSomeLogin, setIsSomeLogin] = useState(true);

  useEffect(() => {
    setIsSomeLogin(
      window.location.pathname.includes("/login") ||
        window.location.pathname === "/" ||
        window.location.pathname === "/404"
    );
  });

  return isSomeLogin ? (
    props.children
  ) : (
    <PrivateRoute>
      <BodyLayout>{props.children}</BodyLayout>
    </PrivateRoute>
  );
}

function RoutesConfiguration() {
  return (
    <Router>
      <Routes>
        <Route
          path="/404"
          element={
            <RouteController>
              <NotFound />
            </RouteController>
          }
        />
        <Route
          path="/"
          element={
            <RouteController>
              <SignInCard />
            </RouteController>
          }
        />
        <Route
          path="/login/signin"
          element={
            <RouteController>
              <SignInCard />
            </RouteController>
          }
        />
        <Route
          path="/login/signup"
          element={
            <RouteController>
              <SignUpCard />
            </RouteController>
          }
        />
        <Route
          path="/login/forgotmypassword"
          element={
            <RouteController>
              <ForgotPasswordCard />
            </RouteController>
          }
        />
        <Route
          path="/login/emailCodeResetPassword/:accountId"
          element={
            <RouteController>
              <EmailCodeCard />
            </RouteController>
          }
        />
        <Route
          path="/login/resetPassword/:accountId"
          element={
            <RouteController>
              <ResetPasswordCard />
            </RouteController>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RouteController>
              <DashboardCard />
            </RouteController>
          }
        />
        <Route
          path="/profile"
          element={
            <RouteController>
              <ProfileCard />
            </RouteController>
          }
        />
        <Route
          path="/purchaseOrder/registration"
          element={
            <RouteController>
              <PurchaseOrderFormCard></PurchaseOrderFormCard>
            </RouteController>
          }
        />
        <Route
          path="/products/registration"
          element={
            <RouteController>
              <ProductCard />
            </RouteController>
          }
        />
        <Route
          path="/stock/moviments"
          element={
            <RouteController>
              <MovimentCard />
            </RouteController>
          }
        />
        <Route
          path="/stock/moveProduct"
          element={
            <RouteController>
              <ProductMovimentation />
            </RouteController>
          }
        />
        <Route
          path="/providers/registration"
          element={
            <RouteController>
              <SuplierCard />
            </RouteController>
          }
        />
        <Route
          path="/configuracoes"
          element={
            <RouteController>
              <SettingsCard />
            </RouteController>
          }
        />
      </Routes>
    </Router>
  );
}

export default RoutesConfiguration;

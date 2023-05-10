import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignInCard from "../pages/login/signin/SignInCard";
import SignUpCard from "../pages/login/signin/SignUpCard";
import ForgotPasswordCard from "../pages/login/forgot-password/ForgotPasswordCard";
import EmailCodeCard from "../pages/login/forgot-password/email-code/EmailCodeCard";
import ResetPasswordCard from "../pages/login/forgot-password/reset-password/ResetPasswordCard";

import DashboardCard from "../pages/dashboard/DashboardCard";

import ProfileCard from "../pages/profile/ProfileCard";

import ProductRegistrationCard from "../pages/products/registration/ProductFormCard";
import ProductVisualizationCard from "../pages/products/views/ProductListCard";

import BrandFormCard from "../pages/brands/registration/BrandFormCard";
import BrandListCard from "../pages/brands/views/BrandListCard";

import MovimentCard from "../pages/stock/moviments/MovimentCard";

import ProviderRegistrationCard from "../pages/providers/registration/ProviderFormCard";
import ProviderList from "../pages/providers/views/ProviderListCard";

import BodyLayout from "../layouts/body/BodyLayout";
import PrivateRoute from "./PrivateRoute";

import ButtonScroll from "../components/ui/buttons/scroll/ButtonScroll";

function RouteController(props) {
  const [isSomeLogin, setIsSomeLogin] = useState(true);

  useEffect(() => {
    setIsSomeLogin(
      window.location.pathname.includes("/login") ||
        window.location.pathname === "/"
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
          path="/products/registration"
          element={
            <RouteController>
              <ProductRegistrationCard />
            </RouteController>
          }
        />
        <Route
          path="/products/visualization"
          element={
            <RouteController>
              <ProductVisualizationCard />
            </RouteController>
          }
        />
        <Route
          path="/brands/registration"
          element={
            <RouteController>
              <BrandFormCard />
            </RouteController>
          }
        />
        <Route
          path="/brands/visualization"
          element={
            <RouteController>
              <BrandListCard />
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
          path="/providers/registration"
          element={
            <RouteController>
              <ProviderRegistrationCard />
            </RouteController>
          }
        />
        <Route
          path="/providers/visualization"
          element={
            <RouteController>
              <ProviderList />
            </RouteController>
          }
        />
      </Routes>
      <ButtonScroll />
    </Router>
  );
}

export default RoutesConfiguration;

/* eslint-disable react-hooks/exhaustive-deps */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignInCard from "../pages/login/signin/SignInCard";
import DashboardCard from "../pages/dashboard/DashboardCard";
import ProfileCard from "../pages/profile/ProfileCard";
import ProductCard from "../pages/products/ProductCard";
import SupplierCard from "../pages/suppliers/SupplierCard";
import BodyLayout from "../layouts/body/BodyLayout";
import PrivateRoute from "./PrivateRoute";
import SettingsCard from "../pages/settings/SettingsCard";
import NotFound from "../pages/not-found/NotFound";
import NotAuthorized from "../pages/not-found/NotAuthorized";
import ProductEntryMovimentation from "../pages/movimentation/exit/ProductEntryMovimentation";
import ManufacturerCard from "../pages/manufacturers/ManufacturerCard";
import PurchaseOrderFormCard from "../pages/purchase-order/register/PurchaseOrderFormCard";
import WarehouseCard from "../pages/warehouses/WarehouseCard";
import { roles } from "../utils/constants/constants";

function RouteController({ children, allowedRoles }) {
  if (
    window.location.pathname.includes("/login") ||
    window.location.pathname === "/" ||
    window.location.pathname === "/404"
  ) {
    return children;
  }

  return (
    <PrivateRoute roles={allowedRoles}>
      <BodyLayout>{children}</BodyLayout>
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
          path="/401"
          element={
            <RouteController>
              <NotAuthorized />
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
            <RouteController
              allowedRoles={[roles.Manager, roles.PurchasingManager]}
            >
              <PurchaseOrderFormCard />
            </RouteController>
          }
        />
        <Route
          path="/products"
          element={
            <RouteController>
              <ProductCard />
            </RouteController>
          }
        />
        <Route
          path="/moviments/entry"
          element={
            <RouteController
              allowedRoles={[roles.Manager, roles.WarehouseOperator]}
            >
              <ProductEntryMovimentation />
            </RouteController>
          }
        />
        <Route
          path="/manufacturers"
          element={
            <RouteController>
              <ManufacturerCard />
            </RouteController>
          }
        />
        <Route
          path="/suppliers"
          element={
            <RouteController>
              <SupplierCard />
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
        <Route
          path="/warehouses"
          element={
            <RouteController allowedRoles={[roles.Manager]}>
              <WarehouseCard />
            </RouteController>
          }
        />
      </Routes>
    </Router>
  );
}

export default RoutesConfiguration;

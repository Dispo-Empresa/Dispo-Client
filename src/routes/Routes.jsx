/* eslint-disable react-hooks/exhaustive-deps */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignInCard from "../pages/login/signin/SignInCard";
import DashboardCard from "../pages/dashboard/DashboardCard";
import ProfileCard from "../pages/profile/ProfileCard";
import ProductCard from "../pages/products/ProductCard";
import MovimentCard from "../pages/stock/moviments/MovimentCard";
import SupplierCard from "../pages/suppliers/SupplierCard";
import BodyLayout from "../layouts/body/BodyLayout";
import PrivateRoute from "./PrivateRoute";
import SettingsCard from "../pages/settings/SettingsCard";
import NotFound from "../pages/not-found/NotFound";
import NotAuthorized from "../pages/not-found/NotAuthorized";
import ProductMovimentation from "../pages/stock/movimentation/ProductMovimentation";
import ManufacturerCard from "../pages/manufacturers/ManufacturerCard";
import PurchaseOrderFormCard from "../pages/purchase-order/register/PurchaseOrderFormCard";
import { roles } from "../utils/constants/constants";
import WarehouseRegisterCard from "../pages/warehouses/register/WarehouseRegisterCard";
import WarehouseCard from "../pages/warehouses/WarehouseCard";

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
          path="/stock/moviments"
          element={
            <RouteController
              allowedRoles={[roles.Manager, roles.WarehouseOperator]}
            >
              <MovimentCard />
            </RouteController>
          }
        />
        <Route
          path="/stock/moveProduct"
          element={
            <RouteController
              allowedRoles={[roles.Manager, roles.WarehouseOperator]}
            >
              <ProductMovimentation />
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
            <RouteController
              // allowedRoles={[roles.Manager, roles.WarehouseOperator, roles.PurchasingManager]}
            >
              <WarehouseCard />
            </RouteController>
          }
        />
      </Routes>
    </Router>
  );
}

export default RoutesConfiguration;

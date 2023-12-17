/* eslint-disable react-hooks/exhaustive-deps */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignInCard from "pages/login/signin/SignInCard";
import DashboardCard from "pages/dashboard/DashboardCard";
import ProfileCard from "pages/profile/ProfileCard";
import ProductCard from "pages/products/ProductCard";
import SupplierCard from "pages/suppliers/SupplierCard";
import BodyLayout from "layouts/body/BodyLayout";
import PrivateRoute from "./PrivateRoute";
import SettingsCard from "pages/settings/SettingsCard";
import NotFound from "pages/not-found/NotFound";
import NotAuthorized from "pages/not-found/NotAuthorized";
import ProductEntryMovimentation from "pages/movimentation/entry/ProductEntryMovimentation";
import ProductExitMovimentation from "pages/movimentation/exit/ProductExitMovimentation";
import ManufacturerCard from "pages/manufacturers/ManufacturerCard";
import PurchaseOrderCard from "pages/purchase-order/PurchaseOrderCard";
import PurchaseOrderAttachmentFormCard from "pages/purchase-order/attachment/PurchaseOrderAttachmentFormCard";
import WarehouseCard from "pages/warehouses/WarehouseCard";
import ForgotpasswordCard from "pages/login/forgot-password/ForgotPasswordCard";
import { roles } from "utils/constants/constants";

function RouteController({ children, allowedRoles, hideNavigatorOnRoute }) {
  if (
    window.location.pathname.includes("/login") ||
    window.location.pathname === "/" ||
    window.location.pathname === "/404" ||
    window.location.pathname === "/401"
  ) {
    return children;
  }

  return (
    <PrivateRoute roles={allowedRoles}>
      <BodyLayout hideNavigator={hideNavigatorOnRoute}>{children}</BodyLayout>
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
          path="/login/forgotmypassword"
          element={
            <RouteController>
              <ForgotpasswordCard />
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
          path="/perfil"
          element={
            <RouteController>
              <ProfileCard />
            </RouteController>
          }
        />
        <Route
          path="/ordem-de-compra/cadastrar"
          element={
            <RouteController
              allowedRoles={[roles.Manager, roles.PurchasingManager]}
            >
              <PurchaseOrderCard />
            </RouteController>
          }
        />
        <Route
          path="/ordem-de-compra/anexos"
          element={
            <RouteController
              allowedRoles={[roles.Manager, roles.PurchasingManager]}
            >
              <PurchaseOrderAttachmentFormCard />
            </RouteController>
          }
        />
        <Route
          path="/produtos"
          element={
            <RouteController>
              <ProductCard />
            </RouteController>
          }
        />
        <Route
          path="/movimentacoes/entrada"
          element={
            <RouteController
              allowedRoles={[roles.Manager, roles.WarehouseOperator]}
            >
              <ProductEntryMovimentation />
            </RouteController>
          }
        />
        <Route
          path="/movimentacoes/saida"
          element={
            <RouteController
              allowedRoles={[roles.Manager, roles.WarehouseOperator]}
            >
              <ProductExitMovimentation />
            </RouteController>
          }
        />
        <Route
          path="/fabricantes"
          element={
            <RouteController>
              <ManufacturerCard />
            </RouteController>
          }
        />
        <Route
          path="/fornecedores"
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
          path="/depositos"
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

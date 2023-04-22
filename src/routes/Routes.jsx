import { useState, useEffect } from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import SignInCard from "../pages/login/signin/SignIn"
import SignUpCard from "../pages/login/signin/SignIn"
import ForgotPassword from "../pages/login/forgot-password/ForgotPassword"
import EmailCodeResetPassword from "../pages/login/forgot-password/email-code/EmailCodeResetPassword"
import ResetPasswordCard from "../pages/login/forgot-password/reset-password/ResetPassword"
import Dashboard from "../pages/dashboard/Dashboard"
import Profile from "../pages/profile/Profile"
import ProductRegistrationCard from "../pages/products/registration/ProductForm"
import ProductVisualizationCard from "../pages/products/views/ProductList"
import BrandRegistrationCard from "../pages/brands/registration/BrandForm"
import BrandVisualizationCard from "../pages/brands/views/BrandList"
import MovimentCard from "../pages/stock/moviments/Moviment"
import ProviderRegistrationCard from "../pages/providers/registration/ProviderForm"
import ProviderVisualizationCard from "../pages/providers/views/ProviderList"
import MainLayout from "../layouts/page/MainLayout"
import { PrivateRoute } from "./PrivateRoute"

function RouteController(props) {
    const [isSomeLogin, setIsSomeLogin] = useState(true);

    useEffect(() => {
        setIsSomeLogin((window.location.pathname.includes("/login")) || window.location.pathname === "/")
    }, []);
    
    return (
          isSomeLogin 
        ? 
          props.children
        : 
          <PrivateRoute>
              <MainLayout>
                  {props.children}
              </MainLayout>
          </PrivateRoute>
    );
};

function RoutesConfiguration() {

    return (
        <Router>
            <Routes>
                <Route 
                  path='/' 
                  element={
                    <RouteController>
                      <SignInCard />
                    </RouteController>
                  }
                />
                <Route 
                  path='/login/signin' 
                  element={
                    <RouteController>
                      <SignInCard />
                    </RouteController>
                  }
                />
                <Route 
                  path='/login/signup' 
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
                      <ForgotPassword />
                    </RouteController>
                  } 
                />
                <Route 
                  path="/login/emailCodeResetPassword/:accountId"
                  element={
                    <RouteController>
                      <EmailCodeResetPassword />
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
                  path="/home"
                  element={
                    <RouteController>
                      <Dashboard />
                    </RouteController>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <RouteController>
                      <Profile />
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
                      <BrandRegistrationCard />
                    </RouteController>
                  }
                />
                <Route
                  path="/brands/visualization"
                  element={
                    <RouteController>
                      <BrandVisualizationCard />
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
                      <ProviderVisualizationCard />
                    </RouteController>
                  }
                />
          </Routes>
        </Router>
    );
}

export default RoutesConfiguration;
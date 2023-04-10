import SignInCard from "../pages/Login/SignIn/SignInCard"
import SignUpCard from "../pages/Login/SignUp/SignUpCard"
import ForgotMyPasswordCard from "../pages/Login/ForgotPassword/ForgotMyPasswordCard"
import EmailCodeResetPassword from "../pages/Login/ForgotPassword/EmailCode/EmailCodeResetPassword"
import ResetPasswordCard from "../pages/Login/ForgotPassword/ResetPassword/ResetPasswordCard"
import Home from "../pages/Home/Home"
import Profile from "../pages/Profile/Profile"
import ProductRegistrationCard from "../pages/Products/Register/ProductRegistrationCard"
import ProductVisualizationCard from "../pages/Products/Visualization/ProductVisualizationCard"
import BrandRegistrationCard from "../pages/Brands/Register/BrandRegistrationCard"
import BrandVisualizationCard from "../pages/Brands/Visualization/BrandVisualizationCard"
import MovimentCard from "../pages/Stock/Moviments/MovimentCard"
import ProviderRegistrationCard from "../pages/Providers/Register/ProviderRegistrationCard"
import ProviderVisualizationCard from "../pages/Providers/Visualization/ProviderVisualizationCard"
import MainClient from "../components/Structured/Layouts/Client/MainClient"

import { BrowserRouter, Route, Routes  } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute"
import { useState, useEffect } from "react"

export default function GetRoutes() {

  return (
    <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={
              <ElementRouteController>
                <SignInCard />
              </ElementRouteController>
            }
          />
          <Route 
            path='/login/signin' 
            element={
              <ElementRouteController>
                <SignInCard />
              </ElementRouteController>
            }
          />
          <Route 
            path='/login/signup' 
            element={
              <ElementRouteController>
                <SignUpCard />
              </ElementRouteController>
            } 
          />
          <Route 
            path="/login/forgotmypassword"
            element={
              <ElementRouteController>
                <ForgotMyPasswordCard />
              </ElementRouteController>
            } 
          />
          <Route 
            path="/login/emailCodeResetPassword/:accountId"
            element={
              <ElementRouteController>
                <EmailCodeResetPassword />
              </ElementRouteController>
            }  
          />
          <Route 
            path="/login/resetPassword/:accountId" 
            element={
              <ElementRouteController>
                <ResetPasswordCard />
              </ElementRouteController>
            }
          />
          <Route
            path="/home"
            element={
              <ElementRouteController>
                <Home />
              </ElementRouteController>
            }
            />
          <Route
            path="/profile"
            element={
              <ElementRouteController>
                <Profile />
              </ElementRouteController>
            }
            />
          <Route
            path="/products/registration"
            element={
              <ElementRouteController>
                <ProductRegistrationCard />
              </ElementRouteController>
            }
            />
          <Route
            path="/products/visualization"
            element={
              <ElementRouteController>
                <ProductVisualizationCard />
              </ElementRouteController>
            }
            />
          <Route
            path="/brands/registration"
            element={
              <ElementRouteController>
                <BrandRegistrationCard />
              </ElementRouteController>
            }
            />
          <Route
            path="/brands/visualization"
            element={
              <ElementRouteController>
                <BrandVisualizationCard />
              </ElementRouteController>
            }
            />
          <Route
            path="/stock/moviments"
            element={
              <ElementRouteController>
                <MovimentCard />
              </ElementRouteController>
            }
            />
          <Route
            path="/providers/registration"
            element={
              <ElementRouteController>
                <ProviderRegistrationCard />
              </ElementRouteController>
            }
            />
          <Route
            path="/providers/visualization"
            element={
              <ElementRouteController>
                <ProviderVisualizationCard />
              </ElementRouteController>
            }
          />
      </Routes>
    </BrowserRouter>
  );
}

function ElementRouteController(props) {
  const [isSomeLogin, setIsSomeLogin] = useState(true);

    useEffect(() => {
      setIsSomeLogin((window.location.pathname.includes("/login")) || window.location.pathname == "/")
    });
    
    return (
      isSomeLogin 
      ? 
        props.children
      : 
        <PrivateRoute>
          <MainClient>
            {props.children}
          </MainClient>
        </PrivateRoute>
    );
};
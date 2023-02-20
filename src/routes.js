import App from "./App"
import SignInCard from "./pages/Login/SignIn/SignInCard"
import SignUpCard from "./pages/Login/SignUp/SignUpCard"
import ForgotMyPasswordCard from "./pages/Login/ForgotPassword/ForgotMyPasswordCard"
import EmailCodeResetPassword from "./pages/Login/ForgotPassword/EmailCode/EmailCodeResetPassword"
import ResetPasswordCard from "./pages/Login/ForgotPassword/ResetPassword/ResetPasswordCard"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile"
import ProductRegistrationCard from "./pages/Products/Register/ProductRegistrationCard"
import ProductVisualizationCard from "./pages/Products/Visualization/ProductVisualizationCard"
import BrandRegistrationCard from "./pages/Brands/Register/BrandRegistrationCard"
import BrandVisualizationCard from "./pages/Brands/Visualization/BrandVisualizationCard"
import MovimentCard from "./pages/Stock/Moviments/MovimentCard"
import ProviderRegistrationCard from "./pages/Providers/Register/ProviderRegistrationCard"
import ProviderVisualizationCard from "./pages/Providers/Visualization/ProviderVisualizationCard"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute"

export default function SetRoutes(){

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<App/>}></Route>
        <Route path='/login/signin' element={<SignInCard/>}></Route>
        <Route path='/login/signup' element={<SignUpCard/>}></Route>
        <Route path="/login/forgotmypassword" element={<ForgotMyPasswordCard/>}></Route>
        <Route path="/login/emailCodeResetPassword/:accountId" element={<EmailCodeResetPassword/>}></Route>
        <Route path="/login/resetPassword/:accountId" element={<ResetPasswordCard/>}></Route>

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }
        />


        <Route
          path="/products/registration"
          element={
            <PrivateRoute>
              <ProductRegistrationCard/>
            </PrivateRoute>
          }
        />
        <Route
          path="/products/visualization"
          element={
            <PrivateRoute>
              <ProductVisualizationCard/>
            </PrivateRoute>
          }
        />


        <Route
          path="/brands/registration"
          element={
            <PrivateRoute>
              <BrandRegistrationCard/>
            </PrivateRoute>
          }
        />
        <Route
          path="/brands/visualization"
          element={
            <PrivateRoute>
              <BrandVisualizationCard/>
            </PrivateRoute>
          }
        />


        <Route
          path="/stock/moviments"
          element={
            <PrivateRoute>
              <MovimentCard/>
            </PrivateRoute>
          }
        />
        

        <Route
          path="/providers/registration"
          element={
            <PrivateRoute>
              <ProviderRegistrationCard/>
            </PrivateRoute>
          }
        />
        <Route
          path="/providers/visualization"
          element={
            <PrivateRoute>
              <ProviderVisualizationCard/>
            </PrivateRoute>
          }
        />


      </Routes>
    </BrowserRouter>
  );
};
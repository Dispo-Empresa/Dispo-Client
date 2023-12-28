import { MDBCol } from "mdb-react-ui-kit";
import { useState } from "react";
import { Link } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@material-ui/core";

import Button from "components/ui/buttons/classic/Button";
import imagem from "assets/img/visual-inventory-management.png";
import logoSFundo from "assets/img/logo_sem_fundo.png";
import useKeyPress from "hooks/useKeyPress";
import { setToken } from "services/authToken";
import { post } from "services/httpMethods";
import { ENDPOINTS } from "utils/constants/endpoints";
import { getLocalStorage } from "data/local";
import { browserStorageKeys } from "utils/constants/constants";
import { TextField } from "components/ui/inputs/textfield/TextField";
import { PasswordField } from "components/ui/inputs/password/PasswordField";

import "./style.css";

function SignIn() {
  const [emailRequest, setEmailRequest] = useState("gestorTeste@gmail.com");
  const [passwordRequest, setpasswordRequest] = useState("senhateste123");
  const [goToHomePage, setgoToHomePage] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  useKeyPress("Enter", handleKeyPress);

  if (goToHomePage) {
    var lastAccessedUrl = getLocalStorage(browserStorageKeys.LastAccessedUrl);

    return lastAccessedUrl ? (
      <Navigate to={lastAccessedUrl} />
    ) : (
      <Navigate to="/dashboard" />
    );
  }

  const SignIn = async () => {
    var data = {
      email: emailRequest,
      password: passwordRequest,
    };

    try {
      setLoading(true);

      var response = await post(ENDPOINTS.auth.signIn, data);

      if (response.success) {
        setToken(response.data.token);
        setgoToHomePage(true);
      } else {
        setLoginError(response.message);
      }
    } catch (err) {
      setLoginError(err);
    } finally {
      setLoading(false);
    }
  };

  function handleKeyPress() {
    SignIn();
  }

  return (
    <div className="body--login">
      <Card style={{ borderRadius: "10px" }}>
        <CardContent>
          <div style={{ display: "flex" }}>
            <div className="login-container">
              <label className="title--login">Login</label>
              <MDBCol>
                <TextField
                  label="Email"
                  type="email"
                  value={emailRequest}
                  onChange={(value) => setEmailRequest(value.target.value)}
                />
              </MDBCol>
              <MDBCol className="mt-4 mb-2">
                <PasswordField
                  toggleMask
                  label="Senha"
                  placeholder="Senha"
                  value={passwordRequest}
                  onChange={(value) => setpasswordRequest(value.target.value)}
                />
              </MDBCol>
              <Link href="/login/forgotmypassword" underline="none">
                Esqueci minha senha
              </Link>
              <div style={{ marginTop: "10%" }}>
                <Button
                  onClick={SignIn}
                  title="Login"
                  width="300px"
                  height="45px"
                  loading={loading}
                  disabled={loading}
                />
              </div>
              {loginError && (
                <label
                  style={{ marginTop: "5%", color: "red", fontWeight: "500" }}
                >
                  {loginError}
                </label>
              )}
            </div>
            <div className="image-container">
              <img
                src={imagem}
                alt="Dispo"
                style={{ width: "250px", marginBottom: "40px" }}
              />
              <img src={logoSFundo} alt="Dispo" style={{ width: "250px" }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignIn;

import { useState } from "react";
import { Link } from "@mui/material";
import { Navigate } from "react-router-dom";

import { setToken } from "../../../services/api/authToken";
import { post } from "../../../services/api/crud";
import Button from "../../../components/ui/buttons/classic/Button";
import imagem from "../../../assets/img/visual-inventory-management.png";
import logoSFundo from "../../../assets/img/logo_sem_fundo.png";
import useKeyPress from "../../../hooks/useKeyPress";

import "./style.css";

function SignIn() {
  const [emailRequest, setEmailRequest] = useState("matheustexte123@gmail.com");
  const [passwordRequest, setpasswordRequest] = useState("debora14");
  const [goToHomePage, setgoToHomePage] = useState(false);
  const [loading, setLoading] = useState(false);
  useKeyPress("Enter", handleKeyPress);

  if (goToHomePage) {
    return <Navigate to="/dashboard" />;
  }

  const SignIn = async () => {
    var data = {
      email: emailRequest,
      password: passwordRequest,
    };

    try {
      setLoading(true);
      var response = await post("Auth/signin", data);

      setToken(response.data.tokenResponseDto.token);
      setgoToHomePage(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  function handleKeyPress() {
    SignIn();
  }

  return (
    <div className="body--login">
      <div className="container--login">
        <div className="left--login">
          <div className="left--login-content">
            <label className="title--login">Login</label>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label>Email</label>
              </div>
              <input
                type="email"
                className="form-control classic"
                style={{
                  width: "300px",
                }}
                value={emailRequest}
                onChange={(value) => setEmailRequest(value.target.value)}
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "5%",
                }}
              >
                <label>Senha</label>
              </div>
              <input
                type="password"
                className="form-control classic"
                style={{
                  width: "300px",
                }}
                value={passwordRequest}
                onChange={(value) => setpasswordRequest(value.target.value)}
              />
              <Link href="/login/forgotmypassword" underline="none">
                Esqueci minha senha
              </Link>
            </div>
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
          </div>
        </div>
        <div className="right--login">
          <img
            src={imagem}
            alt="Dispo"
            style={{ width: "300px", height: "auto" }}
          />
          <img
            src={logoSFundo}
            alt="Dispo"
            style={{ width: "300px", height: "auto", marginTop: "-10%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;

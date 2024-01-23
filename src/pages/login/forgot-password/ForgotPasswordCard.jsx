import { useState } from "react";
import { Card, CardContent } from "@material-ui/core";

import ForgotPasswordStep1 from "./ForgotPasswordSteps/ForgotPasswordStep1";
import ForgotPasswordStep2 from "./ForgotPasswordSteps/ForgotPasswordStep2";
import ForgotPasswordStep3 from "./ForgotPasswordSteps/ForgotPasswordStep3";
import { Stepper } from "components/structured/stepper/Stepper";

import "./style.css";

function ForgotPassword() {
  const steps = ["E-mail", "Codigo de confirmação", "Redefinir senha"];
  const [currentStep, setCurrentStep] = useState(0);

  const [isTimerInicialized, setIsTimerInicialized] = useState(false);

  return (
    <div className="body--login">
      <Card className="content-children" style={{ borderRadius: "10px" }}>
        <CardContent>
          <label className="title-redefinir-senha">Redefinir senha</label>
          <div>
            <Stepper steps={steps} activeStep={currentStep}>
              <ForgotPasswordStep1 timerInicialized={setIsTimerInicialized} />
              <ForgotPasswordStep2 timerInicialStarted={isTimerInicialized} />
              <ForgotPasswordStep3 />
            </Stepper>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;

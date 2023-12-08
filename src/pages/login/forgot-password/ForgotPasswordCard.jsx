import React, { useState } from 'react';
import { Card, CardContent } from "@material-ui/core";
import { Stepper } from "../../../components/structured/stepper/Stepper";
import ContentPage from '../../../layouts/content/ContentPage';
import ForgotPasswordStep1 from './ForgotPasswordSteps/ForgotPasswordStep1';
import ForgotPasswordStep2 from './ForgotPasswordSteps/ForgotPasswordStep2';
import ForgotPasswordStep3 from './ForgotPasswordSteps/ForgotPasswordStep3';
import "./style.css";

function ForgotPassword() {
  const steps = ["E-mail", "Codigo de confirmação", "Redefinir senha"];
  const [currentStep, setCurrentStep] = useState(0);

  const [isTimerInicialized, setIsTimerInicialized] = useState(false);

  return (
    <div className="body--login">
      <Card className="card--login" style={{ borderRadius: "10px" }} >
        <CardContent>
        <label className="title--login">Redefinir senha</label>
          <div className="content-children">
            <Stepper steps={steps} activeStep={currentStep} >
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

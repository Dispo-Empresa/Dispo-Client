import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StepWizard from "react-step-wizard";
import * as Multistep from "react-form-stepper";

import { COLORS } from "../../../themes/colors";
import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import RegisterPanelMultiStep from "../../../layouts/panel/register/multi-step/RegisterPanelMultistep";

import "./styles.css";

function Stepper(props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (e) => {
    setActiveStep(e.activeStep - 1);
    props.onStepChange(e);
  };

  return (
    <div>
      <Multistep.Stepper
        style={{ marginTop: "3%" }}
        activeStep={activeStep}
        connectorStateColors
        styleConfig={{
          completedBgColor: "#4EB254",
          activeBgColor: "#029DBE",
        }}
        connectorStyleConfig={{
          activeColor: COLORS.SecondColor,
          completedColor: "#4EB254",
        }}
      >
        {props.steps &&
          props.steps.map((step) => <Multistep.Step label={step} />)}
      </Multistep.Stepper>
      <RegisterPanel alertPanel={props.alertPanel} onSave={props.onSave}>
        <StepWizard onStepChange={handleStepChange}>
          {props.children}
        </StepWizard>
      </RegisterPanel>
    </div>
  );
}

function Step(props) {
  return (
    <StepLayout {...props} nextStep={props.onNextStep}>
      <RegisterPanelMultiStep>{props.children}</RegisterPanelMultiStep>
    </StepLayout>
  );
}

function StepLayout(props) {
  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.nextStep();
  };

  return (
    <div className="multistep-container">
      {props.currentStep > 1 && (
        <button onClick={handleBack} className="button-stepper">
          <ArrowBackIosNewIcon style={{ fontSize: "50px" }} />
        </button>
      )}
      <div className="multistep-content">{props.children}</div>
      {props.currentStep < props.totalSteps && (
        <button onClick={handleNext} className="button-stepper">
          <ArrowForwardIosIcon style={{ fontSize: "50px" }} />
        </button>
      )}
    </div>
  );
}

export { Stepper, Step };

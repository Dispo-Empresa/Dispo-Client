import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "reactstrap";
import StepWizard from "react-step-wizard";
import * as Multistep from "react-form-stepper";

import { COLORS } from "../../../themes/colors";
import RegisterPanel from "../../../layouts/panel/register-panel/RegisterPanel";
import RegisterPanelMultiStep from "../../../layouts/panel/register-panel/RegisterPanelMultistep";

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
          activeBgColor: COLORS.SecondColor,
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
        <Button onClick={handleBack} className="buttons-prev">
          <FiChevronLeft size={50} />
        </Button>
      )}
      <div className="multistep-content">{props.children}</div>
      {props.currentStep < props.totalSteps && (
        <Button onClick={handleNext} className="buttons-prev">
          <FiChevronRight size={50} />
        </Button>
      )}
    </div>
  );
}

export { Stepper, Step };

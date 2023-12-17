import StepWizard from "react-step-wizard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import * as Multistep from "react-form-stepper";
import { useState } from "react";
import { Steps } from "primereact/steps";
import { MDBContainer } from "mdb-react-ui-kit";

import RegisterPanelMultiStep from "layouts/panel/register/multi-step/RegisterPanelMultistep";
import { COLORS } from "themes/colors";

import "./styles.css";

function Stepper(props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (e) => {
    setActiveStep(e.activeStep - 1);
  };

  const transformedStepLabels = props.steps.map((label) => ({ label }));

  return (
    <div>
      {props.model === "prime" ? (
        <Steps
          style={{ marginBottom: "3%", marginTop: "4%" }}
          model={transformedStepLabels}
          activeIndex={activeStep}
          readOnly={true}
        />
      ) : (
        <Multistep.Stepper
          activeStep={activeStep}
          connectorStateColors
          style={{ marginBottom: "3%", marginTop: "4%" }}
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
      )}
      <StepWizard onStepChange={handleStepChange}>{props.children}</StepWizard>
    </div>
  );
}

function StepLayout(props) {
  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.onNextStep();
  };

  return (
    <RegisterPanelMultiStep
      buttons={props.customButtons}
      alertPanel={props.alertPanel}
    >
      <div className="multistep-container">
        {props.currentStep > 1 && !props.hideButtonsBack && (
          <button onClick={handleBack} className="button-stepper">
            <ArrowBackIosNewIcon style={{ fontSize: "50px" }} />
          </button>
        )}
        <div className="multistep-content">
          <MDBContainer>{props.children}</MDBContainer>
        </div>
        {props.currentStep < props.totalSteps && !props.hideButtonsFront && (
          <button type="submit" onClick={handleNext} className="button-stepper">
            <ArrowForwardIosIcon style={{ fontSize: "50px" }} />
          </button>
        )}
      </div>
    </RegisterPanelMultiStep>
  );
}

export { Stepper, StepLayout };

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import { FormikWizard } from "formik-wizard-form";
import { Steps } from "primereact/steps";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import useAlert from "hooks/alert/useAlert";
import AlertMessagePanel from "components/structured/alert/panel/AlertPanel";
import { SaveButton } from "components/ui/buttons/icons/IconButton";

import "layouts/panel/register/classic/styles.css";
import "./styles.css";

function Stepper({
  alertPanel,
  buttons,
  hideSaveButton,
  onSave,
  title,
  loading,
  steps,
  labels,
  initialValues,
  setValues,
}) {
  const [index, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("backward");

  const [alertType, alertTitle, alertMessage, openAlert, closeAlert] =
    useAlert();

  useEffect(() => {
    if (alertPanel) {
      openAlert(alertPanel.type, alertPanel.title, alertPanel.message);
    } else {
      closeAlert();
    }
  }, [alertType, alertTitle, alertMessage, openAlert, closeAlert, alertPanel]);

  return (
    <FormikWizard
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
        setValues(values);
      }}
      validateOnNext
      activeStepIndex={index}
      steps={steps}
    >
      {({
        currentStepIndex,
        renderComponent,
        handlePrev,
        handleNext,
        isNextDisabled,
        isPrevDisabled,
        isLastStep,
      }) => {
        const next = () => {
          setDirection("backward");
          handleNext();
        };

        const prev = () => {
          setDirection("forward");
          handlePrev();
        };

        const finalize = () => {
          next();
          onSave();
        };

        const select = (index) => {
          if (index > currentStepIndex) {
            next();
          } else {
            prev();
          }

          setActiveIndex(index);
        };

        const transitionClassNames = {
          enter: direction === "forward" ? "forward-enter" : "backward-enter",
          enterActive:
            direction === "forward"
              ? "forward-enter-active"
              : "backward-enter-active",
          exitActive:
            direction === "forward"
              ? "forward-exit-active"
              : "backward-exit-active",
        };

        return (
          <div style={{ marginTop: "50px" }}>
            <Steps
              model={labels}
              activeIndex={currentStepIndex}
              onSelect={(e) => select(e.index)}
              readOnly={true}
            />
            <div style={{ marginTop: "50px" }}>
              {alertType && alertTitle && (
                <AlertMessagePanel
                  type={alertType}
                  title={alertTitle}
                  message={alertMessage}
                  onClose={alertPanel && alertPanel.onClose}
                />
              )}
            </div>
            <label className="title">{title}</label>
            <div className="buttons">
              {buttons}
              {hideSaveButton
                ? ""
                : isLastStep && (
                    <SaveButton
                      type="submit"
                      onClick={finalize}
                      loading={loading}
                    />
                  )}
            </div>
            <hr style={{ marginBottom: "50px", width: "100%" }} />
            <div className="multistep-container" style={{ marginTop: "50px" }}>
              {currentStepIndex > 0 && (
                <button
                  disabled={isPrevDisabled}
                  onClick={prev}
                  className="button-stepper"
                >
                  <ArrowBackIosNewIcon style={{ fontSize: "50px" }} />
                </button>
              )}
              <div
                style={{
                  marginLeft: currentStepIndex >= 0 && "65px",
                  marginRight: currentStepIndex >= 0 && "65px",
                  width: "100%",
                  height: "100%",
                }}
              >
                <TransitionGroup>
                  <CSSTransition
                    key={currentStepIndex}
                    timeout={300}
                    classNames={transitionClassNames}
                  >
                    {renderComponent()}
                  </CSSTransition>
                </TransitionGroup>
              </div>
              {currentStepIndex < labels.length - 1 && (
                <button onClick={next} className="button-stepper">
                  <ArrowForwardIosIcon style={{ fontSize: "50px" }} />
                </button>
              )}
            </div>
          </div>
        );
      }}
    </FormikWizard>
  );
}

//function ProductEntryMovimentation() {
//  const stepLabels = [
//    { label: "Ordem de compra" },
//    { label: "Informação dos lotes" },
//    { label: "Confirmação" },
//  ];
//
//  const [showAlert, openAlert] = useAlertScheme();
//
//  const steps = [
//    {
//      component: PurchaseOrderStep,
//      validationSchema: PurchaseOrderStepValidations,
//    },
//    {
//      component: BatchesInfoStep,
//      validationSchema: BatchesInfoStepValidations,
//    },
//    {
//      component: ConfirmationStep,
//    },
//  ];
//
//  const [finalValues, setFinalValues] = useState({});
//
//  const initialValues = {
//    product: "",
//    batch: "",
//    manufacturingDate: new Date(),
//    validatingDate: new Date(),
//    quantityOnBatch: "",
//    batches: [],
//  };
//
//  const register = () => {
//    console.log(finalValues);
//    openAlert("info", "Testando mensagem de informação");
//  };
//
//  return (
//    <ContentPage title="Movimentação de produto">
//      <Stepper
//        labels={stepLabels}
//        steps={steps}
//        initialValues={initialValues}
//        alertPanel={showAlert}
//        onSave={register}
//        setValues={setFinalValues}
//      />
//    </ContentPage>
//  );
//}
//
//const StepTest = ({ errors, values, handleChange }) => {
//  return (
//    <div>
//      <MDBCol>
//        <TextField
//          error={!!errors.email}
//          name="email"
//          label="Email"
//          value={values.email}
//          helperText={errors.email}
//          onChange={handleChange}
//          fullWidth
//        />
//      </MDBCol>
//      <MDBCol>
//        <TextField
//          name="phone"
//          label="Phone"
//          value={values.phone}
//          onChange={handleChange}
//          error={!!errors.phone}
//          helperText={errors.phone}
//          fullWidth
//        />
//      </MDBCol>
//      <MDBCol>
//        <TextField
//          name="addressLine1"
//          label="Address Line1"
//          value={values.addressLine1}
//          onChange={handleChange}
//          fullWidth
//        />
//      </MDBCol>
//      <MDBCol>
//        <TextField
//          name="addressLine2"
//          label="Address Line2"
//          value={values.addressLine2}
//          onChange={handleChange}
//          fullWidth
//        />
//      </MDBCol>
//    </div>
//  );
//};

export default Stepper;

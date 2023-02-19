import React, { useState } from 'react';

import { Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { COLORS } from "../../../../config/defaultColors";

export function FormikStep({ children }) {
    return <>{children}</>;
  }
  
  export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState(false);
  
    function isLastStep() {
      return step === childrenArray.length - 1;
    }
  
    return (
      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
            await props.onSubmit(values, helpers);
            setCompleted(true);
          } else {
            setStep((s) => s + 1);
            helpers.setTouched({});
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step key={child.props.label} completed={step > index || completed}>
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
  
            {currentChild}
  
            <Grid container spacing={2}>
              {step > 0 ? (
                <Grid item>
                  <Button
                    disabled={isSubmitting}
                    variant="contained"
                    onClick={() => setStep((s) => s - 1)}
                    style={{
                      backgroundColor: COLORS.PrimaryColor,
                      color: "#FFFFFF",
                      width: 150,
                      height: 50,
                      borderRadius: 10,
                      fontWeight: "initial",
                      fontSize: 12
                    }}
                  >
                    Back
                  </Button>
                </Grid>
              ) : null}
              <Grid item>
                <Button
                  startIcon={isSubmitting ? <CircularProgress size="1.5rem" color='success' /> : null}
                  disabled={isSubmitting}
                  variant="contained"
                  type="submit"
                  style={{
                    backgroundColor: COLORS.PrimaryColor,
                    color: "#FFFFFF",
                    width: 150,
                    height: 50,
                    borderRadius: 10,
                    fontWeight: "initial",
                    fontSize: 12
                  }}
                >
                  {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    );
  }
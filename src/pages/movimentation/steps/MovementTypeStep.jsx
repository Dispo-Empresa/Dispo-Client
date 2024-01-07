import { useFormik } from "formik";
import { MDBCol } from "mdb-react-ui-kit";

import RegisterPanelSimple from "layouts/panel/register/classic/RegisterPanelSimple";
import { StepLayout } from "components/structured/stepper/Stepper";
import { Datefield } from "components/ui/inputs/date/DateField";
import { NumberField } from "components/ui/inputs/number/NumberField";
import { SelectWithFilter } from "components/ui/inputs/select/SelectField";
import { movementType } from "utils/constants/constants";
import { validateMovementTypeStep } from "./validate";

function MovementTypeStep(props) {
  const types = [
    { value: movementType.Input, label: "Entrada" },
    { value: movementType.Output, label: "Saída" },
  ];

  const formik = useFormik({
    initialValues: {
      type: "",
      quantity: "",
      date: new Date(),
    },
    validationSchema: validateMovementTypeStep,
    validateOnChange: false,
    onSubmit: async (values) => {
      props.nextStep();
      props.setMovementType(values.type);
    },
  });

  const handleNextStep = () => {
    formik.handleSubmit();
  };

  return (
    <StepLayout {...props} onNextStep={handleNextStep}>
      <RegisterPanelSimple>
        <MDBCol>
          <SelectWithFilter
            required
            label="Tipo"
            options={types}
            value={formik.values.type}
            error={formik.errors.type}
            onChange={(e) => formik.setFieldValue("type", e.value)}
            width="500px"
          />
        </MDBCol>
        <MDBCol>
          <NumberField
            required
            label="Quantidade"
            value={formik.values.quantity}
            error={formik.errors.quantity}
            onChange={(e) => formik.setFieldValue("quantity", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <Datefield
            required
            label="Data"
            value={formik.values.date}
            error={formik.errors.date}
            onChange={(e) => formik.setFieldValue("date", e.target.value)}
          />
        </MDBCol>
      </RegisterPanelSimple>
    </StepLayout>
  );
}

export default MovementTypeStep;

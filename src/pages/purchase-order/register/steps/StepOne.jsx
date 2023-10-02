import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useFormik } from "formik";
import { StepLayout } from "../../../../components/structured/stepper/Stepper";
import { SelectWithFilter } from "../../../../components/ui/inputs/select/SelectField";
import { NumberField } from "../../../../components/ui/inputs/number/NumberField";
import { Datefield } from "../../../../components/ui/inputs/date/DateField";
import RegisterPanelSimple from "../../../../layouts/panel/register/classic/RegisterPanelSimple";

import { PurchaseOrderStepValidations } from "./validate";

const notification = [
  { value: "Email", label: "Email" },
  { value: "Whatsapp", label: "Whatsapp" },
];

const supplier = [
  { value: "Matheus LTDA", label: "Matheus LTDA" },
  { value: "Teste MEI", label: "Teste MEI" },
];

function StepOne(props) {
  const formik = useFormik({
    initialValues: {
      orderNumber: "",
      supplier: "",
      creationDate: new Date(),
      notificationType: "",
    },
    validationSchema: PurchaseOrderStepValidations,
    validateOnChange: false,
    onSubmit: async (values) => {},
  });

  const handleNextStep = () => {
    formik.handleSubmit();

    const isFormValid =
      formik.isValid && Object.keys(formik.touched).length > 0;

    if (isFormValid) {
      props.setPurchaseOrderInfoCallBack({
        orderNumber: formik.values.orderNumber,
        creationDate: formik.values.creationDate,
        notificationType: formik.values.notificationType,
        supplier: formik.values.supplier,
      });

      props.nextStep();
    }
  };

  return (
    <StepLayout {...props} onNextStep={handleNextStep}>
      <RegisterPanelSimple>
        <MDBRow>
          <MDBCol>
            <NumberField
              required
              label="Número da ordem"
              value={formik.values.orderNumber}
              error={formik.errors.orderNumber}
              onChange={(value) =>
                formik.setFieldValue("orderNumber", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              required
              label="Fornecedor"
              options={supplier}
              value={formik.values.supplier}
              error={formik.errors.supplier}
              onChange={(value) =>
                formik.setFieldValue("supplier", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <Datefield
              required
              label="Data de criação"
              value={formik.values.creationDate}
              error={formik.errors.creationDate}
              onChange={(value) =>
                formik.setFieldValue("creationDate", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              required
              label="Tipo de notificação"
              options={notification}
              value={formik.values.notificationType}
              error={formik.errors.notificationType}
              onChange={(value) =>
                formik.setFieldValue("notificationType", value.target.value)
              }
            />
          </MDBCol>
        </MDBRow>
      </RegisterPanelSimple>
    </StepLayout>
  );
}

export default StepOne;

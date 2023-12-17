import { MDBCol } from "mdb-react-ui-kit";
import { useFormik } from "formik";

import { StepLayout } from "components/structured/stepper/Stepper";
import { SelectWithFilter } from "components/ui/inputs/select/SelectField";
import { Datefield } from "components/ui/inputs/date/DateField";
import { TextField } from "components/ui/inputs/textfield/TextField";
import { ENDPOINTS } from "utils/constants/endpoints";
import { PurchaseOrderStepValidations } from "./validate";

import useFetch from "hooks/useFetchApi";
import RegisterPanelSimple from "layouts/panel/register/classic/RegisterPanelSimple";

function StepOne(props) {
  const { data: supplier } = useFetch(ENDPOINTS.suppliers.getAll);

  const notificationType = [
    { value: 0, label: "Email" },
    { value: 1, label: "Whatsapp" },
  ];

  const paymentMethod = [
    { value: 0, label: "Cartão (Débito)" },
    { value: 1, label: "Cartão (Crédito)" },
    { value: 2, label: "Dinheiro" },
    { value: 3, label: "Saque bancário" },
    { value: 4, label: "Pix" },
    { value: 5, label: "Boleto bancário" },
    { value: 6, label: "Outra forma de pagamento" },
  ];

  const formik = useFormik({
    initialValues: {
      orderNumber: "",
      supplier: "",
      creationDate: new Date(),
      notificationType: 0,
      paymentMethod: 0,
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
        paymentMethod: formik.values.paymentMethod,
      });

      props.nextStep();
    }
  };

  return (
    <StepLayout {...props} onNextStep={handleNextStep}>
      <RegisterPanelSimple>
        <MDBCol>
          <TextField
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
            options={
              supplier &&
              supplier.data.map((supplier) => ({
                value: supplier.id,
                label: supplier.name,
              }))
            }
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
            options={notificationType}
            value={formik.values.notificationType}
            error={formik.errors.notificationType}
            onChange={(value) =>
              formik.setFieldValue("notificationType", value.target.value)
            }
          />
        </MDBCol>
        <MDBCol>
          <SelectWithFilter
            required
            label="Forma de pagamento"
            options={paymentMethod}
            value={formik.values.paymentMethod}
            error={formik.errors.paymentMethod}
            onChange={(value) =>
              formik.setFieldValue("paymentMethod", value.target.value)
            }
          />
        </MDBCol>
      </RegisterPanelSimple>
    </StepLayout>
  );
}

export default StepOne;

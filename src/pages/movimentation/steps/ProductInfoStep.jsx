import { useFormik } from "formik";
import { MDBCol } from "mdb-react-ui-kit";

import useFetch from "hooks/useFetchApi";
import RegisterPanelSimple from "layouts/panel/register/classic/RegisterPanelSimple";
import { SelectWithFilter } from "components/ui/inputs/select/SelectField";
import { ENDPOINTS } from "utils/constants/endpoints";
import { StepLayout } from "components/structured/stepper/Stepper";
import { CurrencyField } from "components/ui/inputs/currency/CurrencyField";
import { validateProductInfoStep } from "./validate";

const ProductInfoStep = (props) => {
  const { data: products } = useFetch(
    ENDPOINTS.products.getWithActivePurschaseOrder
  );

  const formik = useFormik({
    initialValues: {
      product: "",
      unitPrice: "",
    },
    validationSchema: validateProductInfoStep,
    validateOnChange: false,
    onSubmit: async (values) => {
      props.setProductInfoCallBack(values);
      props.nextStep();
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
            label="Produto"
            options={
              products &&
              products.data.map((product) => ({
                value: product.id,
                label: product.name,
              }))
            }
            value={formik.values.product}
            error={formik.errors.product}
            onChange={(e) => formik.setFieldValue("product", e.value)}
            width="500px"
          />
        </MDBCol>
        <MDBCol>
          <CurrencyField
            required
            label="Preço unitário"
            value={formik.values.unitPrice}
            error={formik.errors.unitPrice}
            onChange={(e) => formik.setFieldValue("unitPrice", e.value)}
          />
        </MDBCol>
      </RegisterPanelSimple>
    </StepLayout>
  );
};

export default ProductInfoStep;

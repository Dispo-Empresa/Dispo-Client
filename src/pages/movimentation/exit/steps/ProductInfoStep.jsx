import { useFormik } from "formik";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

import RegisterPanelSimple from "layouts/panel/register/classic/RegisterPanelSimple";
import useFetch from "hooks/useFetchApi";
import { StepLayout } from "components/structured/stepper/Stepper";
import { Datefield } from "components/ui/inputs/date/DateField";
import { NumberField } from "components/ui/inputs/number/NumberField";
import { CurrencyField } from "components/ui/inputs/currency/CurrencyField";
import { productInfoStep } from "./validate";
import { ENDPOINTS } from "utils/constants/endpoints";
import { SelectWithFilter } from "components/ui/inputs/select/SelectField";

const ProductInfoStep = (props) => {
  const { data: products } = useFetch(
    ENDPOINTS.products.getProductsWithSalePrice
  );

  const formik = useFormik({
    initialValues: {
      product: "",
      date: new Date(),
      time: new Date(),
      salePrice: 0,
      quantityOnBatch: 0,
    },
    validationSchema: productInfoStep,
    validateOnChange: false,
  });

  const handleNextStep = () => {
    formik.handleSubmit();

    const isFormValid =
      formik.isValid && Object.keys(formik.touched).length > 0;

    if (!isFormValid) {
      return;
    }

    props.setProductInfoCallBack(formik.values);
    props.nextStep();
  };

  const onSelectProduct = (e) => {
    formik.setFieldValue("product", e.value);
    let productSelected = products.data.find(
      (product) => product.id === e.value
    );

    formik.setFieldValue("salePrice", productSelected.salePrice);
  };

  return (
    <StepLayout {...props} onNextStep={handleNextStep}>
      <RegisterPanelSimple>
        <MDBRow>
          <MDBCol md={6}>
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
              width="500px"
              onChange={(e) => onSelectProduct(e)}
            />
          </MDBCol>
          <MDBCol md={2}>
            <Datefield
              required
              label="Data"
              value={formik.values.date}
              error={formik.errors.date}
              onChange={(e) => formik.setFieldValue("date", e.value)}
            />
          </MDBCol>
          <MDBCol>
            <Datefield
              required
              timeOnly
              label="Horário"
              value={formik.values.time}
              error={formik.errors.time}
              width="150px"
              onChange={(e) => formik.setFieldValue("time", e.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-5">
          <MDBCol>
            <CurrencyField
              disabled
              label="Preço de venda"
              value={formik.values.salePrice}
            />
          </MDBCol>
          <MDBCol>
            <NumberField
              label="Quantidade"
              value={formik.values.quantityOnBatch}
              error={formik.errors.quantityOnBatch}
              onChange={(e) => formik.setFieldValue("quantityOnBatch", e.value)}
            />
          </MDBCol>
        </MDBRow>
      </RegisterPanelSimple>
    </StepLayout>
  );
};

export default ProductInfoStep;

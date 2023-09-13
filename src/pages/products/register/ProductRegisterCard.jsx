import { useState } from "react";
import { MDBCol } from "mdb-react-ui-kit";
import { useFormik } from "formik";

import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import ContentPage from "../../../layouts/content/ContentPage";
import ContentDivisor from "../../../components/structured/divisor/ContentDivisor";
import validate from "./validate";
import { ImageField } from "../../../components/ui/inputs/image/ImageField";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { CurrencyField } from "../../../components/ui/inputs/currency/CurrencyField";
import { TextArea } from "../../../components/ui/inputs/textarea/TextArea";
import { SelectWithFilter } from "../../../components/ui/inputs/select/SelectField";
import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { post } from "../../../services/httpMethods";

const categoryTypes = [
  { value: 0, label: "Alimentação" },
  { value: 1, label: "Bebidas" },
  { value: 2, label: "Vestuário" },
  { value: 3, label: "Esporte" },
  { value: 4, label: "Cosmético" },
  { value: 5, label: "Livros" },
  { value: 6, label: "Eletrônico" },
  { value: 7, label: "Video Games" },
  { value: 8, label: "Presentes" },
  { value: 9, label: "Informática" },
  { value: 10, label: "Outros" },
];

const unitOfMeasurementTypes = [
  { value: 0, label: "KG (Kilograma)" },
  { value: 1, label: "G (Grama)" },
  { value: 2, label: "L (Litro)" },
  { value: 3, label: "ML (Mililitro)" },
  { value: 4, label: "M (Metro)" },
  { value: 5, label: "CM  (Centímetro)" },
  { value: 6, label: "Outros" },
];

function ProductRegisterCard() {
  const [showAlert, openAlert] = useAlertScheme();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      description: "",
      image: null,
      purchasePrice: null,
      salePrice: null,
      category: null,
      unitOfMeasurement: null,

      // dimension
      weight: null,
      height: null,
      width: null,
      depth: null,
    },
    validate,
    onSubmit: async (values) => {
      setLoading(true);
      var response = await post(ENDPOINTS.products.createProduct, values);

      if (response.success) {
        openAlert(response.alertType, response.message);
        formik.resetForm();
      } else {
        openAlert(response.alertType, "Erro", response.message);
      }

      setLoading(false);
    },
  });

  const handleBeforeSubmiting = () => {
    if (formik.errors) {
      openAlert("error", "Existem campos com erro, por favor verifique!");
      return;
    }
  };

  return (
    <ContentPage id="productRegister" title="Cadastro de Produto">
      <RegisterPanel
        alertPanel={showAlert}
        title="Informações Básicas"
        onSubmit={formik.handleSubmit}
        onSave={handleBeforeSubmiting}
        loading={loading}
      >
        <MDBCol>
          <TextField
            required
            label="Nome do produto"
            value={formik.values.name}
            error={formik.errors.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <CurrencyField
            label="Preço de compra"
            value={formik.values.purchasePrice}
            error={formik.errors.purchasePrice}
            onChange={(e) => formik.setFieldValue("purchasePrice", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <CurrencyField
            required
            label="Preço de venda"
            value={formik.values.salePrice}
            error={formik.errors.salePrice}
            onChange={(e) => formik.setFieldValue("salePrice", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <SelectWithFilter
            required
            label="Categoria"
            options={categoryTypes}
            value={formik.values.category}
            error={formik.errors.category}
            onChange={(e) => formik.setFieldValue("category", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <SelectWithFilter
            required
            label="Unidade de peso"
            options={unitOfMeasurementTypes}
            value={formik.values.unitOfMeasurement}
            error={formik.errors.unitOfMeasurement}
            onChange={(e) => formik.setFieldValue("unitOfMeasurement", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextArea
            required
            label="Descrição"
            value={formik.values.description}
            error={formik.errors.description}
            onChange={(e) =>
              formik.setFieldValue("description", e.target.value)
            }
          />
        </MDBCol>
        <MDBCol>
          <ImageField label="Imagem" />
        </MDBCol>
        <ContentDivisor title="Dimensões do produto" />
        <MDBCol>
          <TextField
            label="Peso"
            type="number"
            value={formik.values.weight}
            error={formik.errors.weight}
            onChange={(e) => formik.setFieldValue("weight", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            label="Altura"
            type="number"
            value={formik.values.height}
            error={formik.errors.height}
            onChange={(e) => formik.setFieldValue("height", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            label="Largura"
            type="number"
            value={formik.values.width}
            error={formik.errors.width}
            onChange={(e) => formik.setFieldValue("width", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            label="Profundidade"
            type="number"
            value={formik.values.depth}
            error={formik.errors.depth}
            onChange={(e) => formik.setFieldValue("depth", e.value)}
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default ProductRegisterCard;

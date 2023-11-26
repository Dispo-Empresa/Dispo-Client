import { useContext } from "react";
import { MDBCol } from "mdb-react-ui-kit";

import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import ContentPage from "../../../layouts/content/ContentPage";
import ContentDivisor from "../../../components/structured/divisor/ContentDivisor";
import { ImageField } from "../../../components/ui/inputs/image/ImageField";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { CurrencyField } from "../../../components/ui/inputs/currency/CurrencyField";
import { TextArea } from "../../../components/ui/inputs/textarea/TextArea";
import { SelectProductCategory, SelectProductUnitOfMeasurement } from "../../../components/ui/inputs/select/SelectProduct";
import { ProductFormikContext } from "../../../components/ui/context/contextProduct";

function ProductRegisterCard() {
  const { formik, showAlert, loading, handleBeforeSubmiting } = useContext(ProductFormikContext);

  return (
    <ContentPage id="productRegister" title="Cadastro de Produto">
      <RegisterPanel
        alertPanel={showAlert}
        title="Informações Básicas"
        onSubmit={formik?.handleSubmit}
        onSave={handleBeforeSubmiting}
        loading={loading}
      >
        <MDBCol>
          <TextField
            id="name"
            required
            label="Nome do produto"
            value={formik?.values.name}
            error={formik?.errors.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <CurrencyField
            id="purchasePrice"
            label="Preço de compra"
            value={formik?.values.purchasePrice}
            error={formik?.errors.purchasePrice}
            onChange={(e) => formik?.setFieldValue("purchasePrice", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <CurrencyField
            id="salePrice"
            required
            label="Preço de venda"
            value={formik?.values.salePrice}
            error={formik?.errors.salePrice}
            onChange={(e) => formik?.setFieldValue("salePrice", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <SelectProductCategory
            value={formik?.values.category}
            error={formik?.errors.category}
            onChange={(e) => formik?.setFieldValue("category", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <SelectProductUnitOfMeasurement
            value={formik?.values.unitOfMeasurement}
            error={formik?.errors.unitOfMeasurement}
            onChange={(e) => formik?.setFieldValue("unitOfMeasurement", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextArea
            id="description"
            required
            label="Descrição"
            value={formik?.values.description}
            error={formik?.errors.description}
            onChange={(e) => formik?.setFieldValue("description", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <ImageField label="Imagem" />
        </MDBCol>
        <ContentDivisor title="Dimensões do produto" />
        <MDBCol>
          <TextField
            id="weight"
            label="Peso"
            type="number"
            value={formik?.values.weight}
            error={formik?.errors.weight}
            onChange={(e) => formik?.setFieldValue("weight", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            id="height"
            label="Altura"
            type="number"
            value={formik?.values.height}
            error={formik?.errors.height}
            onChange={(e) => formik?.setFieldValue("height", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            id="width"
            label="Largura"
            type="number"
            value={formik?.values.width}
            error={formik?.errors.width}
            onChange={(e) => formik?.setFieldValue("width", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            id="depth"
            label="Profundidade"
            type="number"
            value={formik?.values.depth}
            error={formik?.errors.depth}
            onChange={(e) => formik?.setFieldValue("depth", e.value)}
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default ProductRegisterCard;

import { useContext, useEffect } from "react";
import { MDBCol } from "mdb-react-ui-kit";

import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import ContentPage from "../../../layouts/content/ContentPage";
import ContentDivisor from "../../../components/structured/divisor/ContentDivisor";
import useFetch from "../../../hooks/useFetchApi";

import { ImageField } from "../../../components/ui/inputs/image/ImageField";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { CurrencyField } from "../../../components/ui/inputs/currency/CurrencyField";
import { TextArea } from "../../../components/ui/inputs/textarea/TextArea";
import { SelectProductCategory, SelectProductUnitOfMeasurement } from "../../../components/ui/inputs/select/SelectProduct";
import { ProductFormikContext } from "../../../components/ui/context/contextProduct";
import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { post } from "../../../services/httpMethods";

import { QueryDataButton } from "../../../components/ui/buttons/icons/IconButton";
import { useTour } from "@reactour/tour";

function ProductRegisterCard({selectedRowData, readOnly, isEdit}) {
  const { formik, showAlert, loading, handleBeforeSubmiting, isNewRegister, setIsNewRegister } = useContext(ProductFormikContext); 
  const { data } = useFetch(ENDPOINTS.products.get, selectedRowData ? selectedRowData : 0);

  setIsNewRegister(!isEdit);

  useEffect(() =>
  {
    if (selectedRowData && data) {
      formik?.setFieldValue("id", data.data.id);
      formik?.setFieldValue("name", data.data.name);
      formik?.setFieldValue("purchasePrice", data.data.purchasePrice);
      formik?.setFieldValue("salePrice", data.data.salePrice);
      formik?.setFieldValue("category", data.data.category);
      formik?.setFieldValue("unitOfMeasurement", data.data.unitOfMeasurement);
      formik?.setFieldValue("description", data.data.description);
      formik?.setFieldValue("weight", data.data.weight);
      formik?.setFieldValue("height", data.data.height);
      formik?.setFieldValue("width", data.data.width);
      formik?.setFieldValue("depth", data.data.depth);

    } 
  }, [selectedRowData, data, isNewRegister]); 

  return (
    <ContentPage id="productRegister" title="Cadastro de Produto">
      <RegisterPanel
        alertPanel={showAlert}
        title="Informações Básicas"
        onSubmit={formik?.handleSubmit}
        onSave={handleBeforeSubmiting}
        loading={loading}
        hideSaveButton={readOnly}
      >
        <MDBCol>
          <TextField
            id="name"
            required
            label="Nome do produto"
            value={formik?.values.name}
            error={formik?.errors.name}
            onChange={(e) => formik?.setFieldValue("name", e.target.value)}
            disabled={readOnly}
          />
        </MDBCol>
        <MDBCol>
          <CurrencyField
            id="purchasePrice"
            label="Preço de compra"
            value={formik?.values.purchasePrice}
            error={formik?.errors.purchasePrice}
            onChange={(e) => formik?.setFieldValue("purchasePrice", e.value)}
            disabled={readOnly}
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
            disabled={readOnly}
          />
        </MDBCol>
        <MDBCol>
          <SelectProductCategory
            value={formik?.values.category}
            error={formik?.errors.category}
            onChange={(e) => formik?.setFieldValue("category", e.value)}
            disabled={readOnly}
          />
        </MDBCol>
        <MDBCol>
          <SelectProductUnitOfMeasurement
            value={formik?.values.unitOfMeasurement}
            error={formik?.errors.unitOfMeasurement}
            onChange={(e) => formik?.setFieldValue("unitOfMeasurement", e.value)}
            disabled={readOnly}
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
            disabled={readOnly}
          />
        </MDBCol>
        <MDBCol>
          <ImageField label="Imagem" disabled={readOnly}/>
        </MDBCol>
        <ContentDivisor title="Dimensões do produto" />
        <MDBCol>
          <TextField
            id="weight"
            label="Peso"
            type="number"
            value={formik?.values.weight}
            error={formik?.errors.weight}
            onChange={(e) => formik?.setFieldValue("weight", e.target.value)}
            disabled={readOnly}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            id="height"
            label="Altura"
            type="number"
            value={formik?.values.height}
            error={formik?.errors.height}
            onChange={(e) => formik?.setFieldValue("height", e.target.value)}
            disabled={readOnly}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            id="width"
            label="Largura"
            type="number"
            value={formik?.values.width}
            error={formik?.errors.width}
            onChange={(e) => formik?.setFieldValue("width", e.target.value)}
            disabled={readOnly}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            id="depth"
            label="Profundidade"
            type="number"
            value={formik?.values.depth}
            error={formik?.errors.depth}
            onChange={(e) => formik?.setFieldValue("depth", e.target.value)}
            disabled={readOnly}
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default ProductRegisterCard;

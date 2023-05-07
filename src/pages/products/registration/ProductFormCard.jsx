import { useState } from "react";
import { MDBCol } from "mdb-react-ui-kit";

import ContentPage from "../../../layouts/content/ContentPage";
import RegisterPanel from "../../../layouts/panel/register-panel/RegisterPanel";
import useForm from "../../../hooks/useForm";
import TextField from "../../../components/ui/textfields/form/TextField";
import TextArea from "../../../components/ui/textfields/form/TextArea";
import CurrencyField from "../../../components/ui/textfields/form/CurrencyField";
import { SelectWithFilter } from "../../../components/ui/textfields/form/SelectField";
import {
  SaveButton,
  QueryDataButton,
} from "../../../components/ui/buttons/icons/IconButton";
import ButtonGroup from "../../../components/ui/buttons/group/ButtonGroup";

import useAlertScheme from "../../../hooks/useAlertScheme";
import { useAlert } from "react-alert";

function ProductForm() {
  const initialState = {
    name: "",
    unitPrice: 0,
    color: "",
    unitOfMeansurement: "",
    type: "",
    brandId: "",
    description: "",
  };

  const [unitPriceTest, setUnitPriceTest] = useState(0);
  const { formValues, handleInputChange } = useForm(initialState);

  const alert = useAlert();
  const [showAlert, openAlert] = useAlertScheme(null);

  const cities = [
    { value: "New York", label: "NY" },
    { value: "Rome", label: "RM" },
    { value: "London", label: "LDN" },
    { value: "Istanbul", label: "IST" },
    { value: "Paris", label: "PRS" },
  ];

  const RegisterProduct = async () => {
    var data = {
      name: formValues.name,
      UnitPrice: unitPriceTest,
      Color: formValues.color,
      Description: formValues.description,
      UnitOfMeasurement: formValues.unitOfMeansurement,
      Type: formValues.type,
      BrandName: formValues.brandId,
    };

    try {
      //let response = await post("Products/register", data);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const pageConfig = {
    title: "Cadastro de Produto",
    buttons: (
      <ButtonGroup>
        <SaveButton
          title="Salvar produto"
          onClick={() => {
            openAlert("error", "Testando Erro", "AAAAAAAAAAAAAAAAAAAAAAAAAAA");
            alert.error(
              "Mensagem de notificação que tem uma duração para sumir | Info - Sucesso - Erro"
            );
          }}
        />
        <QueryDataButton title="Visualizar produtos" />
      </ButtonGroup>
    ),
  };

  return (
    <div>
      <ContentPage {...pageConfig}>
        <RegisterPanel title="Informações básicas" alert={showAlert}>
          <MDBCol>
            <TextField
              name="name"
              label="Nome do produto"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </MDBCol>
          <MDBCol>
            <CurrencyField
              name="unitPrice"
              label="Preço unitário"
              value={unitPriceTest}
              onChange={(value) => setUnitPriceTest(value)}
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              name="color"
              label="Cor"
              options={cities}
              value={formValues.color}
              onChange={handleInputChange}
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              label="Unidade de peso"
              options={cities}
              value="values.productName"
              onChange={handleInputChange}
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              label="Tipo"
              options={cities}
              value="values.productName"
              onChange={handleInputChange}
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              label="Marca"
              options={cities}
              value="values.productName"
              onChange={handleInputChange}
            />
          </MDBCol>
          <MDBCol>
            <TextArea
              name="description"
              label="Descrição"
              value={formValues.description}
              onChange={handleInputChange}
            />
          </MDBCol>
        </RegisterPanel>
      </ContentPage>
    </div>
  );
}

export default ProductForm;

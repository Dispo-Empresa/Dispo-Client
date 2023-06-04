import { MDBCol } from "mdb-react-ui-kit";
import { useState } from "react";

import ContentPage from "../../../layouts/content/ContentPage";
import useAlertScheme from "../../../hooks/useAlertScheme";
import TextField from "../../../components/ui/textfields/form/TextField";
import TextArea from "../../../components/ui/textfields/form/TextArea";
import { Stepper, Step } from "../../../components/structured/stepper/Stepper";
import { useFieldsFirstStep, useFieldsSecondStep } from "./useFields";

const FirstStep = (props) => {
  const [
    fields,
    handleFieldChange,
    handleExistsRequiredFieldsNotAnswered,
    handleExistsFieldsWithError,
    suplierError,
    quantityError,
  ] = useFieldsFirstStep();

  const handleNextStep = () => {
    if (handleExistsRequiredFieldsNotAnswered()) {
      props.alertPanel(
        "warning",
        "Existem campos obrigatórios não respondidos"
      );
      return;
    }

    if (handleExistsFieldsWithError()) {
      props.alertPanel(
        "warning",
        "Existem campos com erro, por favor verifique!"
      );
      return;
    }

    props.entityCallback({
      suplier: fields.suplier,
      quantity: fields.quantity,
    });
    props.alertPanel(null);
    props.nextStep();
  };

  return (
    <Step {...props} onNextStep={handleNextStep}>
      <MDBCol>
        <TextField
          required
          tipMessage="testando"
          label="Fornecedor"
          value={fields.suplier}
          error={suplierError}
          onChange={(value) => handleFieldChange("suplier", value.target.value)}
        />
      </MDBCol>
      <MDBCol>
        <TextField
          required
          label="Quantidade"
          type="number"
          value={fields.quantity}
          error={quantityError}
          onChange={(value) =>
            handleFieldChange("quantity", value.target.value)
          }
        />
      </MDBCol>
    </Step>
  );
};

const SecondStep = (props) => {
  const [
    fields,
    handleFieldChange,
    handleExistsRequiredFieldsNotAnswered,
    handleExistsFieldsWithError,
    productError,
  ] = useFieldsSecondStep();

  const handleNextStep = () => {
    if (handleExistsRequiredFieldsNotAnswered()) {
      props.alertPanel(
        "warning",
        "Existem campos obrigatórios não respondidos"
      );
      return;
    }

    if (handleExistsFieldsWithError()) {
      props.alertPanel(
        "warning",
        "Existem campos com erro, por favor verifique!"
      );
      return;
    }

    props.entityCallback({
      product: fields.product,
      description: fields.description,
    });
    props.alertPanel(null);
    props.nextStep();
  };

  return (
    <Step {...props} onNextStep={handleNextStep}>
      <MDBCol>
        <TextField
          required
          label="Produto"
          value={fields.product}
          error={productError}
          onChange={(value) => handleFieldChange("product", value.target.value)}
        />
      </MDBCol>
      <MDBCol>
        <TextArea
          name="description"
          label="Descrição"
          value={fields.description}
          onChange={(value) =>
            handleFieldChange("description", value.target.value)
          }
        />
      </MDBCol>
    </Step>
  );
};

const ThirdStep = (props) => {
  return (
    <Step {...props}>
      <div>
        <h2>Summary moviment detail</h2>
        <p>Fornecedor: {props.entity.suplier}</p>
        <p>Quantidade: {props.entity.quantity}</p>
        <p>Produto: {props.entity.product}</p>
        <p>Descrição: {props.entity.description}</p>
      </div>
    </Step>
  );
};

function MovimentCard() {
  const steps = ["Informações básicas", "Informações avançadas", "Confirmação"];
  const [movimentOne, setMovimentOne] = useState({});
  const [movimentTwo, setMovimentTwo] = useState({});
  const [moviment, setMoviment] = useState({});
  const [showAlert, openAlert] = useAlertScheme();

  const assignMovimentOne = (val) => {
    setMovimentOne((moviment) => ({
      ...moviment,
      ...val,
    }));
  };

  const assignMovimentTwo = (val) => {
    setMovimentTwo((moviment) => ({
      ...moviment,
      ...val,
    }));
  };

  const handleStepChange = (e) => {
    var data = {
      suplier: movimentOne.suplier,
      quantity: movimentOne.quantity,
      product: movimentTwo.product,
      description: movimentTwo.description,
    };

    setMoviment(data);

    console.log("Indo para a step: " + e.activeStep);
  };

  const RegisterMoviment = () => {
    openAlert(
      "success",
      "Testando Multistep no cadastro de movimentação",
      "Movimentação realizada com sucesso!"
    );
  };

  return (
    <ContentPage title="Movimentação de produto">
      <Stepper
        steps={steps}
        alertPanel={showAlert}
        onSave={RegisterMoviment}
        onStepChange={handleStepChange}
      >
        <FirstStep entityCallback={assignMovimentOne} alertPanel={openAlert} />
        <SecondStep entityCallback={assignMovimentTwo} alertPanel={openAlert} />
        <ThirdStep entity={moviment} />
      </Stepper>
    </ContentPage>
  );
}

export default MovimentCard;

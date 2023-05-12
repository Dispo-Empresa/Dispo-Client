import { MDBCol } from "mdb-react-ui-kit";
import moment from "moment";

import ContentPage from "../layouts/content/ContentPage";
import RegisterPanel from "../layouts/panel/register-panel/RegisterPanel";
import TextField from "../components/ui/textfields/form/TextField";
import useForm from "../hooks/useForm";
import { sleep } from "../utils/helperFunctions";
import { SelectWithFilter } from "../components/ui/textfields/form/SelectField";
import { FormikStep,FormikStepper } from "../components/structured/multi-step/MultiStep";

function PurchaseOder() {
  const initialState = {
    orderNumber: null,
    creationDate: moment().format("YYYY-MM-DD"),
    notificationType: "Email"
  };
  const {formValues, handleInputChange} = useForm(initialState);
  const notification = [
    { value: "Email", label: "Email" },
    { value: "Whatsapp", label: "Whatsapp" }
  ];

  const StepOne = () => {
    return(
     <RegisterPanel title="Informações da ordem de compra">
        <MDBCol>
            <TextField
              name="orderNumber"
              label="Número da ordem"
              value={formValues.orderNumber}
              onChange={handleInputChange}
            />
        </MDBCol>
        <MDBCol>
            <TextField
              name="creationDate"
              label="Data de criação"
              type="date"
              value={formValues.creationDate}
              onChange={handleInputChange}
            />    
        </MDBCol>
        <MDBCol>
            <SelectWithFilter
              name="notificationType"
              label="Tipo de notificação"
              options={notification}
              value={formValues.notificationType}
              onChange={handleInputChange}
            />    
        </MDBCol>
     </RegisterPanel>
    );
  };

  const StepTwo = () => {
    return <div>Programar aqui dentro</div>;
  };

  const StepThree = () => {
    return <div>Outra programagem aqui rs rs</div>;
  };

  return (
    <ContentPage title="Ordem de compra">
      <RegisterPanel>
        <FormikStepper
          initialValues={{}}
          onSubmit={async () => {
            await sleep(2000);
          }}
        >
          <FormikStep label="Informações da ordem de compra">
            <StepOne />
          </FormikStep>

          <FormikStep label="Detalhes">
            <StepTwo />
          </FormikStep>
          
          <FormikStep label="Confirmação">
            <StepThree />
          </FormikStep>

        </FormikStepper>
      </RegisterPanel>
    </ContentPage>
  );
}

export default PurchaseOder;

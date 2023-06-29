import { MDBCol } from "mdb-react-ui-kit";

import { UseFieldsStepOne } from "./UseFields";
import { Step } from "../../../components/structured/stepper/Stepper";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { SelectWithFilter } from "../../../components/ui/inputs/select/SelectField";

function StepOne(props){
    const [fields, handleFieldChange, handleExistsRequiredFieldsNotAnswered] = UseFieldsStepOne();

    const notification = [
      { value: "Email", label: "Email" },
      { value: "Whatsapp", label: "Whatsapp" }
    ];

    const handleNextStep = () => {
      if (handleExistsRequiredFieldsNotAnswered()) {
        props.alertPanel(
          "warning",
          "Existem campos obrigatórios não respondidos"
        );
        return;
      }

      props.entityCallback({
        orderNumber: fields.orderNumber,
        creationDate: fields.creationDate,
        notificationType: fields.notificationType
      });

      props.alertPanel(null);
      props.nextStep();
    };
  
    return (
      <Step {...props} onNextStep={handleNextStep}>
        <MDBCol>
              <TextField
                type="number"
                required
                name="orderNumber"
                label="Número da ordem"
                value={fields.orderNumber}
                onChange={(value) => handleFieldChange("orderNumber", value.target.value)}
              />
          </MDBCol>
          <MDBCol>
              <TextField
                required
                name="creationDate"
                label="Data de criação"
                type="date"
                value={fields.creationDate}
                onChange={(value) => handleFieldChange("creationDate", value.target.value)}
              />    
          </MDBCol>
          <MDBCol>
              <SelectWithFilter
                required
                name="notificationType"
                label="Tipo de notificação"
                options={notification}
                value={fields.notificationType}
                onChange={(value) => handleFieldChange("notificationType", value.target.value)}
              />    
          </MDBCol>
      </Step>
    );
  }

  export default StepOne; 
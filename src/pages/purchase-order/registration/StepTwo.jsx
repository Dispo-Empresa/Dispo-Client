import { MDBCol } from "mdb-react-ui-kit";

import { TextArea } from "../../../components/ui/inputs/textarea/TextArea";
import { CurrencyField}  from "../../../components/ui/inputs/currency/CurrencyField";
import { UseFieldsStepTwo } from "./UseFields";
import { Step } from "../../../components/structured/stepper/Stepper";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { SelectWithFilter } from "../../../components/ui/inputs/select/SelectField";

function StepTwo(props){
    const [fields, handleFieldChange, handleExistsRequiredFieldsNotAnswered] = UseFieldsStepTwo();

    const products = [
        { value: "Laranja", label: "Laranja"},
        { value: "Carne", label: "Carne"}   
      ];

    const supplier =[
    {value: "Matheus LTDA", label: "Matheus LTDA"},
    {value: "Teste MEI", label: "Teste MEI"}
    ]
      
    const handleNextStep = () => {
        if (handleExistsRequiredFieldsNotAnswered()) {
          props.alertPanel(
            "warning",
            "Existem campos obrigatórios não respondidos"
          );
          return;
        }
  
        props.entityCallback({
            supplier: fields.supplier,
            product: fields.product,
            quantity: fields.quantity,
            totalPurchaseValue: fields.quantity,
            shipping: fields.quantity,
            DeliveryTimeFrame: fields.quantity,
            description: fields.quantity,
        });
  
        props.alertPanel(null);
        props.nextStep();
      };

    return (
        <Step {...props} onNextStep={handleNextStep}>
            <MDBCol>
                <SelectWithFilter
                    required
                    name="supplier"
                    label="Fornecedor"
                    options={supplier}
                    value={fields.supplier}
                    onChange={(value) => handleFieldChange("supplier", value.target.value)}
                />
            </MDBCol>
            <MDBCol>
                <SelectWithFilter
                    required
                    name="product"
                    label="Produto"
                    options={products}
                    value={fields.product}
                    onChange={(value) => handleFieldChange("product", value.target.value)}
                />         
            </MDBCol>
            <MDBCol>
                <TextField
                    required
                    name="quantity"
                    label="Quantidade"
                    type="number"
                    value={fields.quantity}
                    onChange={(value) => handleFieldChange("quantity", value.target.value)}
                />
            </MDBCol>
            <MDBCol>
                <CurrencyField
                    required
                    name="totalPurchaseValue"
                    label="Valor total"
                    value={fields.totalPurchaseValue}
                    onChange={(value) => handleFieldChange("totalPurchaseValue", value)}
                />
            </MDBCol> 
            <MDBCol>
                <CurrencyField
                    required
                    name="shipping"
                    label="Frete"
                    value={fields.shipping}
                    onChange={(value) => handleFieldChange("shipping", value)}
                />
            </MDBCol>  
            <MDBCol>
                <TextField
                    required
                    name="DeliveryTimeFrame"
                    label="Tempo de entrega"
                    type="number"
                    placeholder="Dias úteis"
                    value={fields.DeliveryTimeFrame}
                    onChange={(value) => handleFieldChange("DeliveryTimeFrame", value.target.value)}
                />
            </MDBCol>  
            <MDBCol>
                <TextArea
                    name="description"
                    label="Descrição"
                    value={fields.description}
                    onChange={(value) => handleFieldChange("description", value.target.value)}
                />
            </MDBCol>
        </Step>
    );
}

export default StepTwo;
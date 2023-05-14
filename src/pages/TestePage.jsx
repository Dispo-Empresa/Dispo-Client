import React, { useState } from 'react';
import moment from "moment";
import { MDBCol } from "mdb-react-ui-kit";

import ContentPage from "../layouts/content/ContentPage";
import RegisterPanel from "../layouts/panel/register-panel/RegisterPanel";
import TextField from "../components/ui/textfields/form/TextField";
import useForm from "../hooks/useForm";
import CurrencyField from "../components/ui/textfields/form/CurrencyField";
import Datagrid from '../components/structured/datagrid/Datagrid';
import ButtonGroup from "../components/ui/buttons/group/ButtonGroup";
import TextArea from "../components/ui/textfields/form/TextArea";
import { sleep } from "../utils/helperFunctions";
import { SelectWithFilter } from "../components/ui/textfields/form/SelectField";
import { FormikStep,FormikStepper } from "../components/structured/multi-step/MultiStep";
import {SaveButton} from "../components/ui/buttons/icons/IconButton";

//#region Passos
  function StepOne (props) {
    return(
    <div>
        <RegisterPanel title="Informações da ordem de compra">
          <MDBCol>
              <TextField
                name="orderNumber"
                label="Número da ordem"
                value={props.orderNumber}
                onChange={props.handleInputChange}
                placeholder="EX:123"
              />
          </MDBCol>
          <MDBCol>
              <TextField
                name="creationDate"
                label="Data de criação"
                type="date"
                value={props.creationDate}
                onChange={props.handleInputChange}
              />    
          </MDBCol>
          <MDBCol>
              <SelectWithFilter
                name="notificationType"
                label="Tipo de notificação"
                options={props.notification}
                value={props.notificationType}
                onChange={props.handleInputChange}
              />    
          </MDBCol>
        </RegisterPanel>
    </div> 
    );
  };

  function StepTwo(props) {
    //#region eventos
      const handleAddProduct = (event) => {
        event.preventDefault();
        const data = 
          {
            supplier: props.supplier,
            product: props.product,
            quantity: props.quantity,
            totalPurchaseValue: totalPurchaseValue
          };
        setFormData([...formData, data]);
      };
    //#endregion

    //#region objetos
      const [formData, setFormData] = useState([]);
      const [totalPurchaseValue, setTotalPurchaseValue] = useState(0);
      const [shipping, setShipping] = useState(0);
      const [deliveryTimeFrame, setDeliveryTimeFrame] = useState([])

      const products = [
        { value: "Laranja", label: "Laranja"},
        { value: "Carne", label: "Carne"}   
      ];
      const supplier =[
        {value: "Matheus LTDA", label: "Matheus LTDA"},
        {value: "Teste MEI", label: "Teste MEI"}
      ] 
      
      const columns = [
        { field: "supplier", label: "Fornecedor", width: 100, sort: false },
        { field: "product", label: "Produto", width: 100, sort: false },
        { field: "quantity", label: "Quantidade", width: 100, sort: false },
        { field: "totalPurchaseValue", label: "Valor Total", width: 100, sort: false },
      ];
      
      const pageConfig = {
        buttons:(
          <ButtonGroup>
            <SaveButton
              title="Inserir produto"
              type="button"
              onClick={handleAddProduct}
            /> 
          </ButtonGroup>        
        )
      };
    //#endregion
   
    return (
      <ContentPage {...pageConfig}>
        <RegisterPanel title="Informações do pedido">
          <MDBCol>
            <SelectWithFilter
              name="supplier"
              label="Fornecedor"
              options={supplier}
              value={props.supplier}
              onChange={props.handleInputChange}
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              name="product"
              label="Produto"
              options={products}
              value={props.product}
              onChange={props.handleInputChange}
            />         
          </MDBCol>
          <MDBCol>
            <TextField
              name="quantity"
              label="Quantidade"
              type="number"
              value={props.quantity}
              onChange={props.handleInputChange}
            />
          </MDBCol>
          <MDBCol>
            <CurrencyField
              name="totalPurchaseValue"
              label="Valor total"
              value={totalPurchaseValue}
              disabled={true}
            />
          </MDBCol> 
          <MDBCol>
            <CurrencyField
              name="shipping"
              label="Frete"
              value={shipping}
              disabled={true}
            />
          </MDBCol>  
          <MDBCol>
            <TextField
              name="DeliveryTimeFrame"
              label="Tempo de entrega"
              type="number"
              placeholder="Dias úteis"
              value={deliveryTimeFrame}
              disabled={true}
            />
          </MDBCol>  
          <MDBCol>
            <TextArea
              name="description"
              label="Descrição"
              value={props.description}
              onChange={props.handleInputChange}
            />
          </MDBCol>            
        </RegisterPanel>     
        <RegisterPanel>
          <MDBCol>      
            <Datagrid
              columns={columns}
              data={formData}
            />
          </MDBCol>
        </RegisterPanel>
      </ContentPage>                  
    );
  }
   

  function StepThree (props){
    return(
      <div>
        
      </div>
    );
  }
//#endregion

function PurchaseOder() {
  //#region objetos
    const initialState = {
      orderNumber: null,
      creationDate: moment().format("YYYY-MM-DD"),
      notificationType: "Email",
      product: null,
      quantity: null,
      supplier: null,
      description: null
    };
    const {formValues, handleInputChange} = useForm(initialState);

    const notification = [
      { value: "Email", label: "Email" },
      { value: "Whatsapp", label: "Whatsapp" }
    ];
  //#endregion
    
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
            <StepOne 
              orderNumber={formValues.orderNumber}  
              creationDate={formValues.creationDate}
              notificationType={formValues.notificationType}
              notification={notification}
              handleInputChange={handleInputChange}       
            />
          </FormikStep>

          <FormikStep label="Informações do pedido">
            <StepTwo 
              product={formValues.product}
              quantity={formValues.quantity}
              supplier={formValues.supplier}
              description={formValues.description}
              handleInputChange={handleInputChange}
            />
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

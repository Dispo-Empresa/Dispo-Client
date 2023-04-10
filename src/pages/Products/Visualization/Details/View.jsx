import FormTabs from "../../../../components/Structured/Tabs/FormTabs"

import { useState, useEffect } from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBTextFieldView, MDBTextArea } from "../../../../components/Basic/TextField/MDBTextField/TextField"
import { DefaultCurrencyTextField } from "../../../../components/Basic/TextField/TextField"
import { FormView } from "../../../../components/Structured/Layouts/Content/FormVisualization/Form";
import { handleGetProductById } from "../../../../services/Getters/products"

export default function ModalView(props) {

  const [name, setName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [color, setColor] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [unitOfMeansurement, setUnitOfMeansurement] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [inventoryId, setInventoryId] = useState("");

  useEffect(() => {
    GetProductInfo(props.productId);
  }, []);

  function GetProductInfo(productId) {

    handleGetProductById(productId)
    .then(function(res) {
      
      setName(res.data.name);
      setUnitPrice(res.data.unitPrice);
      setColor(res.data.color);
      setCode(res.data.code);
      setDescription(res.data.description);
      setUnitOfMeansurement(res.data.unitOfMeansurement);
      setType(res.data.type);
      setBrand(res.data.brandId);
      setInventoryId(res.data.inventoryId);

    })
    .catch(function(err) {
      console.log(err);
    })
  };

  function MainInfo() {
    return (
      <MDBRow className='g-5'>
        <MDBCol>
          <MDBTextFieldView label="Name" value={name} />
        </MDBCol>
        <MDBCol>
          <DefaultCurrencyTextField label="UnitPrice" value={unitPrice} disabled />
        </MDBCol>
        <MDBCol>
          <MDBTextFieldView label="Color" value={color} />
        </MDBCol>
        <MDBCol>
          <MDBTextFieldView label="Code" value={code} />
        </MDBCol>
        <MDBCol>
          <MDBTextFieldView label="Brand" value={brand} />
        </MDBCol>
        <MDBCol>
          <MDBTextFieldView label="Inventory" value={inventoryId} />
        </MDBCol>
      </MDBRow>
    );
  }

  function AdditionalInfo() {
    return (
      <MDBRow className='g-5'>
        <MDBCol>
          <MDBTextArea label="Description" value={description} disabled />
        </MDBCol>
        <MDBCol>
          <MDBTextFieldView label="UnitOfMeansurement" value={unitOfMeansurement} />
        </MDBCol>
        <MDBCol>
          <MDBTextFieldView label="Type" value={type} />
        </MDBCol>
      </MDBRow>
    );
  }

  const tabs = [
    { id: 1, title: 'Informações Principais', content: <MainInfo /> },
    { id: 2, title: 'Informações Adicionais', content: <AdditionalInfo /> },
  ];

  return (
    <FormView>
      <FormTabs tabs={tabs} />
    </FormView>
  );
};
import FormTabs from "../../../../components/Structured/Tabs/FormTabs"

import { useState, useEffect } from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBTextArea, MDBSelectTextField, MDBTextField } from "../../../../components/Basic/TextField/MDBTextField/TextField"
import { DefaultCurrencyTextField } from "../../../../components/Basic/TextField/TextField"
import { FormEdit } from "../../../../components/Structured/Layouts/Content/FormVisualization/Form";
import { handleGetProductById } from "../../../../services/Getters/products"

export default function ModalEdit(props) {

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

  const selectTest = [
    { label: "Teste", value: "teste" },
    { label: "Teste2", value: "teste2" },
    { label: "Teste3", value: "teste3" },
    { label: "Teste4", value: "teste4" },
  ];

  function MainInfo() {
    return (
      <MDBRow className='g-5'>
        <MDBCol>
          <MDBTextField label="Nome" value={name} onChange={(e) => { setName(e.target.value) }} />
        </MDBCol>
        <MDBCol>
          <DefaultCurrencyTextField label="Valor unitário" value={unitPrice} onChange={(e) => { setUnitPrice(e.target.value) }} />
        </MDBCol>
        <MDBCol>
          <MDBSelectTextField label="Cor" value={color} onChange={(e) => { setColor(e.target.value) }} options={selectTest} />
        </MDBCol>
        <MDBCol>
          <MDBTextField label="Code" value={code} disabled />
        </MDBCol>
        <MDBCol>
          <MDBSelectTextField label="Brand" value={brand} onChange={(e) => { setBrand(e.target.value) }} options={selectTest} />
        </MDBCol>
        <MDBCol>
          <MDBSelectTextField label="Inventory" value={inventoryId} onChange={(e) => { setInventoryId(e.target.value) }} options={selectTest} />
        </MDBCol>
      </MDBRow>
    );
  }

  function AdditionalInfo() {
    return (
      <MDBRow className='g-5'>
        <MDBCol>
          <MDBTextArea label="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
        </MDBCol>
        <MDBCol>
          <MDBSelectTextField label="UnitOfMeansurement" value={unitOfMeansurement} onChange={(e) => { setUnitOfMeansurement(e.target.value) }} options={selectTest} />
        </MDBCol>
        <MDBCol>
          <MDBSelectTextField label="Type" value={type} onChange={(e) => { setType(e.target.value) }} options={selectTest} />
        </MDBCol>
      </MDBRow>
    );
  }

  const tabs = [
    { id: 1, title: 'Informações Principais', content: <MainInfo /> },
    { id: 2, title: 'Informações Adicionais', content: <AdditionalInfo /> },
  ];

  return (
    <FormEdit onSave={() => { alert("Salvando dados do produto") } } onDelete={() => { alert("Deletando dados do produto") } }>
      <FormTabs tabs={tabs} />
    </FormEdit>
  );
};
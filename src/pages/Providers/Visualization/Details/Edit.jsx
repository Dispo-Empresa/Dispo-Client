import FormTabs from "../../../../components/Structured/Tabs/FormTabs"

import { useState, useEffect } from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBTextField } from "../../../../components/Basic/TextField/MDBTextField/TextField"
import { FormEdit } from "../../../../components/Structured/Layouts/Content/FormVisualization/Form";
import { handleGetProviderById } from "../../../../services/Getters/providers"

export default function ModalEdit(props) {

  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  
  useEffect(() => {
    GetProviderInfo(props.providerId);
  }, []);
  
  function GetProviderInfo(providerId) {
  
    handleGetProviderById(providerId)
    .then(function(res) {

      setName(res.data.name);
      setCnpj(res.data.cnpj);
  
    })
    .catch(function(err) {
      console.log(err);
    })
  };

  function MainInfo() {
    return (
      <MDBRow className='g-4'>
        <MDBCol md='6'>
          <MDBTextField label="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
        </MDBCol>
        <MDBCol md='6'>
          <MDBTextField label="CNPJ" value={cnpj} onChange={(e) => { setCnpj(e.target.value) }} />
        </MDBCol>
      </MDBRow>
    );
  }

  function AdditionalInfo() {
    return (
      <MDBRow className='g-5'>
        <MDBCol>
        </MDBCol>
      </MDBRow>
    );
  }

  const tabs = [
    { id: 1, title: 'Informações Principais', content: <MainInfo /> },
    { id: 2, title: 'Informações Adicionais', content: <AdditionalInfo /> },
  ];

  return (
    <FormEdit onSave={() => { alert("Salvando dados do fornecedor") } } onDelete={() => { alert("Deletando dados do fornecedor") } }>
      <FormTabs tabs={tabs} />
    </FormEdit>
  );
}
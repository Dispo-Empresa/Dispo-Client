import FormTabs from "../../../../components/Structured/Tabs/FormTabs"

import { useState, useEffect } from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBTextFieldView } from "../../../../components/Basic/TextField/MDBTextField/TextField"
import { FormView } from "../../../../components/Structured/Layouts/Content/FormVisualization/Form";
import { handleGetProviderById } from "../../../../services/Getters/providers"

export default function ModalView(props) {

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
      <MDBRow className='g-5'>
        <MDBCol>
          <MDBTextFieldView label="Name" value={name} />
        </MDBCol>
        <MDBCol>
          <MDBTextFieldView label="CNPJ" value={cnpj} />
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
    <FormView>
      <FormTabs tabs={tabs} />
    </FormView>
  );
}
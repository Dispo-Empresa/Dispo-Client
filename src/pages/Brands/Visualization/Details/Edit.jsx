import FormTabs from "../../../../components/Structured/Tabs/FormTabs"

import { useState, useEffect } from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBTextField } from "../../../../components/Basic/TextField/MDBTextField/TextField"
import { handleGetBrandById } from "../../../../services/Getters/brand"
import { FormEdit } from "../../../../components/Structured/Layouts/Content/FormVisualization/Form"

export default function ModalEdit(props) {

  const [name, setName] = useState("");  
  useEffect(() => {
    GetBrandInfo(props.brandId);
  }, []);
  
  function GetBrandInfo(brandId) {
    
    handleGetBrandById(brandId)
    .then(function(res) {
      
      setName(res.data.name);
    })
    .catch(function(err) {
      console.log(err);
    })
  };
  
  function MainInfo() {
    return (
      <MDBRow className='g-5'>
        <MDBCol>
          <MDBTextField label="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
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
    <FormEdit onSave={() => { alert("Salvando dados da marca") } } onDelete={() => { alert("Deletando dados da marca") } }>
      <FormTabs tabs={tabs} />
    </FormEdit>
  );
}
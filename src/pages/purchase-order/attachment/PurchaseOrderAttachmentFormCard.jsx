import ContentPage from "../../../layouts/content/ContentPage";
import Datatable from "../../../components/structured/datatable/Datatable";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {ContentOrderAttachmentModal} from "./ContentOrderAttachmentModal"
import ModalDialog from "../../../components/structured/modal/ModalDialog";
import { useState } from "react";


function PurchaseOrderAttachmentFormCard(){
 
  const [showModal, setShowModal] = useState(false);

    const buttonStyle = {
        background: `url(${AttachFileIcon}) center / contain no-repeat`,
        width: '5px',
        height: '5px',
        border: 'none',
        cursor: 'pointer',
      };

    const data = [
        {orderNumber: 123, 
         company: "benner sistema",
         supplier: "mercado angelone",
         creationDate: "12/05/2045",
         attachment: (
            <button  name="buttonAttachment" style={buttonStyle} onClick={() => setShowModal(true)}>
              <AttachFileIcon />
            </button>
          )
        },
        {orderNumber: 123, 
            company: "benner sistema",
            supplier: "mercado angelone",
            creationDate: "12/05/2045",
            attachment: (
               <button  name="buttonAttachment" style={buttonStyle}>
                 <AttachFileIcon />
               </button>
             )
           }
    ];

    const columns = [
        { label: "Número ordem", field: "orderNumber", sort: false, width: 100 },
        { label: "Empresa", field: "company", sort: false, width: 250 },
        { label: "Fornecedor", field: "supplier", sort: false, width: 250 },
        { label: "Data criação", field: "creationDate", sort: false, width: 100 },
        { label: "Anexos", field: "attachment", sort: false, width: 100 },
        { label: "", field: "crud", sort: false, width: 100 }
    ];

    return(
        <ContentPage title="Anexos de ordem de compra">
          <ModalDialog title="Modal" open={showModal} onClose={() => setShowModal(false)}>
            <ContentOrderAttachmentModal/>
          </ModalDialog>
            <Datatable
                data={data}
                columns={columns}
                rowsPerPageOptions={[10, 20, 30]}
                rowsPerPage={10}
            />
        </ContentPage>
    );
}

export default PurchaseOrderAttachmentFormCard;
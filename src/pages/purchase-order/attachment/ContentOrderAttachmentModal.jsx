import React, { useRef, useState } from 'react';
import ContentPage from "../../../layouts/content/ContentPage";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Datatable from "../../../components/structured/datatable/Datatable";
import FileInputButton from '../attachment/FileInputButton'; 
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { styleAttachment } from "../attachment/styles";

function ContentOrderAttachmentModal() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const createSpacerDiv = (height) => {
    return <div style={{ height: `${height}px` }} />;
  };

  const handleFileSelect = (file) => {
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
  };

  const handleDeleteAttachment = (fileToDelete) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((file) => file !== fileToDelete)
    );
  };

  const buttonStyle = {
    background: `url(${DeleteOutlineIcon}) center / contain no-repeat`,
    width: '30px',
    height: '30px',
    border: 'none',
    cursor: 'pointer',
  };
  
  const data = selectedFiles.map((file) => ({
    attachmentColumns: file.name,
    attachmentLink: URL.createObjectURL(file),
    deleteButton: (
      <button
        style={buttonStyle}
        onClick={() => handleDeleteAttachment(file)}
      >
        <DeleteOutlineIcon />
      </button>
    ),
  }));

  const columns = [
    { label: "Nome", field: "attachmentColumns", sort: false, width: 100 },
    {
      label: "Url",
      field: "attachmentLink",
      sort: false,
      width: 150,
      format: (value, row) => (
        <div style={{ cursor: "pointer" }} onClick={() => window.open(value, "_blank")}>
          {row.attachmentColumns}
        </div>
      ),
    },
    {
      label: "Excluir",
      field: "deleteButton",
      sort: false,
      width: 100,
      format: (value, row) => value,
    },
  ];

  const handleDeleteSelectedAttachments = () => {
    setSelectedFiles([]);
  };

  return (
    <div style={{ height: '100%' }}>
      <div style={styleAttachment.container}>
        {createSpacerDiv(15)}
        <div style={styleAttachment.iconContainer}>
          <UploadFileIcon style={styleAttachment.icon} />
        </div>
        {createSpacerDiv(15)}
        <p style={styleAttachment.text}>Arraste e solte arquivos aqui ou</p>
        <FileInputButton onFileSelect={handleFileSelect} />
        {createSpacerDiv(15)}
      </div> 
      <ContentPage title ="Arquivos" button ="teste">
        <Datatable
          data={data}
          columns={columns}
          rowsPerPageOptions={[10, 20, 30]}
          rowsPerPage={10}
          noDataComponent={null} 
        />
      </ContentPage>
    </div>
  );
}

export { ContentOrderAttachmentModal };

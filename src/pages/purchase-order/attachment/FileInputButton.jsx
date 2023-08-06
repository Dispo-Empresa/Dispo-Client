import React, { useRef } from 'react';
import { styleAttachment } from "../attachment/styles"; 

const FileInputButton = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    onFileSelect(selectedFile);
  };

  return (
    <div className="custom-file-input">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".pdf, .png"
        multiple="multiple"
      />
      <button style={styleAttachment.button} onClick={handleButtonClick}>
        Selecionar Arquivo
      </button>
    </div>
  );
};

export default FileInputButton;
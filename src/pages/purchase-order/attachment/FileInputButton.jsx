import React, { useRef } from 'react';
import '../attachment/styles.css'

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
    <div className="styleAttachment-container"> {/* Use the appropriate CSS class name */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".pdf, .png"
        multiple="multiple"
      />
      <button className="styleAttachment-button" onClick={handleButtonClick}> {/* Use the appropriate CSS class name */}
        Selecionar Arquivo
      </button>
    </div>
  );
};

export default FileInputButton;

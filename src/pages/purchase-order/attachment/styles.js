export const ModalDefaultStyle = {
  width: "1200px",
  overflowX: "auto",
  maxHeight: "800px",
  borderRadius: "10px",
  outline: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  p: 5,
}
  
  export const CloseButton = {
    color: "#000",
  
    "&:hover": {
      bgcolor: "#e43846",
      color: "#ffff"
    }
  };
  
  export const ModalHeader = {
    marginBottom: "7%"
  };
  
  export const ModalTitle = {
    float: "left",
    marginTop: "5px",
    marginLeft: "1%"
  };
  
  
  export const ModalCloseButton = {
    float: "right",
    marginRight: "0.5%"
  };

  export const styleAttachment = {
    container: {
      width: '100%',
      height: '100%',
      border: '1px solid #808080',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5% auto',
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
    },
    iconContainer: {
      height: '20px',
    },
    icon: {
      fontSize: 48,
    },
    text: {
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '20px 0',
    },
    button: {
      backgroundColor: '#222799',
      color: 'white',
      borderRadius: '50px',
      padding: '10px 20px',
      border: 'none',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.4), 0px 4px 15px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '10px',
    },
  };
  
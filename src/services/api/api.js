import axios from "axios"

const apiConfig = axios.create({
  baseURL: "https://localhost:7153/api/v1/",
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
  }
});

const callApi = async (endpoint, method, data = null) => {
  
  const config = {
    url: "https://localhost:7153/api/v1/" + endpoint,
    method: method,
    data: data
  };
  
  try {

    const response = await apiConfig(config);

    if (!response.data) {
      throw new Error(`Data fetch error ${response.status}`);
    }
    
    return response.data;

  } catch (error) {
    
    if(error.response && error.response.status === 400){

      console.log(error.response.data.errors);
    }else if(error.code === "ERR_NETWORK"){

      console.log("Serviço não encontrado ou fora do ar");
    }else{

      console.log("Erro inesperado: " + error);
    }
    
  }
};

export default callApi;
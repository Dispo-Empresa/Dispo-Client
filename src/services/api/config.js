import axios from "axios"

import { getToken } from "../Getters/lsTokenService"

const baseURL = "https://localhost:7153/api/v1/";

const createAPIEndpoint = (endpoint) => {
    
    const url = baseURL + endpoint;
    const jwtToken = getToken();
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    }

    return {
        getAll: () => axios.get(url, header),
        getBy: data => axios.get(url + data, header),
        post: newRecord => axios.post(url, newRecord, header),
        put: (id, updateRecord) => axios.put(`${url}/${id}`, updateRecord, header),
        delete: id => axios.delete(url + id, header)
    }
};

export default createAPIEndpoint;
import { callApi } from "./api"

import { API_RESPONSE, joinParameters } from "./helper";

const get = async (endpoint, parameters) => {

    if(parameters == null || parameters === undefined){
        return await callApi(endpoint, 'get');
    }

    endpoint = joinParameters(endpoint, parameters);

    return await callApi(endpoint, 'get');
}

const post = async (endpoint, data, contentType) => 
    await callApi(endpoint, 'post', data, contentType);

const put = async (endpoint, id, data) => {

    if(id <= 0){
        return API_RESPONSE(
            null,
            'Id Inválido',
            'Parâmetro ID deve ser informado!',
            false,
            'error',
            400
        );
    }

    endpoint = joinParameters(endpoint, id);

    return await callApi(endpoint, 'put', data);
}

const remove = async (endpoint, id) => {

    if(id <= 0){
        return API_RESPONSE(
            null,
            'Id Inválido',
            'Parâmetro ID deve ser informado!',
            false,
            'error',
            400
        );
    }

    endpoint = joinParameters(endpoint, id);

    return await callApi(endpoint, 'delete');
}

export { get, post, put, remove };
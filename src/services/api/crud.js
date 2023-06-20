import { callApi, callApiSync } from "./api"

const get = async (endpoint) => {
    return await callApi(endpoint, 'get');
}

const getSync = (endpoint) => {
    return callApiSync(endpoint, 'get');
}

const post = async (endpoint, data) => {

    return await callApi(endpoint, 'post', data);
};

const put = async (endpoint, id, data) => {

    return await callApi(`${endpoint}${id}`, 'put', data);
};

const remove = async (endpoint, id) => {
    
    await callApi(`${endpoint}${id}`, 'delete');
    console.log(`Record with ID: ${id} deleted.`);
};

export { get, getSync, post, put, remove };
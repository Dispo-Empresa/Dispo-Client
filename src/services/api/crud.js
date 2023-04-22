import callApi from "./api"

const create = async (endpoint, data) => {

    const response = await callApi(endpoint, 'post', data);
    console.log(response);
};

const getAll = async (endpoint) => {

    const response = await callApi(endpoint, 'get');
    console.log(response);
};

const getById = async (endpoint, id) => {

    const response = await callApi(`${endpoint}${id}`, 'get');
    console.log(response);
};

const update = async (endpoint, id, data) => {

    const response = await callApi(`${endpoint}${id}`, 'put', data);
    console.log(response);
};

const remove = async (endpoint, id) => {
    
    await callApi(`${endpoint}${id}`, 'delete');
    console.log(`Record with ID: ${id} deleted.`);
};

export { create, getAll, getById, update, remove };
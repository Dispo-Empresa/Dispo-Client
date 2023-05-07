import callApi from "./api"

const post = async (endpoint, data) => {

    return await callApi(endpoint, 'post', data);
};

const put = async (endpoint, id, data) => {

    const response = await callApi(`${endpoint}${id}`, 'put', data);
    console.log(response);
};

const remove = async (endpoint, id) => {
    
    await callApi(`${endpoint}${id}`, 'delete');
    console.log(`Record with ID: ${id} deleted.`);
};

export { post, put, remove };
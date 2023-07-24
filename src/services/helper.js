const API_RESPONSE = (dataParam = null, titleParam = '', messageParam = '', successParam = false, alertTypeParam = '', codeParam = 400) => {
    let response = {
      data: dataParam,
      title: titleParam,
      message: messageParam,
      success: successParam,
      alertType: alertTypeParam,
      code: codeParam
    };
    return response;
}

function joinParameters(endpoint, parameters){

    if(parameters == null || parameters === undefined){
      return endpoint;
    }

    var lastIndex = endpoint.lastIndexOf("/");
        if (lastIndex !== -1) {
          endpoint = endpoint.substring(0, lastIndex + 1);
        }

    if (typeof parameters === "number") {
        return `${endpoint}${parameters}`;
    }

    if (parameters && parameters.length > 0) {
        for (var i = 0; i < parameters.length; i++) {
            endpoint += encodeURIComponent(parameters[i].key) + "=" + encodeURIComponent(parameters[i].value);
          if (i !== parameters.length - 1) {
            endpoint += "&";
          }
        }
    }
    
    return endpoint;
}

export { API_RESPONSE, joinParameters }


export function checkResponse(response) {
    //if (response.ok) {
    //    return response.json();
    //}
    //return Promise.reject(`Ошибка ${response.status}`);
    return response.json();
}

export function checkSuccess(jsonData) {
    const { success, ...data } = jsonData
    if (success) {
        return Promise.resolve(data);
    } else {
        return Promise.reject(data.message);
    }
}

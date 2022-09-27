export interface IResponse {
    success: boolean
    message?: string
    [name: string]: any
}

export function checkResponse(response: Response): Promise<IResponse> {
    //if (response.ok) {
    //    return response.json();
    //}
    //return Promise.reject(`Ошибка ${response.status}`);
    return response.json();
}

export function checkSuccess(jsonData: IResponse) {
    const { success, ...data } = jsonData
    if (success) {
        return Promise.resolve(data);
    } else {
        return Promise.reject(data.message);
    }
}

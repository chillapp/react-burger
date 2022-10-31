export interface IResponse {
    success: boolean
    message?: string
    [name: string]: any
}

export async function checkResponse(response: Response): Promise<IResponse> {
    if (response.ok) {
        return response.json();
    }
    const data = await response.json();
    if (data.message) {
        return Promise.reject(data.message);
    }
    return Promise.reject(`Ошибка ${response.status}`);
}

export function checkSuccess<T>(jsonData: IResponse) {
    const { success, ...data } = jsonData
    if (success) {
        return Promise.resolve(data as T);
    } else {
        return Promise.reject(data.message);
    }
}

export const getApiUrl = (endpoint: string): string => `https://norma.nomoreparties.space/api/${endpoint}`;

export const getWsApiUrl = (endpoint: string): string => `wss://norma.nomoreparties.space/${endpoint}`;

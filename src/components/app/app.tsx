import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerPage from "../burger-page/burger-page";

const api = 'https://norma.nomoreparties.space/api/ingredients';
export default function App() {
    const [data, setData] = React.useState([]);
    const [error, setError] = React.useState({has: false, message: ''});

    React.useEffect(() => getIngredients(), []);

    const getIngredients = () => {
        setError({has: false, message: ''});
        fetch(api, { method: 'GET' }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`);
        }).then(data => {
            if (data.success) {
                setData(data.data);
            } else {
                return Promise.reject(`Ошибка ${data}`);
            }
        }).catch(error => setError({has: true, message: error}));


    }

    return (
        <>
            <AppHeader/>
            {error.has ? <span>{error.message}</span> : <BurgerPage data={data}/>}
        </>
    );
}

;

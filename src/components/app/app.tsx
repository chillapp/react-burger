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
        const promise = fetch(api, { method: 'GET' });
        promise.then(response => {
            if (response.ok) {
                const dataPromise = response.json();
                dataPromise.then(data => {
                    if (data.success) {
                        setData(data.data);
                    } else {
                        setError({has: true, message: 'response error'});
                    }
                })
            } else {
                setError({has: true, message: 'request error'});
            }
        });
        promise.catch(error => setError({has: true, message: error}));
    }

    return (
        <>
            <AppHeader/>
            {error.has ? `<span>${error.message}</span>` : <BurgerPage data={data}/>}
        </>
    );
}

;

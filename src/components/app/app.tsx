import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerPage from "../burger-page/burger-page";
import { checkResponse, checkSuccess } from "../../services/http";
import {BurgerContext} from "../../services/burgerContext";

// @ts-ignore
export const getApiUrl = endpoint => `https://norma.nomoreparties.space/api/${endpoint}`;

export default function App() {
    const [data, setData] = React.useState([]);
    const [error, setError] = React.useState({has: false, message: ''});

    React.useEffect(() => getIngredients(), []);

    const getIngredients = () => {
        setError({has: false, message: ''});
        fetch(getApiUrl('ingredients'))
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => setData(payload.data))
            .catch(error => setError({has: true, message: error}));
    }

    return (
        <>
            <AppHeader/>
            {error.has ? <span>{error.message}</span> : (
                <BurgerContext.Provider value={data}>
                    <BurgerPage />
                </BurgerContext.Provider>
            )}
        </>
    );
}

;

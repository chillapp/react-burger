import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerPage from "../burger-page/burger-page";

// @ts-ignore
export const getApiUrl = endpoint => `https://norma.nomoreparties.space/api/${endpoint}`;

export default function App() {
    return (
        <>
            <AppHeader/>
            <BurgerPage />
        </>
    );
}

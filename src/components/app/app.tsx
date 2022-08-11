import React from 'react';
import data from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerPage from "../burger-page/burger-page";

export default function App() {
    return (
        <>
            <AppHeader />
            <BurgerPage data={data}/>
        </>
    );
}

;

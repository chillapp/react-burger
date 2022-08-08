import React from 'react';
import AppHeader from "./components/app-header/app-header";
import data from "./utils/data";
import BurgerPage from "./components/burger-page/burger-page";

function App() {
    return (
        <>
            <AppHeader></AppHeader>
            <BurgerPage data={data}/>
        </>
    );
}

export default App;

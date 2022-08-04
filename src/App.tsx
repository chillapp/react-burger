import React from 'react';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingridients/burger-ingridients";
import data from "./utils/data";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

function App() {
    return (
        <>
            <AppHeader></AppHeader>
            <div style={{display:'flex',justifyContent:'center'}}>
                <BurgerIngredients data={data}></BurgerIngredients>
                <BurgerConstructor></BurgerConstructor>
            </div>
        </>
    );
}

export default App;

import React from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

class BurgerIngridientsItem extends React.Component {
    render() {
        const item = this.props.data;
        return (
            <div style={{flex: "1", display: "flex", flexDirection: "column", alignItems:"center", justifyContent:"center"}}>
                <div style={{width:'240px',height:'120'}}>
                    <img src={item.image}  alt=''/>
                </div>
                <div style={{display:"flex", alignItems: "center"}}>
                    <span className='pr-3 text text_type_digits-default'>{item.price}</span>
                    <CurrencyIcon type='primary'/>
                </div>
                <span className='pt-1' style={{textAlign: "center"}}>{item.name}</span>
            </div>
        )
    }
}

export default BurgerIngridientsItem;

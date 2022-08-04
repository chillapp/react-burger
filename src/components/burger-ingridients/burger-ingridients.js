import React from "react";
import styles from './burger-ingridients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngridientsItem from "./burger-ingridients-item/burger-ingridients-item";

class BurgerIngredients extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 'one',
            cart: []
        }
    }

    render() {
        return (
            <section style={{ display:'flex', flexDirection: 'column', width: '600px' }} className='pt-10'>
                <span style={{ fontSize: '36px' }}>Соберите бургер</span>
                <div style={{ display: 'flex', fontWeight: '700' }} className='pt-5'>
                    <Tab value="one" active={this.state.current === 'one'} onClick={this.setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={this.state.current === 'two'} onClick={this.setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={this.state.current === 'three'} onClick={this.setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <section style={{overflowY: 'scroll', maxHeight: "calc(100vh - 125px)"}} className={styles.customScrollBar}>
                    {this.renderBun()}
                    {this.renderSauce()}
                    {this.renderMain()}
                </section>
            </section>
        )
    }

    setCurrent = (value) => {
        this.setState({current: value});
        this.executeScroll(value);
    }

    executeScroll = (value) => {
        const el = document.getElementById(`goto-${value}`);
        el.scrollIntoView();
    }

    renderBun = () => {
        const buns = this.props.data.filter(item => item.type === 'bun');
        return (
            <>
                <div id='goto-one' className='text text_type_main-medium pt-10 mb-6'>Булки</div>
                <div style={{display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: "center"}}>
                    {
                        buns.map(item => <BurgerIngridientsItem addToCart={this.addToCart} key={item._id} data={item}/>)
                    }
                </div>
            </>
        )
    }

    renderSauce = () => {
        const sauces = this.props.data.filter(item => item.type === 'sauce');
        return (
            <>
                <div id='goto-two' className='text text_type_main-medium pt-10 mb-6'>Соусы</div>
                <div style={{display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: "center"}}>
                    {
                        sauces.map(item => <BurgerIngridientsItem key={item._id} data={item}/>)
                    }
                </div>
            </>
        )
    }

    renderMain = () => {
        const mains = this.props.data.filter(item => item.type === 'main');
        return (
            <>
                <div id='goto-three' className='text text_type_main-medium pt-10 mb-6'>Начинки</div>
                <div style={{display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: "center"}}>
                    {
                        mains.map(item => <BurgerIngridientsItem key={item._id} data={item}/>)
                    }
                </div>
            </>
        )
    }

    addToCart = (item) => {
        console.log(item);
    }

}

export default BurgerIngredients;

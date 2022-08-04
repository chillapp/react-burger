import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingridients-item.module.css';


class BurgerIngridientsItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
        }
    }

    render() {
        const item = this.props.data;
        return (
            <div className={styles.item} onClick={this.incItem}>
                {this.state.selected > 0 ? <Counter count={this.state.selected}/> : null}
                <div className={styles.image}>
                    <img src={item.image}  alt=''/>
                </div>
                <div className={styles.price}>
                    <span className='pr-3 text text_type_digits-default'>{item.price}</span>
                    <CurrencyIcon type='primary'/>
                </div>
                <span className={`${styles.name} pt-1`}>{item.name}</span>
            </div>
        )
    }

    incItem = () => {
        this.setState((state) => {
            if (this.props.data.type === 'bun') {
                if (state.selected > 0) {
                    return {selected: state.selected - 1};
                } else {
                    return {selected: state.selected + 1};
                }
            } else {
                return {selected: state.selected + 1};
            }
        });

    }
}

export default BurgerIngridientsItem;

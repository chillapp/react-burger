import React from "react";
import ReactDOM from 'react-dom'

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './modal.module.css'
import CommonStyles from '../../styles/common.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ header, children, onClose }) {

    const closeByEsc = (e) => {
        if (e.keyCode === 27) onClose();
    }

    const addEvent = () => {
        document.addEventListener('keyup', closeByEsc);
    }
    const removeEvent = () => {
        document.removeEventListener('keyup', closeByEsc);
    }

    React.useEffect(() => {
        addEvent();
        return () => removeEvent();
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className={`${Styles.modal}`}>
                <div className={`pt-10 pr-10 pl-10 ${CommonStyles.flexRow} ${CommonStyles.flexJCBetween}`}>
                    <span className='text text_type_main-medium'>{ header }</span>
                    <button onClick={onClose} className={`${CommonStyles.button}`}>
                        <CloseIcon type='primary'/>
                    </button>
                </div>
                <div className={`p-10`}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClick={onClose}/>
        </>,
        modalRoot
    );
}

Modal.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

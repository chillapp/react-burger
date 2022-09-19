import React from "react";
import ReactDOM from 'react-dom'

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './modal.module.css'
import CommonStyles from '../../styles/common.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ header, children, onClose }) {

    React.useEffect(() => {
        const closeByEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keyup', closeByEsc);
        return () => document.removeEventListener('keyup', closeByEsc);
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
    children: PropTypes.any,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

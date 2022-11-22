import React, {FC, ReactNode} from "react";
import ReactDOM from 'react-dom'

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './modal.module.css'
import CommonStyles from '../../styles/common.module.css'
import {ModalOverlay} from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

export const Modal: FC<{header: string, children: ReactNode, onClose: () => void}> = ({ header, children, onClose }) => {

    if (modalRoot === null) {
        // eslint-disable-next-line no-throw-literal
        throw "modal root is not implemented";
    }

    React.useEffect(() => {
        const closeByEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keyup', closeByEsc);
        return () => document.removeEventListener('keyup', closeByEsc);
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <div className={`${Styles.modal}`}>
                <div className={`pt-10 pr-10 pl-10 ${CommonStyles.flexRow} ${CommonStyles.flexJCBetween}`}>
                    <span className='text text_type_main-medium'>{ header }</span>
                    <button onClick={onClose} className={`${CommonStyles.button} close-modal`}>
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

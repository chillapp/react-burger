import React from "react";
import ReactDOM from 'react-dom'

import Styles from './modal-overlay.module.css'

const modalRoot = document.getElementById("react-modals");

export default function ModalOverlay({ onClick }) {
    return ReactDOM.createPortal(
        <div onClick={onClick} className={`${Styles.modalOverlay}`}></div>,
        modalRoot
    );
}


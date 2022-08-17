import React from "react";

import Styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

export default function ModalOverlay({ onClick }) {
    return (
        <div onClick={onClick} className={`${Styles.modalOverlay}`}></div>
    );
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func
}


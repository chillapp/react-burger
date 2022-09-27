import React, {FC} from "react";

import Styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

export const ModalOverlay: FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <div onClick={onClick} className={`${Styles.modalOverlay}`}></div>
    );
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}


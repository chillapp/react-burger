import React, {FC} from "react";

import Styles from './modal-overlay.module.css'

export const ModalOverlay: FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <div onClick={onClick} className={`${Styles.modalOverlay}`}></div>
    );
}

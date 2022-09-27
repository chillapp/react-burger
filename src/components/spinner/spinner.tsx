import styles from './spinner.module.css'
import PropTypes from "prop-types";
import {FC} from "react";

export const Spinner: FC<{ extraClass?: string }> = ({ extraClass }) => {
    return <div className={`${styles.spinner} ${extraClass}`}></div>
}

Spinner.propTypes = {
    extraClass: PropTypes.string
}

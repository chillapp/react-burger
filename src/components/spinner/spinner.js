import styles from './spinner.module.css'
import PropTypes from "prop-types";

export default function Spinner({ extraClass }) {
    return <div className={`${styles.spinner} ${extraClass}`}></div>
}

Spinner.propTypes = {
    extraClass: PropTypes.string
}

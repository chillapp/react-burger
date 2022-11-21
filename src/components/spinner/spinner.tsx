import styles from './spinner.module.css'
import {FC} from "react";

export const Spinner: FC<{ extraClass?: string, centered?: boolean }> = ({ extraClass, centered }) => {
    return <div className={`${styles.spinner} ${extraClass} ${centered ? styles.centered : null }`}></div>
}

import styles from './spinner.module.css'
import {FC} from "react";

export const Spinner: FC<{ extraClass?: string }> = ({ extraClass }) => {
    return <div className={`${styles.spinner} ${extraClass}`}></div>
}

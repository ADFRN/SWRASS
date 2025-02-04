import type React from "react"
import styles from "./Loading.module.css";

const SimpleLoader: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loader}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
            </div>
        </div>
    )
}

export default SimpleLoader
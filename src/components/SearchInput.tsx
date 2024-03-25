import styles from './SearchInput.module.css'

export default function SearchInput() {
    return(
        <div className={styles["search-input-wrapper"]}>
        <input type="text">
        </input>
        </div>
    )
}
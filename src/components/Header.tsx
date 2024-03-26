import { FC } from 'react';
import styles from './Header.module.css'

interface Props {
    handleShow: () => void;
}

const Header: FC<Props> = ({ handleShow }) => {
    return (
        <header className={styles["header"]}>
            <button className={styles["favourites-selection-button"]} onClick={handleShow}>
                Favourites
            </button>
        </header>
    )
}

export default Header
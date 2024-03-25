import { FC } from 'react';
import styles from './Header.module.css'
import Button from 'react-bootstrap/Button';

interface Props {
    handleShow: () => void;
}

const Header: FC<Props> = ({ handleShow }) => {
    return (
        <header className={styles["header"]}>
            <Button variant="primary" onClick={handleShow} className="me-2">
                Favourites
            </Button>
        </header>
    )
}

export default Header
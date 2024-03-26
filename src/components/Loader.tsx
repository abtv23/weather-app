import { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from './Loader.module.css'

interface Props {
    isLoading: boolean;
}

const Loader: FC<Props> = ({ isLoading }) => {
    if (!isLoading) {
        return null
    }
    return (
        <div className={`${styles['loader-wrapper']} ${isLoading && styles['show-loader']}`}>
            <Spinner animation="border" role="status">
                {/* <span className="visually-hidden">Loading...</span> */}
            </Spinner>
        </div>
    )
}

export default Loader
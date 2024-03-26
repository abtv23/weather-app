import { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
    isLoading: boolean;
}

const Loader: FC<Props> = (isLoading) => {
    
    if (!isLoading) {
        return null
    }
    return (
        <div className={`loader-wrapper ${isLoading ? 'show-loader' : ''}`}>
            <Spinner animation="border" role="status">
                {/* <span className="visually-hidden">Loading...</span> */}
            </Spinner>
        </div>
    )
}

export default Loader
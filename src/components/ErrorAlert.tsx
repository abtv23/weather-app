import { FC, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { WeatherSliceError } from '../state/weather/weatherSlice';
import styles from './ErrorAlert.module.css'

interface Props {
    error: WeatherSliceError;
    onClose: () => void
}

const ErrorAlert: FC<Props> = ({ error, onClose }) => {
    if (!error.hasError) {
        return null
    }
    return (
        <div className={styles['error-alert-wrapper']}>
            <Alert className={styles["error-alert"]} variant="danger" onClose={onClose} dismissible>
                <p>
                    {error.message}.
                </p>
            </Alert>
        </div>
    );
}

export default ErrorAlert;
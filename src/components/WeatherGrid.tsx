import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './WeatherGrid.module.css'
import { CityCardType } from '../state/weather/weatherSlice';
import CityCard from './CityCard';
import { FC } from 'react';

interface Props {
    cityCards: CityCardType[]
}

const WeatherGrid: FC<Props> = ({cityCards}) => {
    return (
        <div className={styles['weather-grid-wrapper']}>
            <Row xs={1} md={3} className="g-4">
                {cityCards.map((cityCard, idx) => (
                    <Col key={idx}>
                        <CityCard cityCard={cityCard}/>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default WeatherGrid;
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './WeatherGrid.module.css'
import { CityCardType } from '../state/weather/weatherSlice';
import CityCard from './CityCard';
import { FC } from 'react';

interface Props {
    cityCards: CityCardType[];
    addToFavouriteCities: (isLiked: boolean, cityName: string) => void;
    favouriteCities: string[];
}

const WeatherGrid: FC<Props> = ({ cityCards, addToFavouriteCities, favouriteCities }) => {
    return (
        <div className={styles['weather-grid-wrapper']}>
            <Row xs={1} md={3} className="g-4">
                {cityCards.map((cityCard, idx) => (
                    <Col key={idx}>
                        <CityCard cityCard={cityCard} addToFavouriteCities={addToFavouriteCities} favouriteCities={favouriteCities} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default WeatherGrid;
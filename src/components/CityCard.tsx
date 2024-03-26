import Card from 'react-bootstrap/Card';
import { CityCardType } from '../state/weather/weatherSlice';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import styles from './CityCard.module.css'

interface Props {
    cityCard: CityCardType
    addToFavouriteCities: (isLiked: boolean, cityName: string) => void
    favouriteCities: string[];
}

const weatherTypeToEmoji = {
    'Sunny': "☀️",
    'Light snow': "☃️",
    'Light rain': "☔",
    'Light rain shower': "☔",
    'Partly cloudy': "⛅",
    'Overcast': "☁️"
}

const CityCard: FC<Props> = ({ cityCard, addToFavouriteCities, favouriteCities }) => {
    const isLiked: boolean = favouriteCities.includes(cityCard.name)
    const onLikeClick = () => {
        addToFavouriteCities(isLiked, cityCard.name)
    }
    return (
        <Card className={styles['city-card']}>
            <Card.Body>
                <Card.Title className={styles['city-card-title']}>
                    <Button className={styles['like-button']} onClick={onLikeClick}>{isLiked ? "♥" : "♡"}</Button>
                    {cityCard.name}, {cityCard.country}
                </Card.Title>
                <Card.Text>
                    <h6 className={styles['temperature']}>Temperature: {cityCard.temperature} °C</h6>
                    <h6 className={styles['weather-emoji']}>{weatherTypeToEmoji[cityCard.weatherType]}</h6>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CityCard
import Card from 'react-bootstrap/Card';
import { CityCardType } from '../state/weather/weatherSlice';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import styles from './CityCard.module.css'

interface Props {
    cityCard: CityCardType
}

const weatherTypeToEmoji = {
    'sun': "☀️",
    'snow': "☃️",
    'rain': "☔"
}

const CityCard: FC<Props> = ({ cityCard }) => {
    console.log(cityCard)
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Button className={styles['like-button']}>{false ? "♡" : "♥"}</Button>
                    {cityCard.name}
                </Card.Title>
                <Card.Text>
                    <h6>Temperature: {cityCard.temperature} °C</h6>
                    <h6 className={styles['weather-emoji']}>{weatherTypeToEmoji[cityCard.weatherType]}</h6>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CityCard
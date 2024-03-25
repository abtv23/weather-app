import Card from 'react-bootstrap/Card';
import { CityCardType } from '../state/weather/weatherSlice';
import { FC } from 'react';

interface Props {
    cityCard: CityCardType
}

const CityCard: FC<Props> = ({cityCard}) => {
    console.log(cityCard)
    return (
        <Card>
            <Card.Body>
                <Card.Title>{cityCard.name}</Card.Title>
                <Card.Text>
                   <h6>Temperature: {cityCard.temperature} °C</h6>
                   <h6>{cityCard.weatherType}</h6>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CityCard
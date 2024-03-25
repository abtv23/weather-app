import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CityCard from './CityCard';
import styles from './WeatherGrid.module.css'

function WeatherGrid() {
    return (
        <div className={styles['weather-grid-wrapper']}>
            <Row xs={1} md={3} className="g-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <Col key={idx}>
                        <CityCard />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default WeatherGrid;
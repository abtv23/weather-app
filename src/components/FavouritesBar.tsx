import { FC } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { favouritesSliceSelectors, favouritesSliceActions } from '../state/favourites/favouritesSlice';
import { useAppDispatch, useAppSelector } from "../state/store";
import Card from 'react-bootstrap/Card';
import styles from './FavouritesBar.module.css'

const FavouritesBar: FC = () => {
  const showFavourites = useAppSelector(favouritesSliceSelectors.favouritesIsOpen)
  const likedCities = useAppSelector(favouritesSliceSelectors.favouriteCities)
  const dispatch = useAppDispatch()
  const closeFavourites = () => {
    dispatch(favouritesSliceActions.toggleFavourites(false))
  }
  const removeFromFavouriteCities = (cityName: string) => {
    dispatch(favouritesSliceActions.toggleFavouriteCity({ addToFavourites: false, cityName: cityName }))
}
  return (
    <>
      <Offcanvas show={showFavourites} onHide={closeFavourites}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>List of cities added to favourites</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {likedCities.map((likedCity, idx) => (
            <Card className={styles['favourite-city-card']}key={idx}>
              <h5>{likedCity}</h5>
              <button className={styles['remove-favourite-city']} onClick={() => {removeFromFavouriteCities(likedCity)}}> ♥</button>
            </Card>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default FavouritesBar
import { FC } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { favouritesSliceSelectors, favouritesSliceActions } from '../state/favourites/favouritesSlice';
import { useAppDispatch, useAppSelector } from "../state/store";

const FavouritesBar: FC = () => {
  const showFavourites = useAppSelector(favouritesSliceSelectors.favouritesIsOpen)
  const likedCities = useAppSelector(favouritesSliceSelectors.favouriteCities)
  const dispatch = useAppDispatch()
  const closeFavourites = () => {
    dispatch(favouritesSliceActions.toggleFavourites(false))
  }

  return (
    <>
      <Offcanvas show={showFavourites} onHide={closeFavourites}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>List of cities added to favourites</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {likedCities.map((likedCity) => (
            <h5>{likedCity}</h5>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default FavouritesBar
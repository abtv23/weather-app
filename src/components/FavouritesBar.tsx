import { FC } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAppSelector } from '../state/store';
import { favouritesSliceSelectors, favouritesSliceActions } from '../state/favourites/favouritesSlice';
import { useAppDispatch } from "../state/store";


const FavouritesBar: FC = () => {
  const showFavourites = useAppSelector(favouritesSliceSelectors.favouritesIsOpen)
  const dispatch = useAppDispatch()
  const closeFavourites = () => {
    dispatch(favouritesSliceActions.toggleFavourites(false))
  }
  return (
    <>
      <Offcanvas show={showFavourites} onHide={closeFavourites}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default FavouritesBar
import Header from "./Header";
import SearchInput from "./SearchInput";
import WeatherGrid from "./WeatherGrid";
import styles from "./WeatherPage.module.css"
import { favouritesSliceActions } from "../state/favourites/favouritesSlice";
import { useAppDispatch } from "../state/store";

export default function WeatherPage() {
    const dispatch = useAppDispatch()
    const openFavourites = () => {
        dispatch(favouritesSliceActions.toggleFavourites(true))
    }

    return(
        <div className={styles["weather-page-wrapper"]}>
            <Header handleShow={openFavourites}/>
            <SearchInput/>
            <WeatherGrid/>
        </div>
    )
}

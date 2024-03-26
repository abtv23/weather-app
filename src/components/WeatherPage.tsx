import Header from "./Header";
import SearchInput from "./SearchInput";
import WeatherGrid from "./WeatherGrid";
import styles from "./WeatherPage.module.css"
import { favouritesSliceActions, favouritesSliceSelectors } from "../state/favourites/favouritesSlice";
import { useAppDispatch, useAppSelector } from "../state/store";
import { fetchCityWeather, weatherSliceActions, weatherSliceSelectors } from "../state/weather/weatherSlice";
import Loader from "./Loader";

export default function WeatherPage() {
    const favouriteCities = useAppSelector(favouritesSliceSelectors.favouriteCities)
    const cityCards = useAppSelector(weatherSliceSelectors.cityCardsSelector)
    const searchInputValue = useAppSelector(weatherSliceSelectors.searchInputValueSelector)
    const isLoading = useAppSelector(weatherSliceSelectors.isLoading)

    const dispatch = useAppDispatch()
    const openFavourites = () => {
        dispatch(favouritesSliceActions.toggleFavourites(true))
    }
    const addToFavouriteCities = (isLiked: boolean, cityName: string) => {
        dispatch(favouritesSliceActions.toggleFavouriteCity({ addToFavourites: !isLiked, cityName: cityName }))
    }
    const searchInputValueChanged = (e: any) => { //TODO: add type to e
        dispatch(weatherSliceActions.searchInputValueChanged(e.target.value))
    }

    const onSearchHandler = () => {

        for (let i = 0; i < cityCards.length; i++) {

            if (cityCards[i].name == searchInputValue) {
                return null
            }
        }
        dispatch(fetchCityWeather(searchInputValue))
        dispatch(weatherSliceActions.setDefaultInputValue())

        // //if(cityCards.includes(searchInputValue))
        // dispatch(fetchCityWeather(searchInputValue))
        // dispatch(weatherSliceActions.setDefaultInputValue())
    }



    return (
        <div className={styles["weather-page-wrapper"]}>
            <Header handleShow={openFavourites} />
            <SearchInput searchInputValue={searchInputValue} onInputChange={searchInputValueChanged} onSearchHandler={onSearchHandler} />
            <WeatherGrid
                cityCards={cityCards}
                addToFavouriteCities={addToFavouriteCities}
                favouriteCities={favouriteCities}
            />
        </div>
    )
}

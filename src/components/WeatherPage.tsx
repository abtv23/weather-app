import { ChangeEvent, useEffect } from 'react';
import Header from "./Header";
import SearchInput from "./SearchInput";
import WeatherGrid from "./WeatherGrid";
import styles from "./WeatherPage.module.css"
import { favouritesSliceActions, favouritesSliceSelectors } from "../state/favourites/favouritesSlice";
import { useAppDispatch, useAppSelector } from "../state/store";
import { fetchCityWeather, weatherSliceActions, weatherSliceSelectors } from "../state/weather/weatherSlice";
import Loader from "./Loader";
import ErrorAlert from './ErrorAlert';

export default function WeatherPage() {
    const favouriteCities = useAppSelector(favouritesSliceSelectors.favouriteCities)
    const cityCards = useAppSelector(weatherSliceSelectors.cityCardsSelector)
    const searchInputValue = useAppSelector(weatherSliceSelectors.searchInputValueSelector)
    const isLoading = useAppSelector(weatherSliceSelectors.isLoading)
    const error = useAppSelector(weatherSliceSelectors.error)

    const dispatch = useAppDispatch()
    const openFavourites = () => {
        dispatch(favouritesSliceActions.toggleFavourites(true))
    }
    const addToFavouriteCities = (isLiked: boolean, cityName: string) => {
        dispatch(favouritesSliceActions.toggleFavouriteCity({ addToFavourites: !isLiked, cityName: cityName }))
    }
    const searchInputValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(weatherSliceActions.searchInputValueChanged(e.target.value))
    }

    useEffect(() => {
        const onLoad = () => {
            const localStorageFavCitiesRaw = localStorage.getItem('favCities')
            if (localStorageFavCitiesRaw) {
                const localStorageFavCities = JSON.parse(localStorageFavCitiesRaw)
                if (localStorageFavCities?.length) {
                    dispatch(favouritesSliceActions.setFavouriteCities(localStorageFavCities))

                    localStorageFavCities.forEach((favCity: string) => {
                        dispatch(fetchCityWeather(favCity))
                    })
                }
            } else { // if never set in localStorage
                const DEFAULT_CITIES = ['Sofia', 'Valencia', 'New York', 'Tokyo']
                dispatch(favouritesSliceActions.setFavouriteCities(DEFAULT_CITIES))

                DEFAULT_CITIES.forEach(favCity => {
                    dispatch(fetchCityWeather(favCity))
                })
            }
        }
        const onBlur = () => {
            localStorage.setItem('favCities', JSON.stringify(favouriteCities))
        }

        window.addEventListener("load", onLoad);
        window.addEventListener("beforeunload", onBlur);

        return () => {
            window.removeEventListener("focus", onLoad);
            window.removeEventListener("beforeunload", onBlur);
        };
    }, [favouriteCities])

    const onSearchHandler = () => {
        const alreadyHasCity = cityCards.findIndex(cityCard => cityCard.name === searchInputValue)

        dispatch(weatherSliceActions.setDefaultInputValue())
        if (alreadyHasCity !== -1) {
            // TODO: display warning;
            return null;
        }
        dispatch(fetchCityWeather(searchInputValue))
    }

    const onCloseHandler = () => {
        dispatch(weatherSliceActions.cleanError())
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
            <Loader isLoading={isLoading} />
            <ErrorAlert error={error} onClose={onCloseHandler}/>
        </div>
    )
}

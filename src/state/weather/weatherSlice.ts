import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getLocation from "../../components/services/weather";
 
type weatherType = 'Sunny' | 'Partly cloudy' | 'Light rain' | 'Light snow' | 'Light rain shower' | 'Overcast'

export interface WeatherSliceError {
    hasError: boolean;
    message?: string;
}

export type CityCardType = {
    name: string;
    country: string,
    temperature: number;
    weatherType: weatherType
}

interface WeatherSlice {
    searchInputValue: string;
    cityCards: CityCardType[];
    isLoading: boolean;
    error: WeatherSliceError;
}

const initialState: WeatherSlice = {
    searchInputValue: '',
    cityCards: [],
    isLoading: false,
    error: {
        hasError: false
    }
}

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        searchInputValueChanged: (state, action: PayloadAction<string>) => {
            state.searchInputValue = action.payload
        },
        setDefaultInputValue: (state) => {
            state.searchInputValue = ''
        },
        setCityCards: (state, action: PayloadAction<CityCardType[]>) => {
            state.cityCards = action.payload
        },
        cleanError: (state) => {
            state.error = initialState.error
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCityWeather.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchCityWeather.fulfilled, (state, action) => {
            state.cityCards= state.cityCards.concat(action.payload)
            state.isLoading = false
            state.error = {
                hasError: false
            }
        })
        .addCase(fetchCityWeather.rejected, (state, action) => {
            state.error = {
                hasError: true,
                message: action.error?.message || 'Unexpected Error occured'
            }
            state.isLoading = false
        })
    },
    selectors: {
        loadingSelector: (state) => state.isLoading,
        cityCardsSelector: (state) => state.cityCards,
        searchInputValueSelector: (state) => state.searchInputValue,
        isLoading: (state) => state.isLoading,
        error: (state) => state.error
    }
})

export const fetchCityWeather = createAsyncThunk(
    "weather/fetchCityWeather",
    async (cityName: string, { rejectWithValue }): Promise<CityCardType> => {
        try {
            const response: any = await getLocation(cityName)

            if (!response.ok) {
                console.log(response)
                rejectWithValue(new Error(response.statusText))
            }
            
            const cityCard: CityCardType = {
                name: response.location.name,
                country: response.location.country,
                temperature: response.current.temp_c,
                weatherType: response.current.condition.text
            }
            return cityCard
        } catch (error: any) {
            throw(new Error(error?.error?.message || 'Unexpected Error occured'));
        }
        
    }
)

export const weatherSliceSelectors = weatherSlice.selectors
export const weatherSliceActions = weatherSlice.actions
export default weatherSlice.reducer
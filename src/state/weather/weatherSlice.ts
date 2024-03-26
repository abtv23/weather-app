import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import SearchInput from "../../components/SearchInput";
import getLocation from "../../components/services/weather";
 
type weatherType = 'Sunny' | 'Partly cloudy' | 'Light rain' | 'Light snow' | 'Light rain shower'

interface Error {
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
    error: Error;
}

const initialState: WeatherSlice = {
    searchInputValue: '',
    cityCards: [ {
        name: "Sofia",
        country: "Bulgaria",
        temperature: 20,
        weatherType: "Partly cloudy"
    },
    {
        name: "Plovdiv",
        country: "Bulgaria",
        temperature: 24,
        weatherType: "Sunny"
    },
    {
        name: "Valencia",
        country: "Bulgaria",
        temperature: 26,
        weatherType: "Sunny"
    },
    {
        name: "Marseille",
        country: "Bulgaria",
        temperature: 20,
        weatherType: "Light rain"
    },
    {
        name: "Varna",
        country: "Bulgaria",
        temperature: 10,
        weatherType: "Light snow"
    },
    {
        name: "Tokio",
        country: "Bulgaria",
        temperature: 23,
        weatherType: "Partly cloudy"
    }
    ],
    isLoading: false,
    error: {
        hasError: false,
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
        setLoading: (state) => {
            state.isLoading = true
        },
        stopLoading: (state) => {
            state.isLoading = false
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
        })
    },
    selectors: {
        loadingSelector: (state) => state.isLoading,
        cityCardsSelector: (state) => state.cityCards,
        searchInputValueSelector: (state) => state.searchInputValue,
        isLoading: (state) => state.isLoading
    }
})

export const fetchCityWeather = createAsyncThunk(
    "weather/fetchCityWeather",
    async (cityName: string, { rejectWithValue }): Promise<CityCardType> => {
        console.log(cityName)
        // check if city already exist
        const response: any = await getLocation(cityName)
        
        console.log("result", response)

        if (!response.ok) {
            rejectWithValue({ message: response.message })
        }

        const cityCard: CityCardType = {
            name: response.location.name,
            country: response.location.country,
            temperature: response.current.temp_c,
            weatherType: response.current.condition.text
        }
        return cityCard
    }
)

export const weatherSliceSelectors = weatherSlice.selectors
export const weatherSliceActions = weatherSlice.actions
export default weatherSlice.reducer
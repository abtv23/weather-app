import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
 
type weatherType = 'sun' | 'snow' | 'rain' 

interface Error {
    hasError: boolean;
    message?: string;
}

export type CityCardType = {
    name: string;
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
        temperature: 20,
        weatherType: "sun"
    },
    {
        name: "Plovdiv",
        temperature: 24,
        weatherType: "sun"
    },
    {
        name: "Valencia",
        temperature: 26,
        weatherType: "sun"
    },
    {
        name: "Marseille",
        temperature: 20,
        weatherType: "rain"
    },
    {
        name: "Varna",
        temperature: 10,
        weatherType: "snow"
    },
    {
        name: "Tokio",
        temperature: 23,
        weatherType: "sun"
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
            state.searchInputValue += action.payload
        },
        setCityCards: (state, action: PayloadAction<CityCardType[]>) => {
            state.cityCards = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCityWeather.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchCityWeather.fulfilled, (state, action) => {
            state.cityCards= action.payload
            state.isLoading = false
        })
    },
    selectors: {
        loadingSelector: (state) => state.isLoading,
        cityCardsSelector: (state) => state.cityCards
    }
})

export const fetchCityWeather = createAsyncThunk(
    "weather/fetchCityWeather",
    async (cityName: 'string', { rejectWithValue }): Promise<CityCardType[]> => {
        const response: any = await new Promise ((resolve) => setTimeout(resolve, 1000)); // cityName

        if (!response.ok) {
            rejectWithValue({ message: response.message })
        }

        const result = await response.json()
        return result
    }
)

export const weatherSliceSelectors = weatherSlice.selectors
export const weatherSliceActions = weatherSlice.actions
export default weatherSlice.reducer
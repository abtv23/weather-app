import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
 
type weatherType = 'sun' | 'snow' | 'rain' | 'wind'

interface Error {
    hasError: boolean;
    message?: string;
}

interface CityCard {
    name: string;
    temperature: number;
    isLiked: boolean;
    weatherType: weatherType
}

interface WeatherSlice {
    searchInputValue: string;
    cityCards: CityCard[];
    isLoading: boolean;
    error: Error;
}

const initialState: WeatherSlice = {
    searchInputValue: '',
    cityCards: [],
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
        setCityCards: (state, action: PayloadAction<CityCard[]>) => {
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
        loadingSelector: (state) => state.isLoading
    }
})

export const fetchCityWeather = createAsyncThunk(
    "weather/fetchCityWeather",
    async (cityName: 'string', { rejectWithValue }): Promise<CityCard[]> => {
        const response: any = await new Promise ((resolve) => setTimeout(resolve, 1000)); // cityName

        if (!response.ok) {
            rejectWithValue({ message: response.message })
        }

        const result = await response.json()
        return result
    }
)

export const {} = weatherSlice.actions
export default weatherSlice.reducer
export const { loadingSelector } = weatherSlice.selectors
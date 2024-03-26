import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Error {
    hasError: boolean;
    message?: string;
}

interface FavouritesState {
    favouriteCities: string[];
    error: Error;
    show: boolean
}

const initialState: FavouritesState = {
    favouriteCities: [
        'Sofia',
        'Plovdiv',
        'Valencia'
    ],
    error: {
        hasError: false
    },
    show: false,
}

const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        toggleFavouriteCity: (state, action: PayloadAction<{ addToFavourites: boolean; cityName: string }>) => {
            if (action.payload.addToFavourites) {
                state.favouriteCities = [
                    action.payload.cityName,
                    ...state.favouriteCities
                ]
            } else {
                state.favouriteCities = state.favouriteCities.filter(city => city !== action.payload.cityName)
            }
        },
        toggleFavourites: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload
        }
    },
    selectors: {
        favouritesIsOpen: (state) => state.show,
        favouriteCities: (state) => state.favouriteCities,
    }
})

export const favouritesSliceActions = favouritesSlice.actions
export const favouritesSliceSelectors = favouritesSlice.selectors
export default favouritesSlice.reducer
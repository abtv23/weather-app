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
    show: false
}

const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        toggleFavourites: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload
        }
        // searchInputValueChanged: (state, action: PayloadAction<string>) => {
        //     state.searchInputValue += action.payload
        // },
        // setCityCards: (state, action: PayloadAction<CityCard[]>) => {
        //     state.cityCards = action.payload
        // }
    },
    selectors: {
        favouritesIsOpen: (state) => state.show
    }
})

export const favouritesSliceActions = favouritesSlice.actions
export const favouritesSliceSelectors = favouritesSlice.selectors
export default favouritesSlice.reducer
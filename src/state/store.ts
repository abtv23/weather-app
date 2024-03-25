import {configureStore} from "@reduxjs/toolkit"
import weatherSlice from "./weather/weatherSlice"
import favouritesSlice from "./favourites/favouritesSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
    reducer: {
        weather: weatherSlice,
        favourites: favouritesSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

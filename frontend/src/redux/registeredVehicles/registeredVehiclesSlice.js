import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRegisteredVehicles } from './registeredVehiclesAPI';

const initialState = {
    registeredVehicles: [],
    isLoading: false,
    isError: false,
    error: "",
}

export const fetchRegisteredVehicles = createAsyncThunk(
    'registerVehicles/getRegisterVehicles',
    async () => {
        const vehicles = await getRegisteredVehicles();
        return vehicles;
    }
)


const registerVehiclesReducer = createSlice({
    name: 'registerVehicles',
    initialState,
    extraReducers: (builder) => {
        // fetch chargingStation
        builder
            .addCase(fetchRegisteredVehicles.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            }).addCase(fetchRegisteredVehicles.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.registeredVehicles = payload;
            }).addCase(fetchRegisteredVehicles.rejected, (state, { error }) => {
                state.isLoading = false;
                state.registeredVehicles = [];
                state.error = error?.message;
            })


    },
})


export default registerVehiclesReducer.reducer
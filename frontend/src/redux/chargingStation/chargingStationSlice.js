import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getchargingStationDetails, getChargingStations } from './chargingStationAPI';

const initialState = {
    chargingStations: [],
    isLoading: false,
    isError: false,
    error: "",
    chargingStationDetails: {},
    token: null,
    verification: {
        isVerifying: false,
        currentItem: null
    }
}

export const fetchChargingStations = createAsyncThunk(
    'chargingStations/getChargingStations',
    async () => {
        const chargingStations = await getChargingStations();
        return chargingStations;
    }
)

export const fetchchargingStationDetails = createAsyncThunk(
    "chargingStations/chargingStationDetails",
    async (documentName) => {
        const data = await getchargingStationDetails(documentName);
        return data;
    }
)


const chargingStationReducer = createSlice({
    name: 'chargingStations',
    initialState,
    // reducers: {
    //     setVerifyItem: (state, { payload }) => {
    //         state.verification.currentItem = payload
    //     }
    // },
    extraReducers: (builder) => {
        // fetch charging stations
        builder
            .addCase(fetchChargingStations.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            }).addCase(fetchChargingStations.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.chargingStations = payload;
            }).addCase(fetchChargingStations.rejected, (state, { error }) => {
                state.isLoading = false;
                state.chargingStations = [];
                state.error = error?.message;
            })
        // fetch charging station details
        builder
            .addCase(fetchchargingStationDetails.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            }).addCase(fetchchargingStationDetails.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.chargingStationDetails = payload;
            }).addCase(fetchchargingStationDetails.rejected, (state, { error }) => {
                state.isLoading = false;
                state.chargingStationDetails = [];
                state.error = error?.message;
            })
    },
})

//export const { setVerifyItem } = chargingStationReducer.actions;

export default chargingStationReducer.reducer
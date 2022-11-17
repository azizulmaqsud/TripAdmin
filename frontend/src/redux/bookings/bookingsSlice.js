import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBookingDetails, getBookings } from './bookingsAPI';

const initialState = {
    bookings: [],
    activeBookings: [],
    endedBookings: [],
    isLoading: false,
    isError: false,
    error: "",
    bookingDetails: {},
    token: null
}

export const fetchBookings = createAsyncThunk(
    'bookings/getBookings',
    async () => {
        const bookings = await getBookings();
        return bookings;
    }
)

export const fetchBookingDetails = createAsyncThunk(
    "bookings/bookingDetails",
    async (BookingID) => {
        const data = await getBookingDetails(BookingID);
        return data;
    }
)

const bookingReducer = createSlice({
    name: 'bookings',
    initialState,
    extraReducers: (builder) => {
        // fetch bookings
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            }).addCase(fetchBookings.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                const active = payload.filter(({ bookingFinished, BookingID }) => bookingFinished && BookingID)
                const ended = payload.filter(({ bookingFinished, BookingID }) => !bookingFinished && BookingID)
                state.bookings = payload.filter(({ BookingID }) => BookingID);
                state.activeBookings = active;
                state.endedBookings = ended;
            }).addCase(fetchBookings.rejected, (state, { error }) => {
                state.isLoading = false;
                state.bookings = [];
                state.activeBookings = [];
                state.endedBookings = [];
                state.error = error?.message;
            })
        // fetch user details
        builder
            .addCase(fetchBookingDetails.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            }).addCase(fetchBookingDetails.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.bookingDetails = payload;
            }).addCase(fetchBookingDetails.rejected, (state, { error }) => {
                state.isLoading = false;
                state.bookingDetails = [];
                state.error = error?.message;
            })

    },
})


export default bookingReducer.reducer
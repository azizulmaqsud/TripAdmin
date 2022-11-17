import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUserDetails, getUsers, verify } from './usersAPI';

const initialState = {
    users: [],
    isLoading: false,
    isError: false,
    error: "",
    userDetails: {},
    token: null,
    verification: {
        isVerifying: false,
        currentItem: null
    }
}

export const fetchUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
        const users = await getUsers();
        return users;
    }
)

export const fetchUserDetails = createAsyncThunk(
    "users/userDetails",
    async (email) => {
        const data = await getUserDetails(email);
        return data;
    }
)

export const verifyUser = createAsyncThunk(
    "users/verifyUser",
    async (payload) => {
        const data = await verify(payload);
        return data
    }
)

const userReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setVerifyItem: (state, { payload }) => {
            state.verification.currentItem = payload
        }
    },
    extraReducers: (builder) => {
        // fetch users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            }).addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.users = payload;
            }).addCase(fetchUsers.rejected, (state, { error }) => {
                state.isLoading = false;
                state.users = [];
                state.error = error?.message;
            })
        // fetch user details
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            }).addCase(fetchUserDetails.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.userDetails = payload;
            }).addCase(fetchUserDetails.rejected, (state, { error }) => {
                state.isLoading = false;
                state.userDetails = [];
                state.error = error?.message;
            })

        // Verify user
        builder
            .addCase(verifyUser.pending, (state) => {
                state.isError = false;
                state.verification.isVerifying = true;
            }).addCase(verifyUser.fulfilled, (state) => {
                state.verification.isVerifying = false;
                state.userDetails[state.verification.currentItem] = !state.userDetails[state.verification.currentItem];
            }).addCase(verifyUser.rejected, (state, { error }) => {
                state.isLoading = false;
                state.verification.currentItem = null;
                state.error = error?.message;
            })

    },
})

export const { setVerifyItem } = userReducer.actions;

export default userReducer.reducer
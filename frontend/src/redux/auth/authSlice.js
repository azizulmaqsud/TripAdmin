import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCurrentUser, getLoginData, resetPasswordVerification, sendResetPassword, sendResetPasswordRequest } from "./authAPI"


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    error: "",
    currentUser: null,
    redirect: {
        status: false,
        path: "/"
    }
}


export const loadCurrentUser = createAsyncThunk("auth", async () => {
    const data = await getCurrentUser();
    return data;
});

export const login = createAsyncThunk("auth/login", async (payload) => {
    const data = await getLoginData(payload);
    return data;
});

export const resetPasswordRequest = createAsyncThunk(
    "auth/resetPasswordRequest",
    async (payload) => {
        const data = await sendResetPasswordRequest(payload);
        return data;
    })

export const verifyResetPassword = createAsyncThunk(
    "auth/verifyResetToken",
    async (payload) => {
        const data = await resetPasswordVerification(payload);
        return data;
    })

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (payload) => {
        const data = await sendResetPassword(payload);
        return data;
    })

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.token = null;
            state.isAuthenticated = false;
            state.currentUser = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(login.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload.token) {
                localStorage.setItem('token', payload.token);
            }
            state.token = payload.token ? payload.token : state.token;
            state.currentUser = payload.user;
            state.isAuthenticated = true;

        }).addCase(login.rejected, (state, { error }) => {
            state.isLoading = false;
            state.token = null;
            state.currentUser = null;
            state.isAuthenticated = false;
        })

        // load current user
        builder.addCase(loadCurrentUser.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(loadCurrentUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload.token) {
                localStorage.setItem('token', payload.token);
            }
            state.token = payload.token ? payload.token : state.token;
            state.currentUser = payload.user;
            state.isAuthenticated = true;

        }).addCase(loadCurrentUser.rejected, (state) => {
            state.isLoading = false;
            state.token = null;
            state.currentUser = null;
            state.isAuthenticated = false;

        })
        builder.addCase(verifyResetPassword.pending, (state) => {
            state.isLoading = true;
        }).addCase(verifyResetPassword.fulfilled, (state) => {
            state.isLoading = false;
        }).addCase(verifyResetPassword.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })

        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
        }).addCase(resetPassword.fulfilled, (state) => {
            state.isLoading = false;
            state.redirect.status = true;
            state.redirect.path = "/login"
        }).addCase(resetPassword.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})
export const { logout } = authReducer.actions;

export default authReducer.reducer;
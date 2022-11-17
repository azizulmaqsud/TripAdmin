import { login, resetPassword, resetPasswordRequest, verifyResetPassword } from "../auth/authSlice";
import { verifyUser } from "../users/usersSlice";

const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    notifications: [],
    isOpen: false,
    modalClose: false
}

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, { payload }) => {
            state.notifications.push(payload);
            state.isOpen = true;
        },
        closeNotification: (state) => {
            state.isOpen = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.rejected, (state, { error }) => {
            state.notifications.push({
                severity: "error",
                message: error.message
            })
            state.isOpen = true;
        })
        builder.addCase(verifyUser.fulfilled, (state) => {
            state.notifications.push({
                severity: "success",
                message: "Operation Successful!"
            })
            state.isOpen = true;
        }).addCase(verifyUser.rejected, (state, { error }) => {
            state.notifications.push({
                severity: "error",
                message: error.message
            })
            state.isOpen = true;
        })
        builder.addCase(resetPasswordRequest.fulfilled, (state) => {
            state.notifications.push({
                severity: "success",
                message: "Email Send Successful!"
            })
            state.isOpen = true;
            state.modalClose = true;
        }).addCase(resetPasswordRequest.rejected, (state, { error }) => {
            state.notifications.push({
                severity: "error",
                message: error.message
            })
            state.isOpen = true;
        })
        builder.addCase(verifyResetPassword.fulfilled, (state) => {
            state.notifications.push({
                severity: "success",
                message: "Verification Successful!"
            })
            state.isOpen = true;
        }).addCase(verifyResetPassword.rejected, (state, { error }) => {
            state.notifications.push({
                severity: "error",
                message: error.message
            })
            state.isOpen = true;
        })
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.notifications.push({
                severity: "success",
                message: "Password Reset Successful!"
            })
            state.isOpen = true;
        }).addCase(resetPassword.rejected, (state, { error }) => {
            state.notifications.push({
                severity: "error",
                message: error.message
            })
            state.isOpen = true;
        })
    }
})

export const { setNotification, closeNotification } = notificationReducer.actions;

export default notificationReducer.reducer;
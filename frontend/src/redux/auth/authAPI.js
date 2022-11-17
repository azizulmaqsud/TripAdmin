import { axiosInstance, axiosTokenInstance } from "../../utils/axios"

export const getCurrentUser = async () => {
    const { data } = await axiosTokenInstance.get("auth");
    return data;
}

export const getLoginData = async (payload) => {
    const { data } = await axiosInstance.post("auth/login", payload);
    return data;
}

export const sendResetPasswordRequest = async (payload) => {
    console.log(payload);
    const { data } = await axiosTokenInstance.post("reset-password/reset-request", payload);
    return data;
}

export const resetPasswordVerification = async (payload) => {
    const { data } = await axiosTokenInstance.post("reset-password/verify", payload);
    return data;
}

export const sendResetPassword = async (payload) => {
    const { data } = await axiosTokenInstance.post("reset-password", payload);
    return data;
}
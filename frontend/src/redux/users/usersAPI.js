import { axiosTokenInstance } from "../../utils/axios"

export const getUsers = async () => {
    const { data } = await axiosTokenInstance.get("/users/get-users");
    return data;
}

export const getUserDetails = async (email) => {
    const { data } = await axiosTokenInstance.get("users/get-user", {
        params: { email },
    });
    return data;
}

export const verify = async (payload) => {
    const { data } = await axiosTokenInstance.post("users/verify-user", payload);
    return data
}
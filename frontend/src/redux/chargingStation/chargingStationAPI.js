import { axiosTokenInstance } from "../../utils/axios"

export const getChargingStations = async () => {
    const { data } = await axiosTokenInstance.get("/charging-station/get-charging-station");
    return data;
}

export const getchargingStationDetails = async (documentName) => {
    const { data } = await axiosTokenInstance.get("/charging-station/get-chargingStation", {
        params: { documentName },
    });
    return data;
}

export const verify = async (payload) => {
    const { data } = await axiosTokenInstance.post("/charging-station/verify-chargingStation", payload);
    return data
}
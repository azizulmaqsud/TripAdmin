import { axiosTokenInstance } from "../../utils/axios"

export const getRegisteredVehicles = async () => {
    const { data } = await axiosTokenInstance.get("/vehicles/get-vehicles");
    return data;
}
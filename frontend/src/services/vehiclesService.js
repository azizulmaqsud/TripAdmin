import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

export const getVehicles = () => {
    return axios.get(API_BASE + "vehicles/get-vehicles")
}
export const getVehicle = (params) => {
    return axios.get(API_BASE + "vehicles/get-vehicle", {
        params: params
    })
}
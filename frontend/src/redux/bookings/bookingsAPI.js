import { axiosTokenInstance } from "../../utils/axios"

export const getBookings = async () => {
    const { data } = await axiosTokenInstance.get("/bookings/get-bookings");
    return data;
}

export const getBookingDetails = async (BookingID) => {
    const { data } = await axiosTokenInstance.get("bookings/get-booking", {
        params: { BookingID },
    });
    return data;
}
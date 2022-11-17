import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    theme: localStorage.getItem("theme") || "light",
}


const themeReducer = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            localStorage.setItem("theme", state.theme === "light" ? "dark" : "light");
            state.theme = state.theme === "light" ? "dark" : "light";
        }
    }
});
export const { toggleTheme } = themeReducer.actions;
export default themeReducer.reducer;
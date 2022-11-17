import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
const MuiThemeProvider = ({ children }) => {
    const { theme: themeMode } = useSelector(state => state.theme);
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: "#5DDDCC"
            },
            success: {
                main: "#4AC90F"
            },
            warning: {
                main: "#FFC047"
            },
            error: {
                main: "#FF0000"
            },
            text: {
                primary: themeMode === "light" ? "#636363" : "#fff",
            }

        },
        typography: {
            fontFamily: "'Poppins', sans-serif",
            h3: {
                fontSize: 24,
                fontWeight: 600,
                lineHeight: "28px"
            },
            body1: {
                fontSize: 14
            }
        }
    });
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default MuiThemeProvider;
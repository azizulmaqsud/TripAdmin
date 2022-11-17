import { Fab } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { toggleTheme } from '../redux/theme/themeSlice';
export default function ThemeToggler() {
  const { theme } = useSelector(state => state.theme);
  const dispatch = useDispatch();

  return (
    <Fab size='small' sx={{ boxShadow: "none", height: 35, width: 35, minHeight: "unset" }} onClick={() => dispatch(toggleTheme())}>
      {
        theme === "light" ?
          <WbSunnyIcon sx={{ fontSize: 18 }} /> :
          <DarkModeIcon sx={{ fontSize: 18 }} />
      }
    </Fab>
  );
}
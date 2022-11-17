import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuItems from '../components/Dashboard/MenuItems';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../assets/images/triplogo2.jpg';
// import logoWhite from '../assets/images/logo-white.png';
import ThemeToggler from '../components/ThemeToggler';


const drawerHeaders = {
    "/dashboard": "Dashboard",
    "/dashboard/users": "List of Users",
    "/dashboard/bookings": "Bookings",
    "/dashboard/vehicles": "Registered Vehicles",
    "/dashboard/charging-stations": "Charging Stations",
    "/dashboard/ryd-e-fleet": "Fleet",
    "user-details": "User Details",
    "vehicle-details": "Vehicle Details",
    "booking-details": "Bookings Details",
    "chargingStation-details": "Charging Station Details",
};

const backRoutes = {
    "user-details": "/dashboard/users",
    "vehicle-details": "/dashboard/vehicles",
    "booking-details": "/dashboard/bookings",
    "chargingStation-details": "/dashboard/charging-stations"
}

const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    height: 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

function DashboardContent() {
    const { pathname } = useLocation();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        height: 80,
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {!!drawerHeaders[pathname] ||
                        <Link to={backRoutes[pathname?.split("/")?.[2]]}>
                            <IconButton sx={{ mr: 1 }}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Link>

                    }
                    <Typography
                        component="h1"
                        variant="h3"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {drawerHeaders[pathname] || drawerHeaders[pathname?.split("/")?.[2]]}
                    </Typography>
                    <ThemeToggler />
                </Toolbar>
                <Divider />
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        height: 79,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <Box mr={3}>
                        <img width={100} height={50} src={logo} alt="Logo" />
                    </Box>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List sx={{ pt: 0 }} component="nav">
                    <MenuItems />
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 4, mb: 2 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}

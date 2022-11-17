import React, { useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Box, Typography } from '@mui/material';
import EvStationIcon from '@mui/icons-material/EvStation';
import useSupercluster from "use-supercluster";
import PopUp from './PopUp';


const markerStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: 15,
}
const VehicleMarker = ({ data }) => {
    const { vinNumber, plateNumber, serialnumber, IMEI } = data || {}
    return (
        <Box sx={markerStyle}>
            <PopUp action={
                <Box sx={{ bgcolor: "#FF69B4", p: "2px", borderRadius: "4px" }}>
                    <DirectionsCarIcon sx={{ color: "#fff", fontSize: 15 }} />
                </Box>
            }>
                <Box sx={{ maxWidth: 150, '& p': { fontSize: 10 }, p: 1 }}>
                    <Typography>Plate No: {plateNumber}</Typography>
                    <Typography>Vin No: {vinNumber}</Typography>
                    <Typography>Serial Number: {serialnumber} </Typography>
                    <Typography>IMEI: {IMEI}</Typography>
                </Box>
            </PopUp>
        </Box>
    )
}
const StationMarker = ({ data }) => {
    const { address, serialNumber, stationName, stationId } = data || {};
    return (
        <Box sx={markerStyle}>
            <PopUp action={
                <Box sx={{ bgcolor: "#FF69B4", p: "2px", borderRadius: "4px" }}>
                    <EvStationIcon sx={{ color: "#fff", fontSize: 15 }} />
                </Box>}
            >
                <Box sx={{ maxWidth: 500, '& p': { fontSize: 10 }, p: 1 }}>
                    <Typography>Id: {stationId}</Typography>
                    <Typography>Serial No: {serialNumber}</Typography>
                    <Typography>Station: {stationName}</Typography>
                    <Typography>Address: {address}</Typography>
                </Box>
            </PopUp>
        </Box>
    )
}

export default function GoogleMapWrapper({ data = [], type }) {

    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(12);

    let points = [];
    if (type === "chargingStations") {
        points = data.map(({ stationName, lat, lon, id, address, serialNumber
        }) => ({
            type: "Feature",
            properties: { cluster: false, stationId: id, stationName, address, serialNumber },
            geometry: {
                type: "Point",
                coordinates: [
                    parseFloat(lon),
                    parseFloat(lat)
                ]
            }
        }))
    } else if (type === "registeredVehicles") {
        points = data.map(({ plateNumber, location, vinNumber, serialnumber, IMEI }) => ({
            type: "Feature",
            properties: { cluster: false, vehicleId: plateNumber, plateNumber: plateNumber, vinNumber:vinNumber, serialnumber:serialnumber, IMEI:IMEI },
            geometry: {
                type: "Point",
                coordinates: [
                    parseFloat(location?.split(",")[1]),
                    parseFloat(location?.split(",")[0])
                ]
            }
        }))
    }

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 40, maxZoom: 15, minPoints: 1 }
    });

    const defaultProps = {
        // Kuala Lumpur
        center: {
            lat: 3.1569,
            lng: 101.7123
        },
        zoom: 12
    };
    return (
        // Important! Always set the container height explicitly
        <Box sx={{ height: '65vh', width: '100%', mt: 2 }}>

            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyASgBw-4XeHUA3fYU3npK2wno70GDXHROY" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => mapRef.current = map}
                onChange={({ zoom, bounds }) => {
                    setZoom(zoom);
                    setBounds([
                        bounds.nw.lng,
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat
                    ]);
                }}
            >
                {
                    clusters.map(cluster => {
                        const [longitude, latitude] = cluster.geometry.coordinates;
                        const {
                            cluster: isCluster,
                            point_count: pointCount
                        } = cluster.properties;
                        if (isCluster) {
                            return (
                                <Box
                                    key={cluster.id}
                                    onClick={() => {
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            20
                                        );
                                        mapRef.current.setZoom(expansionZoom);
                                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                                    }}
                                    sx={{
                                        color: "#fff", display: "flex", justifyContent: "center", alignItems: "center",
                                        borderRadius: "50%", bgcolor: "#FF69B4", width: `${10 + (pointCount / points.length) * 50}px`,
                                        height: `${10 + (pointCount / points.length) * 50}px`
                                    }}
                                >{pointCount}</Box>
                            )
                        }
                        else {
                            if (type === "chargingStations") {
                                return (
                                    <StationMarker
                                        key={cluster.properties.stationId}
                                        lat={latitude}
                                        lng={longitude}
                                        data={cluster.properties}
                                    />
                                )
                            } else {
                                return (
                                    <VehicleMarker
                                        key={cluster.properties.vehicleId}
                                        lat={latitude}
                                        lng={longitude}
                                        data={cluster.properties}
                                    />
                                )
                            }

                        }
                    })
                }
            </GoogleMapReact>
        </Box>
    );
}

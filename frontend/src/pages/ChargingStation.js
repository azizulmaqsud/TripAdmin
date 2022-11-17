import React, { useState } from 'react';
import { useEffect } from 'react';
import CustomDataTable from '../components/CustomDataTable';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchChargingStations } from '../redux/chargingStation/chargingStationSlice';
import MultiSelect from '../components/common/MultiSelect';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
const headings = [
    {
        id: 'sl',
        align: "left",
        label: 'No.',
        hidden: true,
    },
    {
        id: 'documentName',
        align: "left",
        label: 'Document Name',
        required: true,
        details: true
    },
    {
        id: 'address',
        align: "left",
        label: 'Address',
    },
    {
        id: 'stationName',
        align: "left",
        label: 'Station Name',
    },
    {
        id: 'showOnMap',
        align: "left",
        label: 'Show On Map',
    },
    {
        id: 'serialNumber',
        align: "left",
        label: 'Serial Number',
    },
];


const ChargingStations = () => {
    const localStorageKey = "charging-station-column";
    const [columns, setColumns] = useState(JSON.parse(localStorage.getItem(localStorageKey) || '["sl", "documentName", "address", "stationName"]'))
    // const dispatch = useDispatch();
    // const { chargingStations, isLoading, isError, error } = useSelector(state => state.chargingStation);
    // useEffect(() => {
    //     dispatch(fetchChargingStations())
    // }, [dispatch])

    const [chargingStations, setChargingStations] = useState([])
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "chargingStations"), (doc) => {
            const data = doc.docs.map(item => item.data());
            setChargingStations(data);
        });
        return () => {
            unsubscribe();
        }
    }, [])
    console.log("chargingStations", chargingStations);
    return (
        <>
            <MultiSelect localStorageKey={localStorageKey} columns={columns} setColumns={setColumns} totalColumns={headings} />
            <CustomDataTable
                columns={columns}
                rows={chargingStations}
                // loading={isLoading}
                headings={headings}
                uniqueField="documentName"
                detailsPath="chargingStation-details"
            />
        </>
    );
};

export default ChargingStations;
import React from 'react';
import { useState } from 'react';

import { useEffect } from 'react';
import MultiSelect from '../components/common/MultiSelect';
import CustomDataTable from '../components/CustomDataTable';
//import { getVehicles } from '../services/vehiclesService';

import { useDispatch, useSelector } from "react-redux";
import { fetchRegisteredVehicles } from '../redux/registeredVehicles/registeredVehiclesSlice';

const headings = [
    {
        id: 'sl',
        align: "left",
        label: 'No.',
        hidden: true,
    },
    {
        id: 'plateNumber',
        align: "left",
        label: 'Plate Number',
        required: true,
        details: true
    },
    {
        id: 'vinNumber',
        align: "left",
        label: 'Vin Number',
    },
    {
        id: 'brandName',
        align: "left",
        label: 'Brand Name',
    },
    {
        id: 'serialNumber',
        align: "left",
        label: 'Serial Number',
    },
    {
        id: 'IMEI',
        align: "left",
        label: 'IMEI',
    },
    {
        id: 'algorandNFTID',
        align: "left",
        label: 'NFT ID',
    }
];


const Vehicles = () => {
    const localStorageKey = 'vehicles-column';
    const dispatch = useDispatch();
    const [columns, setColumns] = useState(JSON.parse(localStorage.getItem(localStorageKey) || '["sl", "plateNumber", "vinNumber", "brandName"]'))
    const { registeredVehicles, isLoading, isError, error } = useSelector(state => state.registeredVehicles);


    useEffect(() => {
        dispatch(fetchRegisteredVehicles())
    }, [dispatch])

    return (
        <>
            <MultiSelect localStorageKey={localStorageKey} columns={columns} setColumns={setColumns} totalColumns={headings} />
            <CustomDataTable
                columns={columns}
                rows={registeredVehicles}
                isError={isError}
                error={error}
                headings={headings}
                loading={isLoading}
                uniqueField="plateNumber"
                detailsPath="vehicle-details"
            />
        </>
    );
};

export default Vehicles;
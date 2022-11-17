import React, { useState } from 'react';
import { useEffect } from 'react';
import CustomDataTable from '../components/CustomDataTable';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from '../redux/users/usersSlice';
import MultiSelect from '../components/common/MultiSelect';
const headings = [
    {
        id: 'sl',
        align: "left",
        label: 'No.',
        hidden: true
    },
    {
        id: 'email',
        align: "left",
        label: 'Email',
        required: true,
        details: true
    },
    {
        id: 'fullName',
        align: "left",
        label: 'Full Name',
    },
    {
        id: 'phoneNumber',
        align: "left",
        label: 'Phone Number',
    },
    {
        id: 'activeBookings',
        align: "left",
        label: 'Active Bookings?',
    },
    {
        id: 'vehiclePlateNumber',
        align: "left",
        label: 'Vehicle plate <br/> number using',
    },
    {
        id: 'verified',
        align: "left",
        label: 'Pending <br/> Verification',
    }
];


const Users = () => {
    const localStorageKey = "user-column";
    const dispatch = useDispatch();
    const [columns, setColumns] = useState(JSON.parse(localStorage.getItem(localStorageKey) || '["sl", "email", "fullName", "phoneNumber"]'))
    const { users, isLoading, isError, error } = useSelector(state => state.users);
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <>
            <MultiSelect localStorageKey={localStorageKey} columns={columns} setColumns={setColumns} totalColumns={headings} />
            <CustomDataTable
                columns={columns}
                rows={users}
                isError={isError}
                error={error}
                headings={headings}
                loading={isLoading}
                uniqueField="email"
                detailsPath="user-details"
            />
        </>
    );
};

export default Users;


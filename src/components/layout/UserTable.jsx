import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { TextField, Button } from '@mui/material';
import axios from "axios";  // Import Axios
import DeleteIcon from '@mui/icons-material/Delete'; // Import Trash Icon
import EditNoteIcon from '@mui/icons-material/EditNote';
import { DialogContent, DialogActions, DialogTitle, Dialog } from '@mui/material';

// import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField as MuiTextField } from '@mui/material';

const UserTable = () => {
    const [searchText, setSearchText] = useState("");
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);  // Modal open state
    const [selectedUser, setSelectedUser] = useState(null);  // Data of the user selected for edit or delete
    const [isDelete, setIsDelete] = useState(false);
    const [error, setError] = useState("");  // Error state
    const fetchData = async () => {
        try {
            // Fetch the data from the protected endpoint
            const token = localStorage.getItem('jwt');

            if (!token) {
                throw new Error('No token found, please log in.');
            }
            const response = await axios.get('https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/users/all-users', {
                headers: {
                    Authorization: `Bearer ${token}`,  // Attach the token in the Authorization header
                },
            });
            setTableData(response.data);  // Store the response data in state
            setLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Invalid or expired token. Please log in again.');
            } else {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);
    if (loading) {
        return <div>Loading...</div>;  // Show loading while fetching
    }
    const columns = [
        {
            name: 'ID',
            cell: row => row.eid,
            id: 'employee-id',
            sortable: true,
            width: "80px",
        },
        {
            name: 'Name',
            selector: row => row.name,
            id: 'employee-name',
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            id: 'employee-email',
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            id: 'employee-role',
            sortable: true,
        },
        {
            name: 'Team',
            selector: row => row.team,
            id: 'employee-team',
            sortable: true,
        },
        {
            name: 'Edit',
            cell: row => (
                <EditNoteIcon className='icon-delete text-yellow-600' onClick={() => handleEdit(row)} />
            ),
            id: 'edit-button',
            sortable: false,
            width: "80px",
        },
        {
            name: 'Delete',
            cell: row => (
                <DeleteIcon className='icon-delete text-red-600' onClick={() => handleDelete(row)} />
            ),
            id: 'delete-button',
            sortable: false,
            width: "80px",
        },
    ];

    const filteredData = tableData.filter(employee =>
        employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchText.toLowerCase())
    );


    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsDelete(false);  // Set to false since we're editing
        setOpenModal(true);
        setError("");
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setIsDelete(true);  // Set to true since we're deleting
        setOpenModal(true);
        setError("");
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        setError("");
        // setLoading(true);  // Start loading
        const token = localStorage.getItem('jwt');
        if (isDelete) {

            try {
                const response = await axios.delete(`https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/users/delete-user/${selectedUser._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Attach the token in the Authorization header
                    },
                });
                if(response.status === 200){
                    fetchData();
                    handleCloseModal();
                }                
            } catch (err) {
                setError(`Something went wrong. Please try again.`);
            // } finally {
            //     setLoading(false);  // Stop loading                
            }
        } else {
            // Call edit API here (you can collect updated data from modal fields)
            try {
                const response = await axios.patch(`https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/users/update-user/${selectedUser._id}`,
                    { role: selectedUser.role, team: selectedUser.team }, {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Attach the token in the Authorization header
                    },
                });
                if(response.status === 200){
                    fetchData();
                    handleCloseModal();
                }
            } catch (err) {
                setError("Something went wrong. Please try again.");
            // } finally {
            //     setLoading(false);  // Stop loading
            //     handleCloseModal();
            }
        }
        //handleCloseModal();
    };


    return (
        <>
         <h2 className="title-heading">Employee List</h2>
            <TextField
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}

            />

            <DataTable
                //title="Employee List"
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                pointerOnHover
                subHeader
                subHeaderComponent={<div>Search Results</div>}
            />

            {/* Modal for Edit/Delete */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{isDelete ? 'Delete User' : 'Edit User'}</DialogTitle>
                <DialogContent>
                    {isDelete ? (
                        <div>
                            <p>Are you sure you want to delete this user?</p>
                            <p><strong>{selectedUser?.name}</strong> ({selectedUser?.email})</p>
                        </div>
                    ) : (
                        <div>
                            <TextField
                                label="Role"
                                value={selectedUser?.role || ''}
                                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                                fullWidth
                                margin="dense"
                            />
                            <TextField
                                label="Team"
                                value={selectedUser?.team || ''}
                                onChange={(e) => setSelectedUser({ ...selectedUser, team: e.target.value })}
                                fullWidth
                                margin="dense"
                            />
                        </div>
                    )}

                    {/* Display error message */}
                    {error && (
                        <div className="error-message">
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        {isDelete ? 'Delete' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UserTable;

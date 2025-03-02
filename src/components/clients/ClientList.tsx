// src/components/clients/ClientList.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    Alert,
    IconButton,
    Dialog,          // Import Dialog components
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,

} from '@mui/material';
import { useClientContext } from '../../context/ClientContext';
import { Link, useNavigate } from 'react-router-dom';
import { ClientFilters, ClientListClient } from '../../types/Client';
import ClientFilter from './ClientFilter';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


const ClientList: React.FC = () => {
    const { clients, loading, error, fetchClients, deleteClient } = useClientContext();
    const [filters, setFilters] = useState<ClientFilters>({});
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete confirmation
    const [clientToDelete, setClientToDelete] = useState<string | null>(null);
     const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
     const navigate = useNavigate();

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    useEffect(() => {
        fetchClients(filters);
    }, [fetchClients, filters]);

    const handleApplyFilters = (newFilters: ClientFilters) => {
        setFilters(newFilters);
    };

    // Open confirmation dialog
    const handleDeleteClick = (id: string) => {
        setClientToDelete(id);
        setOpenDeleteDialog(true);
    };

    // Close confirmation dialog
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setClientToDelete(null);
    };

    // Confirm and delete client
    const handleConfirmDelete = async () => {
        if (clientToDelete) {
            try {
                await deleteClient(clientToDelete);
                setSnackbarMessage('Client deleted successfully.');
                setSnackbarOpen(true);
            } catch (err) {
                // Handle error
                 setSnackbarMessage('Error deleting client.');
                setSnackbarOpen(true);
            } finally {
                handleCloseDeleteDialog(); // Close dialog after operation
            }
        }
    };



    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">Error loading clients: {error.message}</Alert>;
    }

    return (
        <>
            <ClientFilter onApplyFilters={handleApplyFilters} />
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/clients/create')}
                sx={{ mb: 2 }}
            >
                Add Client
            </Button>
            <Button variant="outlined" color="primary" onClick={() => navigate('/')} sx={{ ml: 2, mb:2 }}>
                Back
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="client table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell>{client.nombre}</TableCell>
                                <TableCell>{client.apellidos}</TableCell>
                                <TableCell>{client.identificacion}</TableCell>
                                <TableCell>
                                    <IconButton component={Link} to={`/clients/edit/${client.id}`}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(client.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

              {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this client?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />

        </>
    );
};

export default ClientList;
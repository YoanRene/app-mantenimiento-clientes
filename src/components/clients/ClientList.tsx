// src/components/clients/ClientList.tsx
import React, { useEffect, useState } from 'react';
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
    IconButton
} from '@mui/material';
import { useClientContext } from '../../context/ClientContext';
import { Link } from 'react-router-dom';
import {Client, ClientFilters} from '../../types/Client';
import ClientFilter from './ClientFilter';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import getUserId from '../utils';


const ClientList: React.FC = () => {
  const { clients, loading, error, fetchClients, deleteClient } = useClientContext();
    const [filters, setFilters] = useState<ClientFilters>({usuarioId:getUserId()!, nombre: '', identificacion:''});

  useEffect(() => {
    fetchClients(filters);  // Fetch clients when component mounts or filters change
  }, [fetchClients, filters]); // Include filters in the dependency array

    const handleApplyFilters = (newFilters: ClientFilters) => {
        setFilters(newFilters);
    };

  const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            try {
                await deleteClient(id);
                // Optionally, show a success message
            } catch (err) {
                // Handle error (e.g., show an error message)
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
    <TableContainer component={Paper}>
        <ClientFilter onApplyFilters={handleApplyFilters} />
      <Table aria-label="client table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Mobile Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.usuarioId}>
              <TableCell>{client.nombre}</TableCell>
              <TableCell>{client.apellidos}</TableCell>
              <TableCell>{client.identificacion}</TableCell>
              <TableCell>{client.celular}</TableCell>
              <TableCell>
                <IconButton component={Link} to={`/clients/${client.usuarioId}`}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton component={Link} to={`/clients/edit/${client.usuarioId}`}>
                 <EditIcon/>
                </IconButton>
                <IconButton onClick={() => handleDelete(client.usuarioId)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientList;
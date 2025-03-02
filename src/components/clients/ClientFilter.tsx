import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { ClientFilters } from '../../types/Client';
import getUserId from '../utils';


interface ClientFilterProps {
    onApplyFilters: (filters: ClientFilters) => void;
}



const ClientFilter: React.FC<ClientFilterProps> = ({ onApplyFilters }) => {
    const [filters, setFilters] = useState<ClientFilters>({
        usuarioId: getUserId()!,
        nombre: '',
        identificacion: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleApply = () => {
        onApplyFilters(filters);
    };

    const handleClear = () => {
        setFilters({usuarioId:getUserId()!, nombre: '', identificacion: ''});
        onApplyFilters({usuarioId:getUserId()!, nombre: '', identificacion: ''}); // Notify parent to clear filters
    }

    return (
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={filters.nombre || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    label="User ID"
                    name="userId"
                    value={filters.usuarioId || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    label="Identification"
                    name="identification"
                    value={filters.identificacion || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <Button variant="contained" color="primary" onClick={handleApply} sx={{ mr: 1 }}>
                    Apply Filters
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClear}>
                    Clear
                </Button>
            </Grid>
        </Grid>
    );
};

export default ClientFilter;
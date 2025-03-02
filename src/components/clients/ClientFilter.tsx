// src/components/clients/ClientFilter.tsx
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { ClientFilters } from '../../types/Client';
import SearchIcon from '@mui/icons-material/Search';

interface ClientFilterProps {
    onApplyFilters: (filters: ClientFilters) => void;
}

const ClientFilter: React.FC<ClientFilterProps> = ({ onApplyFilters }) => {
    const [filters, setFilters] = useState<ClientFilters>({});

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
        setFilters({});
        onApplyFilters({});
    };

    return (
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="Name"
                    name="nombre"  // Changed from firstName
                    value={filters.nombre || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="Identification"
                    name="identificacion" // Changed from identification
                    value={filters.identificacion || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button variant="contained" color="primary" onClick={handleApply} startIcon={<SearchIcon />} sx={{ mr: 1 }}>
                    Search
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClear}>
                    Clear
                </Button>
            </Grid>
        </Grid>
    );
};

export default ClientFilter;
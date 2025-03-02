import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { ClientFilters } from '../../types/Client';


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
        onApplyFilters({}); // Notify parent to clear filters
    }

    return (
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={filters.firstName || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={filters.lastName || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    label="Identification"
                    name="identification"
                    value={filters.identification || ''}
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
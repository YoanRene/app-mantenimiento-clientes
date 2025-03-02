// src/components/clients/ClientDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useClientContext } from '../../context/ClientContext';
import {
    Typography,
    Paper,
    CircularProgress,
    Alert, Grid
} from '@mui/material';
import {Client} from "../../types/Client";

const ClientDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getClient } = useClientContext();
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (id) {
            const fetchClient = async () => {
                try {
                    const fetchedClient = await getClient(id);
                    if (fetchedClient) {
                        setClient(fetchedClient);
                    } else {
                         setError("Client not found.");
                    }

                } catch (err) {
                  const error = err as Error;
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchClient();
        }
    }, [id, getClient]);

    if (loading) {
        return <CircularProgress />;
    }
    if (error) {
        return  <Alert severity="error">{error}</Alert>;
    }

    if (!client) {
        return  <Alert severity="info">Client not found.</Alert>;
    }

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Client Details: {client.nombre} {client.apellidos}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Identification:</Typography>
                    <Typography>{client.identificacion}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Mobile Phone:</Typography>
                    <Typography>{client.telefonoCelular}</Typography>
                </Grid>
                {client.otroTelefono && (  // Conditionally render otherPhone
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Other Phone:</Typography>
                        <Typography>{client.otroTelefono}</Typography>
                    </Grid>
                )}
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Address:</Typography>
                    <Typography>{client.direccion}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Birth Date:</Typography>
                    <Typography>{client.fNacimiento}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Affiliation Date:</Typography>
                    <Typography>{client.fAfiliacion}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Gender:</Typography>
                    <Typography>{client.sexo}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Personal Note:</Typography>
                    <Typography>{client.resenaPersonal}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Interests:</Typography>
                    <Typography>{client.interesFK}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ClientDetail;
// src/components/clients/ClientForm.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Alert,
    CircularProgress,
    Typography, Snackbar,
    SelectChangeEvent,
} from '@mui/material';
import { Client, Interest } from '../../types/Client';
import { useClientContext } from '../../context/ClientContext';
import { useParams, useNavigate } from 'react-router-dom';

const ClientForm: React.FC = () => {
    const { createClient, updateClient, getClient, interests, fetchInterests } = useClientContext();
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    const [clientData, setClientData] = useState<Client>({
        id: '',
        nombre: '',
        apellidos: '',
        identificacion: '',
        telefonoCelular: '',
        direccion: '',
        fNacimiento: '',
        fAfiliacion: '',
        sexo: 'M',
        resenaPersonal: '',
        imagen: '', // Store base64 image data
        interesFK: '',
    });


    useEffect(() => {
        const fetchData = async() => {

            if (id) {
              setLoading(true);
                try {
                    const client = await getClient(id);
                    if (client) {
                      // Format dates for the form fields
                        const formattedClient = {
                            ...client,
                            fNacimiento: client.fNacimiento ? client.fNacimiento.split('T')[0] : '', // Extract date part
                            fAfiliacion: client.fAfiliacion ? client.fAfiliacion.split('T')[0] : '',   // Extract date part
                        };
                      setClientData(formattedClient);
                    } else {
                        setError("Client not found");
                    }

                } catch (error) {
                  const err = error as Error;
                    setError(err.message);
                } finally{
                  setLoading(false);
                }
            }
             try {
                await fetchInterests(); // Fetch interests for the dropdown
            } catch (fetchError) {
                const err = fetchError as Error;
                setError(err.message);  // Handle interest fetching error
            }
        }
        fetchData();

    }, [id, getClient, fetchInterests]);


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
        const { name, value } = event.target as { name: keyof Client; value: string };

        setClientData({ ...clientData, [name]: value });
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Set the base64 string to the imagen property
                setClientData({ ...clientData, imagen: reader.result as string });
            };
            reader.readAsDataURL(file); // Read the file as a Data URL (base64)
        }
    };
    const handleInterestChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target as { value: string }; // Not multiple select
        setClientData({ ...clientData, interesFK: value });
    };

     const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
             // Format dates to 'YYYY-MM-DD' before sending
            const formattedData = {
                ...clientData,
                fNacimiento: clientData.fNacimiento ? clientData.fNacimiento.split('T')[0] : '',
                fAfiliacion:  clientData.fAfiliacion ? clientData.fAfiliacion.split('T')[0] : '',
            };

            if (id) {
                await updateClient(id, formattedData);
                 setSnackbarMessage('Client updated successfully.');

            } else {
                await createClient(formattedData);
                 setSnackbarMessage('Client created successfully.');
            }
            setSnackbarOpen(true);
            navigate('/clients');
        } catch (err) {
            const error = err as Error;
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <>
        <Typography variant="h4" gutterBottom>
            Client Management
        </Typography>
            {/* Image upload (optional) */}
        <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleImageChange}
        />
        <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" sx={{ mb: 2 }}>
                Upload Image
            </Button>
        </label>
        {clientData.imagen && (  // Display the image if available
            <img src={clientData.imagen} alt="Client" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        )}
        <form onSubmit={handleSubmit}>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="nombre"
                        value={clientData.nombre}
                        onChange={(event) => handleChange(event as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)}
                        required
                        inputProps={{ maxLength: 50 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="apellidos"
                        value={clientData.apellidos}
                        onChange={handleChange}
                        required
                        inputProps={{ maxLength: 100 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Identification"
                        name="identificacion"
                        value={clientData.identificacion}
                        onChange={handleChange}
                        required
                        inputProps={{ maxLength: 20 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Mobile Phone"
                        name="telefonoCelular"
                        value={clientData.telefonoCelular}
                        onChange={handleChange}
                        required
                        inputProps={{ maxLength: 20 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Other Phone"
                        name="otroTelefono"
                        value={clientData.otroTelefono || ''}
                        onChange={handleChange}
                        inputProps={{ maxLength: 20 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Address"
                        name="direccion"
                        value={clientData.direccion}
                        onChange={handleChange}
                        required
                        inputProps={{ maxLength: 200 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Birth Date"
                        name="fNacimiento"
                        type="date"
                        value={clientData.fNacimiento}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Affiliation Date"
                        name="fAfiliacion"
                        type="date"
                        value={clientData.fAfiliacion}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            label="Gender"
                            name="sexo"
                            value={clientData.sexo}
                            onChange={handleInterestChange}
                        >
                            <MenuItem value="M">Male</MenuItem>
                            <MenuItem value="F">Female</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Personal Note"
                        name="resenaPersonal"
                        multiline
                        rows={4}
                        value={clientData.resenaPersonal}
                        onChange={handleChange}
                        required
                        inputProps={{ maxLength: 200 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth required>
                       <InputLabel>Interests</InputLabel>
                        <Select
                            label="Interests"
                            name="interesFK"
                            value={clientData.interesFK || ''}
                            onChange={handleInterestChange}
                            required
                        >
                            {interests.map((interest) => (
                                <MenuItem key={interest.id} value={interest.id}>
                                    {interest.descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : (id ? 'Update Client' : 'Create Client')}
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => navigate('/clients')} sx={{ ml: 2 }}>
                        Back
                    </Button>
                </Grid>
            </Grid>
            </form>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />

        </>
    );
};

export default ClientForm;
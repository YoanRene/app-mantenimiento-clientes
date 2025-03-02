// src/components/clients/ClientForm.tsx
import React, { useState, useEffect } from 'react';
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
    SelectChangeEvent
} from '@mui/material';
import { Client } from '../../types/Client';
import { useClientContext } from '../../context/ClientContext';
import { useParams, useNavigate } from 'react-router-dom';


interface ClientFormProps{
  initialClient?:Client | null;
}

const ClientForm: React.FC<ClientFormProps> = () => {
  const { createClient, updateClient, getClient } = useClientContext();
  const { id } = useParams<{ id?: string }>(); // Get the ID from the URL
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

  const [clientData, setClientData] = useState<Client>({
        usuarioId: '', // Important to initialize id
        nombre: '',
        apellidos: '',
        identificacion: '',
        celular: '',
        direccion: '',
        fNacimiento: '',
        fAfiliacion: '',
        sexo: 'Male',
        resennaPersonal: '',
        interesFK: [],
    });

    useEffect(() => {
        if (id) { // If there's an ID, we are editing
            const fetchClientData = async () => {
                setLoading(true);
                try {
                    const client = await getClient(id); // Assuming getClient is defined in your context
                    if (client) {
                        setClientData(client);
                    } else {
                        setError("Client not found");
                    }

                } catch (error) {
                  const err = error as Error;
                    setError(err.message);
                } finally{
                  setLoading(false);
                }
            };

            fetchClientData();
        }
    }, [id, getClient]);



  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target as { name: keyof Client; value: string };
    setClientData({ ...clientData, [name]: value });
  };

  const handleInterestChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target as { value: string[] };
    setClientData({ ...clientData, interesFK: value });
  };

  const handleGenderChange = (event: SelectChangeEvent<'Male' | 'Female'>) => {
    const { name, value } = event.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
        setLoading(true);
        setError(null);
    try {
      if(id){
        await updateClient(id,clientData);
      } else {
        await createClient(clientData);
      }
      navigate('/clients'); // Redirect after successful submission
    } catch (err) {
        const error = err as Error;
        setError(error.message);
    } finally{
      setLoading(false);
    }
  };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <form onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={clientData.nombre}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={clientData.apellidos}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Identification"
            name="identification"
            value={clientData.identificacion}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Mobile Phone"
            name="mobilePhone"
            value={clientData.celular}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Other Phone"
            name="otherPhone"
            value={clientData.otroTelefono || ''}  // Handle optional field
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={clientData.direccion}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Birth Date"
            name="birthDate"
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
            name="affiliationDate"
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
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={clientData.sexo}
              onChange={handleGenderChange}
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Personal Note"
            name="personalNote"
            multiline
            rows={4}
            value={clientData.resennaPersonal}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Interests</InputLabel>
            <Select
              multiple
              name="interests"
              value={clientData.interesFK}
              onChange={handleInterestChange}
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {/* Replace with your actual interest options */}
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Music">Music</MenuItem>
              <MenuItem value="Reading">Reading</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Image upload (optional) would go here */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : (id ? 'Update Client' : 'Create Client')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ClientForm;
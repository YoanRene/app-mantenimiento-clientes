// src/services/clientService.ts
import axios from 'axios';
import { Client, ClientFilters, ClientListClient, Interest } from '../types/Client';
import config from '../config';

const API_BASE_URL = config.API_BASE_URL;

const getAuthToken = () => {
    return localStorage.getItem('token');
};
const getUserId = () => {
    return localStorage.getItem('userId');
}

// Axios interceptor (already in place, but included for completeness)
axios.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const clientService = {
    getAllClients: async (filters?: ClientFilters): Promise<ClientListClient[]> => {
        try {
            const userId = getUserId();
            if(!userId){
                throw new Error("User not authenticated");
            }
            const requestBody = {
                identificacion: filters?.identificacion || "",
                nombre: filters?.nombre || "",
                usuarioId: userId
            }
            const response = await axios.post(`${API_BASE_URL}/api/Cliente/Listado`, requestBody);
            return response.data;
        } catch (error) {
            console.error("Error fetching clients:", error);
            throw error;
        }
    },

    getClientById: async (id: string): Promise<Client> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/Cliente/Obtener/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error getting client with id ${id}:`, error);
            throw error;
        }
    },

    createClient: async (client: Client): Promise<Client> => {
        try {
            const userId = getUserId();
            if (!userId) {
              throw new Error("User not authenticated");
            }
            const requestBody = {
                ...client,
                celular: client.telefonoCelular,
                resennaPersonal: client.resenaPersonal,
                usuarioId: userId,
            };

            const response = await axios.post(`${API_BASE_URL}/api/Cliente/Crear`, requestBody);
            return response.data; // Assuming the API returns the created client
        } catch (error) {
            console.error("Error creating client:", error);
            throw error;
        }
    },


    updateClient: async (id: string, client: Client): Promise<Client> => {
       try {
            const userId = getUserId();
            if (!userId) {
              throw new Error("User not authenticated");
            }

            const requestBody = {
                ...client,
                celular: client.telefonoCelular,
                resennaPersonal: client.resenaPersonal,
                id: id, // Ensure ID is included for updates
                usuarioId: userId,
            };

            const response = await axios.post(`${API_BASE_URL}/api/Cliente/Actualizar`, requestBody);
            return response.data;
        } catch (error) {
            console.error(`Error updating client with id ${id}:`, error);
            throw error;
        }
    },

    deleteClient: async (id: string): Promise<void> => {
        try {
            await axios.delete(`${API_BASE_URL}/api/Cliente/Eliminar/${id}`);
        } catch (error) {
            console.error(`Error deleting client with id ${id}:`, error);
            throw error;
        }
    },

    getInterests: async(): Promise<Interest[]> => {
        try{
            const response = await axios.get(`${API_BASE_URL}/api/Intereses/Listado`);
            return response.data;
        } catch(error){
            console.log('Error getting interests:', error);
            throw error;
        }
    }
};

export default clientService;
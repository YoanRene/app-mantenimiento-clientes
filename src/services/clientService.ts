// src/services/clientService.ts
import axios from 'axios';
import { Client, ClientFilters } from '../types/Client';
import config from '../config';

const API_BASE_URL = config.API_BASE_URL; // Corrected base URL

// Function to get the authentication token
const getAuthToken = () => {
    return localStorage.getItem('token');
};
// Add an Axios interceptor to include the Authorization header
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
    getAllClients: async (filters?: ClientFilters): Promise<Client[]> => {
        try {
            const params = new URLSearchParams();
            if (filters) {
                for (const key in filters) {
                    if (filters[key as keyof ClientFilters]) {
                        params.append(key, filters[key as keyof ClientFilters]!);
                    }
                }
            }

            const response = await axios.get(`${API_BASE_URL}/api/Client`, { params }); // Use correct endpoint
            return response.data;
        } catch (error) {
            console.error("Error fetching clients:", error);
            throw error;
        }
    },

    getClientById: async (id: string): Promise<Client> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/Client/${id}`); // Use correct endpoint
            return response.data;
        } catch (error) {
            console.error(`Error getting client with id ${id}:`, error);
            throw error;
        }
    },

      createClient: async (client: Client): Promise<Client> => {
        try {
            // Remove the manually added ID, let the server handle it
            const { id, ...clientDataWithoutId } = client;
            const response = await axios.post(`${API_BASE_URL}/api/Client`, clientDataWithoutId);
            return response.data;
        } catch (error) {
            console.error("Error creating client:", error);
            throw error;
        }
    },

    updateClient: async (id: string, client: Client): Promise<Client> => {
        try {
             // Remove the manually added ID, let the server handle it
            const { id: clientId, ...clientDataWithoutId } = client;
            const response = await axios.put(`${API_BASE_URL}/api/Client/${id}`, clientDataWithoutId); // Use correct endpoint
            return response.data;
        } catch (error) {
            console.error(`Error updating client with id ${id}:`, error);
            throw error;
        }
    },

    deleteClient: async (id: string): Promise<void> => {
        try {
            await axios.delete(`${API_BASE_URL}/api/Client/${id}`); // Use correct endpoint
        } catch (error) {
            console.error(`Error deleting client with id ${id}:`, error);
            throw error;
        }
    },
};

export default clientService;
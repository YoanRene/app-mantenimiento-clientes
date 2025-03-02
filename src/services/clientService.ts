// src/services/clientService.ts
import axios from 'axios';
import { Client, ClientFilters } from '../types/Client';

const API_BASE_URL = 'http://localhost:3001/api'; // Replace with your API endpoint

// Simulate API calls (replace with actual backend calls)
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const clientService = {
    getAllClients: async (filters?: ClientFilters): Promise<Client[]> => {
      try{
        const params = new URLSearchParams();
        if (filters) {
            for (const key in filters) {
                if (filters[key as keyof ClientFilters]) {  // Type assertion
                    params.append(key, filters[key as keyof ClientFilters]!); // and Non-null assertion
                }
            }
        }

        const response = await axios.get(`${API_BASE_URL}/clients`, { params });
        await simulateDelay(500); // Simulate network latency
        return response.data; // Replace with actual data fetching
      } catch (error) {
            console.error("Error fetching clients:", error);
            throw error; // Re-throw the error for handling in the component
      }
    },

  getClientById: async (id: string): Promise<Client> => {
    try{
      const response = await axios.get(`${API_BASE_URL}/clients/${id}`);
        await simulateDelay(200); // Simulate network latency
        return response.data;
    } catch (error){
      console.error(`Error getting client with id ${id}:`, error);
      throw error;
    }
  },

  createClient: async (client: Client): Promise<Client> => {
      try {
          const response = await axios.post(`${API_BASE_URL}/clients`, client);
          await simulateDelay(500);
          return response.data;
      } catch (error) {
          console.error("Error creating client:", error);
          throw error;
      }
  },


  updateClient: async (id: string, client: Client): Promise<Client> => {
    try{
      const response = await axios.put(`${API_BASE_URL}/clients/${id}`, client);
        await simulateDelay(300);
        return response.data;
    } catch (error){
      console.error(`Error updating client with id ${id}:`, error);
      throw error;
    }
  },

  deleteClient: async (id: string): Promise<void> => {
    try{
        await axios.delete(`${API_BASE_URL}/clients/${id}`);
        await simulateDelay(200);
    } catch (error){
      console.error(`Error deleting client with id ${id}:`, error);
      throw error;
    }
  },
};

export default clientService;
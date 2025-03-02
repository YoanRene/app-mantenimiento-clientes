// src/context/ClientContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useCallback, useContext } from 'react';
import { Client, ClientFilters, ClientListClient, Interest } from '../types/Client';
import clientService from '../services/clientService';

interface ClientContextProps {
  clients: ClientListClient[];
  loading: boolean;
  error: Error | null;
  fetchClients: (filters?: ClientFilters) => Promise<void>;
  createClient: (client: Client) => Promise<void>;
  updateClient: (id: string, client: Client) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  getClient: (id: string) => Promise<Client | undefined>;
  interests: Interest[];
  fetchInterests: () => Promise<void>;
}

const ClientContext = createContext<ClientContextProps | undefined>(undefined);

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [clients, setClients] = useState<ClientListClient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);

   const fetchInterests = useCallback(async () => {
        try{
            const fetchedInterests = await clientService.getInterests();
            setInterests(fetchedInterests);

        } catch(error){
            console.error("Error fetching interests:", error);
        }
    },[]);

  const fetchClients = useCallback(async (filters?: ClientFilters) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedClients = await clientService.getAllClients(filters);
      setClients(fetchedClients);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createClient = useCallback(async (client: Client) => {
    setLoading(true);
    setError(null);
    try {
        await clientService.createClient(client);
        await fetchClients(); // Refresh the client list after creation
    } catch (err) {
        setError(err as Error);
        throw err;
    } finally {
        setLoading(false);
    }
}, [fetchClients]);


    const updateClient = useCallback(async (id: string, client: Client) => {
    setLoading(true);
    setError(null);
    try {
        await clientService.updateClient(id, client);
        await fetchClients(); // Refresh the list after update
    } catch (err) {
        setError(err as Error);
        throw err;
    } finally {
        setLoading(false);
    }
}, [fetchClients]);

    const deleteClient = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
        await clientService.deleteClient(id);
        setClients(prevClients => prevClients.filter(c => c.id !== id));
    } catch (err) {
        setError(err as Error);
         throw err;
    } finally {
        setLoading(false);
    }
}, []);

    const getClient = useCallback(async (id:string) => {
    setLoading(true);
    setError(null);
    try {
        const client = await clientService.getClientById(id);
        return client;
    } catch (error) {
        setError(error as Error);
    }
    finally{
        setLoading(false);
    }
}, []);

  const contextValue: ClientContextProps = {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    getClient,
      interests,
      fetchInterests,
  };

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};

const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  return context;
};

export { ClientProvider, useClientContext };
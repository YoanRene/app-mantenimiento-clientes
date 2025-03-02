// src/context/ClientContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useCallback, useContext } from 'react';
import { Client, ClientFilters } from '../types/Client';
import clientService from '../services/clientService';

interface ClientContextProps {
  clients: Client[];
  loading: boolean;
  error: Error | null;
  fetchClients: (filters?: ClientFilters) => Promise<void>;
  createClient: (client: Client) => Promise<void>;
  updateClient: (id: string, client: Client) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  getClient: (id: string) => Promise<Client | undefined>;
}

const ClientContext = createContext<ClientContextProps | undefined>(undefined);

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);


  const fetchClients = useCallback(async (filters?: ClientFilters) => { // Use useCallback for memoization
    setLoading(true);
    setError(null);
    try {
      const fetchedClients = await clientService.getAllClients(filters);
      setClients(fetchedClients);
    } catch (err) {
      setError(err as Error); // Type assertion
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array because fetchClients doesn't depend on any changing values

  const createClient = useCallback(async (client: Client) => {
        setLoading(true);
        setError(null);
        try {
            const newClient = await clientService.createClient(client);
            setClients(prevClients => [...prevClients, newClient]);
             // Ideally, return and indicate success (e.g., show a message)
        } catch (err) {
            setError(err as Error);
            throw err;  // Important: Re-throw to be handled by caller
        } finally {
            setLoading(false);
        }
  },[]);


    const updateClient = useCallback(async (id: string, client: Client) => {
        setLoading(true);
        setError(null);
        try {
            const updatedClient = await clientService.updateClient(id, client);
            setClients(prevClients =>
                prevClients.map(c => (c.usuarioId === id ? updatedClient : c))
            );
             // Indicate success
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    },[]);

    const deleteClient = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await clientService.deleteClient(id);
            setClients(prevClients => prevClients.filter(c => c.usuarioId !== id));
            // Indicate success
        } catch (err) {
            setError(err as Error);
             throw err;
        } finally {
            setLoading(false);
        }
    },[]);

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
    },[]);


  const contextValue: ClientContextProps = {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    getClient,
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
// src/types/Client.ts

export interface Client {
    id: string;
    nombre: string;  // Changed from firstName
    apellidos: string; // Changed from lastName
    identificacion: string;
    telefonoCelular: string; // Changed from mobilePhone
    otroTelefono?: string;
    direccion: string;
    fNacimiento: string; //  ISO 8601 format (YYYY-MM-DD)
    fAfiliacion: string; // ISO 8601 format (YYYY-MM-DD)
    sexo: 'M' | 'F'; // Changed from Male/Female
    resenaPersonal: string;
    imagen?: string;     // Base64 image data
    interesesId?: string; // ID of the selected interest
    interesFK?: string; //for creating and updating
  }
  export interface ClientListClient {
      id: string;
      identificacion: string;
      nombre: string;
      apellidos: string;
  }
  
  
  export interface ClientFilters {
      identificacion?: string;
      nombre?: string;
  }
  
  export interface Interest {
      id: string;
      descripcion: string;
  }
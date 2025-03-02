// src/types/Client.ts
export interface Client {
    usuarioId: string;  // Use string for UUIDs or similar IDs
    nombre: string;
    apellidos: string;
    identificacion: string;
    celular: string;
    otroTelefono?: string;  // Optional
    direccion: string;
    fNacimiento: string; //  ISO 8601 format (YYYY-MM-DD)
    fAfiliacion: string; // ISO 8601 format (YYYY-MM-DD)
    sexo: 'Male' | 'Female';
    resennaPersonal: string;
    imagen?: string;     // Optional: URL to the image
    interesFK: string[]; // Array of selected interests
  }
  
  export interface ClientFilters {
      usuarioId: string;
      nombre?: string;
      identificacion?: string;
  }
// src/types/Client.ts
export interface Client {
    id: string;  // Use string for UUIDs or similar IDs
    firstName: string;
    lastName: string;
    identification: string;
    mobilePhone: string;
    otherPhone?: string;  // Optional
    address: string;
    birthDate: string; //  ISO 8601 format (YYYY-MM-DD)
    affiliationDate: string; // ISO 8601 format (YYYY-MM-DD)
    gender: 'Male' | 'Female';
    personalNote: string;
    image?: string;     // Optional: URL to the image
    interests: string[]; // Array of selected interests
  }
  
  export interface ClientFilters {
      firstName?: string;
      lastName?: string;
      identification?: string;
  }
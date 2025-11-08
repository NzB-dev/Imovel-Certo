
export enum PropertyType {
  CASA = 'Casa',
  APARTAMENTO = 'Apartamento',
  TERRENO = 'Terreno',
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  description: string;
  price: number;
  area: number; // m²
  city: string;
  neighborhood: string;
  images: string[];
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  ownerId: string;
  createdAt: number;
}

export interface User {
  id: string;
  email: string;
}

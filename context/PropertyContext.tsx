
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { Property } from '../types';
import { PropertyType } from '../types';

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: string, updatedProperty: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getPropertyById: (id: string) => Property | undefined;
}

export const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const initialProperties: Property[] = [
    {
        id: 'prop1',
        title: 'Apartamento Moderno no Centro',
        type: PropertyType.APARTAMENTO,
        description: 'Lindo apartamento com 2 quartos, sala ampla e cozinha planejada. Localização privilegiada perto de tudo que você precisa.',
        price: 450000,
        area: 75,
        city: 'São Paulo',
        neighborhood: 'Centro',
        images: ['https://picsum.photos/seed/prop1/800/600', 'https://picsum.photos/seed/prop1a/800/600', 'https://picsum.photos/seed/prop1b/800/600'],
        contactName: 'Carlos Silva',
        contactPhone: '11987654321',
        contactEmail: 'carlos.silva@example.com',
        ownerId: 'user_123',
        createdAt: Date.now() - 100000
    },
    {
        id: 'prop2',
        title: 'Casa Espaçosa com Quintal',
        type: PropertyType.CASA,
        description: 'Casa com 3 suítes, piscina, churrasqueira e um grande quintal. Perfeita para a sua família. Acabamentos de primeira linha.',
        price: 980000,
        area: 220,
        city: 'Rio de Janeiro',
        neighborhood: 'Barra da Tijuca',
        images: ['https://picsum.photos/seed/prop2/800/600', 'https://picsum.photos/seed/prop2a/800/600'],
        contactName: 'Mariana Oliveira',
        contactPhone: '21912345678',
        contactEmail: 'mariana.o@example.com',
        ownerId: 'user_456',
        createdAt: Date.now() - 200000
    },
    {
        id: 'prop3',
        title: 'Terreno Plano Pronto para Construir',
        type: PropertyType.TERRENO,
        description: 'Excelente terreno de 500m² em condomínio fechado com segurança 24h. Topografia plana, ideal para construir a casa dos seus sonhos.',
        price: 250000,
        area: 500,
        city: 'Belo Horizonte',
        neighborhood: 'Pampulha',
        images: ['https://picsum.photos/seed/prop3/800/600'],
        contactName: 'José Pereira',
        contactPhone: '31999998888',
        contactEmail: 'jose.p@example.com',
        ownerId: 'user_123',
        createdAt: Date.now()
    }
];

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
        const storedProperties = localStorage.getItem('properties');
        return storedProperties ? JSON.parse(storedProperties) : initialProperties;
    } catch (error) {
        console.error("Failed to parse properties from localStorage", error);
        return initialProperties;
    }
  });

  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: `prop_${Date.now()}`,
      createdAt: Date.now()
    };
    setProperties(prev => [newProperty, ...prev]);
  };

  const updateProperty = (id: string, updatedPropertyData: Partial<Property>) => {
    setProperties(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedPropertyData } : p))
    );
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };
  
  const getPropertyById = (id: string) => {
    return properties.find(p => p.id === id);
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty, getPropertyById }}>
      {children}
    </PropertyContext.Provider>
  );
};

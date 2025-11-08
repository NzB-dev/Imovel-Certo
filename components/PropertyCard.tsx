
import React from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../types';
import { PropertyType } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { BuildingIcon } from './icons/BuildingIcon';
import { MapIcon } from './icons/MapIcon';

interface PropertyCardProps {
  property: Property;
}

const TypeIcon: React.FC<{ type: PropertyType }> = ({ type }) => {
    switch (type) {
        case PropertyType.CASA:
            return <HomeIcon className="w-5 h-5 text-secondary" />;
        case PropertyType.APARTAMENTO:
            return <BuildingIcon className="w-5 h-5 text-secondary" />;
        case PropertyType.TERRENO:
            return <MapIcon className="w-5 h-5 text-secondary" />;
        default:
            return null;
    }
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="block bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="relative">
        <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">{property.type}</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{property.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{property.city}, {property.neighborhood}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
             <TypeIcon type={property.type} />
             <span>{property.area} m²</span>
          </div>
          <p className="text-lg font-extrabold text-primary">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

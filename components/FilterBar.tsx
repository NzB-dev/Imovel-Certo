
import React from 'react';
import { PropertyType } from '../types';

interface FilterState {
  type: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  uniqueCities: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, uniqueCities }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Filter by Type */}
        <div className="col-span-1">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="type" name="type" value={filters.type} onChange={onFilterChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
            <option value="">Todos</option>
            {Object.values(PropertyType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        {/* Filter by City */}
         <div className="col-span-1">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
          <select id="city" name="city" value={filters.city} onChange={onFilterChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
            <option value="">Todas</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Filter by Price */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
            <div className="flex items-center space-x-2">
                <input type="number" name="minPrice" placeholder="Mín" value={filters.minPrice} onChange={onFilterChange} className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                <input type="number" name="maxPrice" placeholder="Máx" value={filters.maxPrice} onChange={onFilterChange} className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
        </div>

        {/* Filter by Area */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
            <div className="flex items-center space-x-2">
                <input type="number" name="minArea" placeholder="Mín" value={filters.minArea} onChange={onFilterChange} className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                <input type="number" name="maxArea" placeholder="Máx" value={filters.maxArea} onChange={onFilterChange} className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
        </div>
        
      </div>
    </div>
  );
};

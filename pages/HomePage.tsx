
import React, { useState, useMemo, useCallback } from 'react';
import { useProperties } from '../hooks/useProperties';
import { PropertyCard } from '../components/PropertyCard';
import { FilterBar } from '../components/FilterBar';

export const HomePage: React.FC = () => {
  const { properties } = useProperties();
  const [filters, setFilters] = useState({
    type: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
  });

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const uniqueCities = useMemo(() => {
    const cities = new Set(properties.map(p => p.city));
    return Array.from(cities).sort();
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const { type, city, minPrice, maxPrice, minArea, maxArea } = filters;
      if (type && property.type !== type) return false;
      if (city && property.city !== city) return false;
      if (minPrice && property.price < parseFloat(minPrice)) return false;
      if (maxPrice && property.price > parseFloat(maxPrice)) return false;
      if (minArea && property.area < parseInt(minArea, 10)) return false;
      if (maxArea && property.area > parseInt(maxArea, 10)) return false;
      return true;
    });
  }, [properties, filters]);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FilterBar filters={filters} onFilterChange={handleFilterChange} uniqueCities={uniqueCities} />

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">Nenhum imóvel encontrado</h2>
            <p className="text-gray-500 mt-2">Tente ajustar os filtros para encontrar o que procura.</p>
        </div>
      )}
    </main>
  );
};

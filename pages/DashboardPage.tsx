
import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProperties } from '../hooks/useProperties';
import { Property } from '../types';
import { PropertyForm } from '../components/PropertyForm';
import { Modal } from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const DashboardPropertyRow: React.FC<{ property: Property, onEdit: (p: Property) => void, onDelete: (id: string) => void }> = ({ property, onEdit, onDelete }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-grow">
            <img src={property.images[0]} alt={property.title} className="w-24 h-16 object-cover rounded-md hidden sm:block"/>
            <div>
                <h3 className="font-semibold text-gray-800">{property.title}</h3>
                <p className="text-sm text-gray-500">{property.city} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}</p>
            </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => onEdit(property)} className="px-3 py-1 text-sm font-medium text-white bg-secondary rounded-md hover:bg-primary">Editar</button>
            <button onClick={() => onDelete(property.id)} className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Excluir</button>
        </div>
    </div>
)

export const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { properties, deleteProperty } = useProperties();
  const navigate = useNavigate();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const userProperties = useMemo(() => {
    return properties
      .filter(p => p.ownerId === user?.id)
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [properties, user]);

  const handleCreate = () => {
    setPropertyToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (property: Property) => {
    setPropertyToEdit(property);
    setIsFormModalOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if(window.confirm('Tem certeza que deseja excluir este anúncio?')) {
        deleteProperty(id);
    }
  }

  const handleFormSubmit = () => {
    setIsFormModalOpen(false);
    setPropertyToEdit(null);
  };

  if (!isAuthenticated) {
      return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Meus Anúncios</h1>
          <button
            onClick={handleCreate}
            className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-secondary transition-colors"
          >
            + Novo Anúncio
          </button>
        </div>

        {userProperties.length > 0 ? (
          <div className="space-y-4">
            {userProperties.map(property => (
              <DashboardPropertyRow key={property.id} property={property} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h2 className="text-xl font-semibold text-gray-600">Você ainda não tem anúncios.</h2>
              <p className="text-gray-500 mt-2">Clique em "Novo Anúncio" para começar a vender.</p>
          </div>
        )}
      </main>

      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={propertyToEdit ? 'Editar Anúncio' : 'Novo Anúncio'}>
        <PropertyForm propertyToEdit={propertyToEdit} onFormSubmit={handleFormSubmit} />
      </Modal>
    </div>
  );
};

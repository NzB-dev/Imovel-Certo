import React, { useState, useEffect } from 'react';
import { Property, PropertyType } from '../types';
import { useProperties } from '../hooks/useProperties';
import { useAuth } from '../hooks/useAuth';

interface PropertyFormProps {
  propertyToEdit?: Property | null;
  onFormSubmit: () => void;
}

const emptyFormState = {
  title: '',
  type: PropertyType.CASA,
  description: '',
  price: '',
  area: '',
  city: '',
  neighborhood: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
};

export const PropertyForm: React.FC<PropertyFormProps> = ({ propertyToEdit, onFormSubmit }) => {
  const [formData, setFormData] = useState(emptyFormState);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { addProperty, updateProperty } = useProperties();
  const { user } = useAuth();

  useEffect(() => {
    if (propertyToEdit) {
      setFormData({
        title: propertyToEdit.title,
        type: propertyToEdit.type,
        description: propertyToEdit.description,
        price: String(propertyToEdit.price),
        area: String(propertyToEdit.area),
        city: propertyToEdit.city,
        neighborhood: propertyToEdit.neighborhood,
        contactName: propertyToEdit.contactName,
        contactPhone: propertyToEdit.contactPhone,
        contactEmail: propertyToEdit.contactEmail,
      });
      setImagePreviews(propertyToEdit.images);
    } else {
      setFormData(emptyFormState);
      setImagePreviews([]);
    }
  }, [propertyToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      
      // FIX: Add type assertion to fix `unknown` type issue from Array.from on FileList.
      const previews = files.map(file => URL.createObjectURL(file as File));
      setImagePreviews(previews);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Você precisa estar logado para criar um anúncio.");
      return;
    }

    const imageBase64Strings = await Promise.all(images.map(fileToBase64));
    
    const propertyData = {
      ...formData,
      price: parseFloat(formData.price),
      area: parseInt(formData.area, 10),
      images: imageBase64Strings.length > 0 ? imageBase64Strings : propertyToEdit?.images || [],
      ownerId: user.id,
    };

    if (propertyToEdit) {
      updateProperty(propertyToEdit.id, propertyData);
    } else {
      addProperty(propertyData);
    }
    onFormSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium">Título do Anúncio</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
            </div>
            <div>
                <label className="block text-sm font-medium">Tipo de Imóvel</label>
                <select name="type" value={formData.type} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required>
                    {Object.values(PropertyType).map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium">Preço (R$)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
            </div>
            <div>
                <label className="block text-sm font-medium">Área (m²)</label>
                <input type="number" name="area" value={formData.area} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
            </div>
             <div>
                <label className="block text-sm font-medium">Cidade</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
            </div>
            <div>
                <label className="block text-sm font-medium">Bairro</label>
                <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
            </div>
             <div className="md:col-span-2">
                <label className="block text-sm font-medium">Descrição</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 w-full p-2 border rounded" rows={4} required></textarea>
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium">Imagens</label>
                <input type="file" multiple onChange={handleImageChange} className="mt-1 w-full text-sm" />
                <div className="mt-2 grid grid-cols-3 gap-2">
                    {imagePreviews.map((src, index) => <img key={index} src={src} alt="Preview" className="w-full h-24 object-cover rounded"/>)}
                </div>
            </div>
            <h3 className="md:col-span-2 text-lg font-semibold mt-4 border-t pt-4">Informações de Contato</h3>
            <div>
                <label className="block text-sm font-medium">Nome</label>
                <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
            </div>
            <div>
                <label className="block text-sm font-medium">Telefone / WhatsApp</label>
                <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
            </div>
             <div className="md:col-span-2">
                <label className="block text-sm font-medium">Email de Contato</label>
                <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
            </div>
       </div>

      <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-secondary transition-colors font-semibold">
        {propertyToEdit ? 'Atualizar Anúncio' : 'Criar Anúncio'}
      </button>
    </form>
  );
};
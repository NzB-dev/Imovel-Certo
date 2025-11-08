
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';

export const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById } = useProperties();
  const property = getPropertyById(id || '');

  const [mainImage, setMainImage] = useState(property?.images[0] || '');

  if (!property) {
    return <div className="text-center py-10">Imóvel não encontrado.</div>;
  }
  
  const handleShare = () => {
    const shareData = {
      title: property.title,
      text: `Confira este imóvel incrível: ${property.title}`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      // Fallback for desktop/browsers that don't support Web Share API
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-4">
                    <div className="md:col-span-2">
                        <img src={mainImage} alt={property.title} className="w-full h-96 object-cover rounded-lg" />
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
                        {property.images.map((img, index) => (
                            <img 
                                key={index} 
                                src={img} 
                                alt={`${property.title} - view ${index + 1}`} 
                                className={`w-full h-28 object-cover rounded-md cursor-pointer border-4 ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <span className="inline-block bg-blue-100 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-2">{property.type}</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{property.title}</h1>
                        <p className="text-lg text-gray-500 mt-2">{property.city}, {property.neighborhood}</p>
                        
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-700">
                             <div className="flex items-center space-x-2">
                                <span className="font-bold">Área:</span>
                                <span>{property.area} m²</span>
                             </div>
                        </div>

                        <div className="mt-8 border-t pt-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descrição</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{property.description}</p>
                        </div>
                        
                         <div className="mt-8 border-t pt-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Localização</h2>
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                                <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${property.city}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:P%7C${property.city}&key=YOUR_API_KEY`} alt="Mapa da localização" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white font-bold">VISUALIZAÇÃO DO MAPA</div>
                            </div>
                         </div>
                    </div>
                    
                    {/* Sidebar */}
                    <aside>
                        <div className="sticky top-24 bg-gray-50 border rounded-lg p-6">
                             <p className="text-4xl font-extrabold text-primary mb-6">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}
                            </p>
                            
                            <h3 className="text-xl font-semibold text-gray-800 border-t pt-6 mb-4">Informações para Contato</h3>
                            <div className="space-y-3 text-gray-600">
                                <p><span className="font-semibold">Nome:</span> {property.contactName}</p>
                                <p><span className="font-semibold">Telefone:</span> {property.contactPhone}</p>
                                <p><span className="font-semibold">Email:</span> {property.contactEmail}</p>
                            </div>

                            <button onClick={handleShare} className="mt-6 w-full py-3 px-4 bg-accent text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2">
                                <span>Compartilhar</span>
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </div>
  );
};

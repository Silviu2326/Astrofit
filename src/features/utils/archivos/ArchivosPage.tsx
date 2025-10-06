import React, { useState } from 'react';
import ArchivosGrid from './components/ArchivosGrid';
import ArchivoUpload from './components/ArchivoUpload';
import ArchivosFilters from './components/ArchivosFilters';
import ArchivoViewer from './components/ArchivoViewer';
import { FileItem } from './archivosApi';

const ArchivosPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [filters, setFilters] = useState({}); // Placeholder for filter state
  const [searchTerm, setSearchTerm] = useState(''); // Placeholder for search term

  // Mock data for demonstration
  const mockFiles: FileItem[] = [
    {
      id: '1',
      name: 'contrato_cliente_A.pdf',
      extension: 'pdf',
      size: '1.2 MB',
      uploadDate: '2023-01-15',
      associatedClient: 'Cliente A',
      tags: ['contratos'],
      version: 1,
      thumbnail: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=PDF',
      url: 'https://www.africau.edu/images/default/sample.pdf'
    },
    {
      id: '2',
      name: 'certificado_medico_B.jpg',
      extension: 'jpg',
      size: '800 KB',
      uploadDate: '2023-02-20',
      associatedClient: 'Cliente B',
      tags: ['médicos', 'fotos'],
      version: 2,
      thumbnail: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=JPG',
      url: 'https://via.placeholder.com/800'
    },
    {
      id: '3',
      name: 'programa_entrenamiento_C.pdf',
      extension: 'pdf',
      size: '2.5 MB',
      uploadDate: '2023-03-10',
      associatedClient: 'Cliente C',
      tags: ['programas'],
      version: 1,
      thumbnail: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=PDF',
      url: 'https://www.africau.edu/images/default/sample.pdf'
    },
    {
      id: '4',
      name: 'progreso_cliente_A.png',
      extension: 'png',
      size: '1.5 MB',
      uploadDate: '2023-04-01',
      associatedClient: 'Cliente A',
      tags: ['fotos'],
      version: 1,
      thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?text=PNG',
      url: 'https://via.placeholder.com/1500'
    },
  ];

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
  };

  const handleCloseViewer = () => {
    setSelectedFile(null);
  };

  const handleUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    // In a real app, this would call the API to upload files
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Apply filters to mockFiles or fetch new data
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Apply search to mockFiles or fetch new data
  };

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Archivos CRM</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-3">
          <ArchivoUpload onUpload={handleUpload} />
        </div>
        <div className="md:col-span-1">
          <ArchivosFilters onFilterChange={handleFilterChange} onSearch={handleSearch} />
        </div>
      </div>

      <ArchivosGrid files={filteredFiles} onFileSelect={handleFileSelect} />

      {selectedFile && (
        <ArchivoViewer file={selectedFile} onClose={handleCloseViewer} />
      )}
    </div>
  );
};

export default ArchivosPage;
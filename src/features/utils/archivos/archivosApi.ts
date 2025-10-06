export interface FileItem {
  id: string;
  name: string;
  extension: string;
  size: string;
  uploadDate: string;
  associatedClient: string;
  tags: string[];
  version: number;
  thumbnail?: string;
  url: string;
}

export interface FileVersion {
  version: number;
  uploadDate: string;
  uploadedBy: string;
  url: string;
}

// Mock API functions
export const archivosApi = {
  fetchFiles: async (filters?: any, searchTerm?: string): Promise<FileItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate API call delay
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

        let filteredFiles = mockFiles;

        if (searchTerm) {
          filteredFiles = filteredFiles.filter(file =>
            file.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Apply filters if provided (simplified for mock)
        if (filters) {
          // Example: filter by type
          if (filters.fileType) {
            filteredFiles = filteredFiles.filter(file => file.extension === filters.fileType);
          }
          // Add more filter logic here as needed
        }

        resolve(filteredFiles);
      }, 500);
    });
  },

  uploadFile: async (file: File): Promise<FileItem> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Uploading file:', file.name);
        const newFile: FileItem = {
          id: Date.now().toString(),
          name: file.name,
          extension: file.name.split('.').pop() || '',
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          associatedClient: 'Unknown', // Or derive from context
          tags: [],
          version: 1,
          thumbnail: file.type.startsWith('image') ? URL.createObjectURL(file) : 'https://via.placeholder.com/150/CCCCCC/000000?text=FILE',
          url: URL.createObjectURL(file), // Placeholder URL
        };
        resolve(newFile);
      }, 1000);
    });
  },

  fetchFileVersions: async (fileId: string): Promise<FileVersion[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Fetching versions for file ${fileId}`);
        const mockVersions: FileVersion[] = [
          { version: 1, uploadDate: '2023-01-10', uploadedBy: 'User A', url: '#' },
          { version: 2, uploadDate: '2023-01-15', uploadedBy: 'User B', url: '#' },
        ];
        resolve(mockVersions);
      }, 300);
    });
  },

  shareFile: async (fileId: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Sharing file ${fileId}`);
        resolve(`https://example.com/share/${fileId}`);
      }, 200);
    });
  },

  downloadFile: async (fileId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Downloading file ${fileId}`);
        // In a real app, this would initiate a download
        resolve();
      }, 200);
    });
  },

  deleteFile: async (fileId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Deleting file ${fileId}`);
        resolve();
      }, 200);
    });
  },
};
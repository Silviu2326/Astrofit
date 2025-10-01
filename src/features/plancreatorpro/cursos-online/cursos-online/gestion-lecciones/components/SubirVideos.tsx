import React, { useState } from 'react';
import { uploadVideo } from '../gestionLeccionesApi';

const SubirVideos: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      try {
        const url = await uploadVideo(selectedFile);
        console.log('Video subido:', url);
        // TODO: Integrar la URL del video en el editor modular
      } catch (error) {
        console.error('Error al subir el video:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="border p-4 rounded-md bg-white">
      <h3 className="font-semibold mb-2">Subir Videos</h3>
      <input type="file" accept="video/*" onChange={handleFileChange} className="mb-2" />
      {previewUrl && (
        <div className="mb-2">
          <video src={previewUrl} controls className="max-w-full h-auto rounded-md" />
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-blue-300"
      >
        {uploading ? 'Subiendo...' : 'Subir Video'}
      </button>
    </div>
  );
};

export default SubirVideos;

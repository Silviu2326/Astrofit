import React, { useState } from 'react';
// Asumiendo que usarás una librería para el crop, por ejemplo 'react-easy-crop'
// import Cropper from 'react-easy-crop';

const UploaderLogo: React.FC = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Aquí podrías inicializar el cropper con la imagen
    }
  };

  const handleUpload = () => {
    if (logoFile) {
      // Lógica para subir el logo (con el crop aplicado si se usa un cropper)
      console.log('Subiendo logo:', logoFile.name);
      // Aquí llamarías a personalizacionEstilosApi.uploadLogo(formData)
    }
  };

  // const onCropComplete = (croppedArea, croppedAreaPixels) => {
  //   console.log(croppedArea, croppedAreaPixels);
  //   // Aquí obtendrías la imagen croppeada para subir
  // };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Uploader de Logo</h2>

      <div className="mb-4">
        <label htmlFor="logoUpload" className="block text-sm font-medium text-gray-700 mb-2">Subir Logo</label>
        <input
          type="file"
          id="logoUpload"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
      </div>

      {previewUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Previsualización y Crop</h3>
          <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded-md">
            <img src={previewUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
            {/* Aquí iría el componente Cropper */}
            {/* <Cropper
              image={previewUrl}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1} // Ejemplo de aspecto cuadrado
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            /> */}
          </div>
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Guardar Logo
          </button>
        </div>
      )}
    </div>
  );
};

export default UploaderLogo;

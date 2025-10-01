import React, { useEffect, useState } from 'react';
import { fetchBanners } from '../recursosAfiliadosApi';

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  downloadUrl: string;
}

const BannersMarketing: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const getBanners = async () => {
      const data = await fetchBanners();
      setBanners(data as Banner[]);
    };
    getBanners();
  }, []);

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Banners de Marketing</h3>
      <p className="text-gray-700 mb-4">
        Utiliza estos banners visualmente atractivos para tus campañas. Haz clic para previsualizar y descargar.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="border rounded-lg p-4 shadow-sm">
            <img src={banner.imageUrl} alt={banner.title} className="w-full h-48 object-cover mb-2 rounded" />
            <h4 className="font-medium">{banner.title}</h4>
            <a href={banner.downloadUrl} download className="text-blue-600 hover:underline text-sm mt-2 block">
              Descargar Banner
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannersMarketing;

// src/features/email-broadcast/reportes-envio/reportesEnvioApi.ts

export interface MetricasEmail {
  tasaApertura: number;
  tasaClics: number;
  tasaBajas: number;
  emailsEnviados: number;
  emailsEntregados: number;
}

export interface ConversionData {
  paso: string;
  cantidad: number;
}

export interface IngresosCampana {
  nombreCampana: string;
  ingresos: number;
  roi: number;
}

export interface ComparativaCampana {
  id: string;
  nombre: string;
  tasaApertura: number;
  tasaClics: number;
  ingresos: number;
  fechaEnvio: string;
}

// Simulamos una API para obtener datos de reportes
export const fetchMetricasEmail = async (): Promise<MetricasEmail> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tasaApertura: 25.5,
        tasaClics: 4.2,
        tasaBajas: 0.5,
        emailsEnviados: 10000,
        emailsEntregados: 9800,
      });
    }, 500);
  });
};

export const fetchEmbudoConversion = async (): Promise<ConversionData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { paso: 'Enviados', cantidad: 10000 },
        { paso: 'Abiertos', cantidad: 2550 },
        { paso: 'Clics', cantidad: 420 },
        { paso: 'Compras', cantidad: 50 },
      ]);
    }, 700);
  });
};

export const fetchAnalisisIngresos = async (): Promise<IngresosCampana[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { nombreCampana: 'Campaña Verano 2024', ingresos: 1200, roi: 250 },
        { nombreCampana: 'Oferta Especial Enero', ingresos: 800, roi: 180 },
        { nombreCampana: 'Lanzamiento Producto X', ingresos: 3500, roi: 400 },
      ]);
    }, 600);
  });
};

export const fetchComparativaCampanas = async (): Promise<ComparativaCampana[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'camp1', nombre: 'Campaña Verano 2024', tasaApertura: 25.5, tasaClics: 4.2, ingresos: 1200, fechaEnvio: '2024-07-15' },
        { id: 'camp2', nombre: 'Oferta Especial Enero', tasaApertura: 22.1, tasaClics: 3.8, ingresos: 800, fechaEnvio: '2024-01-20' },
        { id: 'camp3', nombre: 'Lanzamiento Producto X', tasaApertura: 30.1, tasaClics: 5.5, ingresos: 3500, fechaEnvio: '2024-09-01' },
        { id: 'camp4', nombre: 'Black Friday 2023', tasaApertura: 28.0, tasaClics: 4.9, ingresos: 2100, fechaEnvio: '2023-11-25' },
      ]);
    }, 800);
  });
};
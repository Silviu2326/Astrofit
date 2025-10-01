import React, { useState } from 'react';

const GuiaPasoAPaso: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      title: 'Paso 1: Accede a tu proveedor de dominio',
      description: 'Inicia sesión en el panel de control de tu registrador de dominios (ej: GoDaddy, Namecheap, Cloudflare).',
    },
    {
      title: 'Paso 2: Localiza la configuración DNS',
      description: 'Busca la sección de "Gestión de DNS", "Editor de Zona DNS" o similar.',
    },
    {
      title: 'Paso 3: Añade un registro CNAME',
      description: 'Crea un nuevo registro CNAME con los siguientes valores:',
      details: (
        <ul className="list-disc list-inside ml-4 mt-2">
          <li><strong>Tipo:</strong> CNAME</li>
          <li><strong>Host/Nombre:</strong> <code>www</code> (o el subdominio que desees)</li>
          <li><strong>Valor/Apuntado a:</strong> <code>tudominio.micrositio.com</code> (este valor te lo proporcionaremos)</li>
          <li><strong>TTL:</strong> Automático o 3600 segundos</li>
        </ul>
      ),
    },
    {
      title: 'Paso 4: Guarda los cambios',
      description: 'Asegúrate de guardar la configuración DNS. Los cambios pueden tardar hasta 48 horas en propagarse.',
    },
    {
      title: 'Paso 5: Verifica el dominio',
      description: 'Una vez guardados los cambios, vuelve a esta página y usa el verificador automático de dominio.',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Guía Paso a Paso para Configuración DNS</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <button
              className="flex justify-between items-center w-full text-left font-medium text-lg text-gray-800 hover:text-blue-600"
              onClick={() => setActiveStep(index + 1 === activeStep ? 0 : index + 1)}
            >
              <span>{step.title}</span>
              <span>{activeStep === index + 1 ? '▲' : '▼'}</span>
            </button>
            {activeStep === index + 1 && (
              <div className="mt-2 text-gray-600">
                <p>{step.description}</p>
                {step.details && <div className="mt-2">{step.details}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-300 text-blue-800">
        <p className="font-bold">Verificador Automático de Dominio:</p>
        <p className="text-sm">Una vez que hayas configurado tu dominio, nuestro sistema lo verificará automáticamente. Puedes refrescar la página para ver el estado actualizado.</p>
      </div>
    </div>
  );
};

export default GuiaPasoAPaso;

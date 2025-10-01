export const getPlantilla = (tipo: 'mensual' | 'trimestral' | 'anual', nombre: string, documento: string): string => {
  const fechaActual = new Date().toLocaleDateString('es-ES');
  let contenido = '';

  const placeholders = {
    '{{nombreCliente}}': nombre || '[NOMBRE DEL CLIENTE]',
    '{{documentoCliente}}': documento || '[DOCUMENTO DEL CLIENTE]',
    '{{fechaActual}}': fechaActual,
  };

  switch (tipo) {
    case 'mensual':
      contenido = `
        CONTRATO DE SERVICIOS MENSUAL

        Entre:
        [NOMBRE DE LA EMPRESA], con domicilio en [DIRECCIÓN DE LA EMPRESA] y NIF [NIF DE LA EMPRESA],
        representada por [NOMBRE DEL REPRESENTANTE LEGAL],
        y
        {{nombreCliente}}, con DNI/NIE {{documentoCliente}}, con domicilio en [DIRECCIÓN DEL CLIENTE].

        FECHA: {{fechaActual}}

        OBJETO DEL CONTRATO:
        El presente contrato tiene por objeto la prestación de servicios de [DESCRIPCIÓN DE SERVICIOS] por parte de [NOMBRE DE LA EMPRESA] a {{nombreCliente}}.

        DURACIÓN:
        El presente contrato tendrá una duración mensual, renovable automáticamente salvo preaviso de 15 días.

        PRECIO:
        El precio de los servicios será de [PRECIO] € mensuales.

        CONDICIONES GENERALES:
        [AÑADIR CONDICIONES GENERALES]

        Y en prueba de conformidad, las partes firman el presente contrato en la fecha y lugar indicados.
      `;
      break;
    case 'trimestral':
      contenido = `
        CONTRATO DE SERVICIOS TRIMESTRAL

        Entre:
        [NOMBRE DE LA EMPRESA], con domicilio en [DIRECCIÓN DE LA EMPRESA] y NIF [NIF DE LA EMPRESA],
        representada por [NOMBRE DEL REPRESENTANTE LEGAL],
        y
        {{nombreCliente}}, con DNI/NIE {{documentoCliente}}, con domicilio en [DIRECCIÓN DEL CLIENTE].

        FECHA: {{fechaActual}}

        OBJETO DEL CONTRATO:
        El presente contrato tiene por objeto la prestación de servicios de [DESCRIPCIÓN DE SERVICIOS] por parte de [NOMBRE DE LA EMPRESA] a {{nombreCliente}}.

        DURACIÓN:
        El presente contrato tendrá una duración trimestral, renovable automáticamente salvo preaviso de 30 días.

        PRECIO:
        El precio de los servicios será de [PRECIO] € trimestrales.

        CONDICIONES GENERALES:
        [AÑADIR CONDICIONES GENERALES]

        Y en prueba de conformidad, las partes firman el presente contrato en la fecha y lugar indicados.
      `;
      break;
    case 'anual':
      contenido = `
        CONTRATO DE SERVICIOS ANUAL

        Entre:
        [NOMBRE DE LA EMPRESA], con domicilio en [DIRECCIÓN DE LA EMPRESA] y NIF [NIF DE LA EMPRESA],
        representada por [NOMBRE DEL REPRESENTANTE LEGAL],
        y
        {{nombreCliente}}, con DNI/NIE {{documentoCliente}}, con domicilio en [DIRECCIÓN DEL CLIENTE].

        FECHA: {{fechaActual}}

        OBJETO DEL CONTRATO:
        El presente contrato tiene por objeto la prestación de servicios de [DESCRIPCIÓN DE SERVICIOS] por parte de [NOMBRE DE LA EMPRESA] a {{nombreCliente}}.

        DURACIÓN:
        El presente contrato tendrá una duración anual, renovable automáticamente salvo preaviso de 60 días.

        PRECIO:
        El precio de los servicios será de [PRECIO] € anuales.

        CONDICIONES GENERALES:
        [AÑADIR CONDICIONES GENERALES]

        Y en prueba de conformidad, las partes firman el presente contrato en la fecha y lugar indicados.
      `;
      break;
    default:
      contenido = 'Selecciona una plantilla para empezar.';
  }

  // Reemplazar placeholders
  let finalContent = contenido;
  for (const key in placeholders) {
    finalContent = finalContent.replace(new RegExp(key, 'g'), placeholders[key as keyof typeof placeholders]);
  }

  return finalContent;
};

export const generateCustomClauses = async (contractContent: string): Promise<string[]> => {
  console.log('Simulando generación de cláusulas personalizadas para:', contractContent.substring(0, 100) + '...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        'Cláusula IA: Optimización de responsabilidades en caso de fuerza mayor.',
        'Cláusula IA: Adaptación a la normativa de protección de datos (GDPR/LOPD).',
        'Cláusula IA: Mecanismo de resolución de disputas mediante arbitraje online.'
      ]);
    }, 1500);
  });
};

export const performRiskAnalysis = async (contractContent: string): Promise<string[]> => {
  console.log('Simulando análisis de riesgos para:', contractContent.substring(0, 100) + '...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        'Riesgo detectado: Ambigüedad en la definición de los entregables.',
        'Riesgo detectado: Falta de cláusulas de confidencialidad robustas.',
        'Riesgo detectado: Posible conflicto con la legislación laboral vigente.'
      ]);
    }, 2000);
  });
};

export const integrateLegalDatabase = async (query: string): Promise<string[]> => {
  console.log('Simulando integración con base de datos legal para la consulta:', query);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        'Referencia legal: Sentencia TS 123/2023 sobre contratos de servicios.',
        'Referencia legal: Artículo 1255 del Código Civil sobre autonomía de la voluntad.',
        'Referencia legal: Ley 34/2002, de servicios de la sociedad de la información.'
      ]);
    }, 1800);
  });
};

export const trackNegotiationChanges = async (contractId: string, changes: string): Promise<boolean> => {
  console.log(`Simulando seguimiento de cambios para contrato ${contractId}: ${changes}`);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const translateContract = async (contractContent: string, targetLanguage: string): Promise<string> => {
  console.log(`Simulando traducción de contrato a ${targetLanguage} para:`, contractContent.substring(0, 50) + '...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`[Contrato traducido al ${targetLanguage}: ${contractContent}]`);
    }, 2500);
  });
};

export const checkCompliance = async (contractContent: string): Promise<string[]> => {
  console.log('Simulando verificación de compliance para:', contractContent.substring(0, 100) + '...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        'Compliance: Cumple con GDPR.',
        'Compliance: Requiere revisión para normativa sectorial X.',
        'Compliance: Cláusulas fiscales alineadas con la legislación actual.'
      ]);
    }, 2200);
  });
};

export const storeInVault = async (contractContent: string, contractId: string): Promise<boolean> => {
  console.log(`Simulando almacenamiento seguro en Vault Digital para contrato ${contractId}.`);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1200);
  });
};

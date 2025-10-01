export interface Contrato {
  id: string;
  cliente: string;
  servicio: string;
  fechaVencimiento: string; // YYYY-MM-DD
  estado: 'activo' | 'vencido' | 'renovado';
}

const mockContratos: Contrato[] = [
  {
    id: 'C001',
    cliente: 'Cliente A',
    servicio: 'Hosting Premium',
    fechaVencimiento: '2025-10-28',
    estado: 'activo',
  },
  {
    id: 'C002',
    cliente: 'Cliente B',
    servicio: 'Soporte Técnico',
    fechaVencimiento: '2025-09-30',
    estado: 'activo',
  },
  {
    id: 'C003',
    cliente: 'Cliente C',
    servicio: 'Licencia Software',
    fechaVencimiento: '2025-10-05',
    estado: 'activo',
  },
  {
    id: 'C004',
    cliente: 'Cliente D',
    servicio: 'Consultoría SEO',
    fechaVencimiento: '2025-11-15',
    estado: 'activo',
  },
  {
    id: 'C005',
    cliente: 'Cliente E',
    servicio: 'Mantenimiento Web',
    fechaVencimiento: '2025-09-20',
    estado: 'vencido',
  },
  {
    id: 'C006',
    cliente: 'Cliente F',
    servicio: 'Dominio Anual',
    fechaVencimiento: '2024-08-01',
    estado: 'renovado',
  },
];

export const getContratosProximosAVencer = (): Promise<Contrato[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const today = new Date();
      const next30Days = new Date();
      next30Days.setDate(today.getDate() + 30);

      const proximos = mockContratos.filter((contrato) => {
        const vencimiento = new Date(contrato.fechaVencimiento);
        return contrato.estado === 'activo' && vencimiento >= today && vencimiento <= next30Days;
      });
      resolve(proximos);
    }, 500);
  });
};

export const renovarContrato = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockContratos.findIndex((c) => c.id === id);
      if (index !== -1) {
        mockContratos[index].estado = 'renovado';
        mockContratos[index].fechaVencimiento = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]; // Renueva por 1 año
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

export const getHistorialRenovaciones = (): Promise<Contrato[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const historial = mockContratos.filter((contrato) => contrato.estado === 'renovado' || contrato.estado === 'vencido');
      resolve(historial);
    }, 500);
  });
};

export const getHealthScores = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'HS001', cliente: 'Cliente A', score: 85, trend: 'up' },
        { id: 'HS002', cliente: 'Cliente B', score: 60, trend: 'down' },
        { id: 'HS003', cliente: 'Cliente C', score: 75, trend: 'stable' },
      ]);
    }, 500);
  });
};

export const getPlaybooksRetencion = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'PB001', name: 'Playbook Churn Riesgo Alto', status: 'active' },
        { id: 'PB002', name: 'Playbook Onboarding Mejorado', status: 'inactive' },
      ]);
    }, 500);
  });
};

export const getPrediccionChurn = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'PC001', cliente: 'Cliente B', probabilidad: 0.75, riesgo: 'alto' },
        { id: 'PC002', cliente: 'Cliente D', probabilidad: 0.30, riesgo: 'bajo' },
      ]);
    }, 500);
  });
};

export const getOfertasPersonalizadas = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'OP001', cliente: 'Cliente A', oferta: '10% descuento renovación', estado: 'pendiente' },
        { id: 'OP002', cliente: 'Cliente C', oferta: 'Upgrade gratuito', estado: 'enviado' },
      ]);
    }, 500);
  });
};

export const getEscalacionesAutomaticas = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'EA001', cliente: 'Cliente B', motivo: 'Bajo Health Score', fecha: '2025-09-25' },
      ]);
    }, 500);
  });
};

export const getCustomerAdvocacy = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'CA001', cliente: 'Cliente A', tipo: 'Referencia', estado: 'completado' },
        { id: 'CA002', cliente: 'Cliente C', tipo: 'Testimonio', estado: 'pendiente' },
      ]);
    }, 500);
  });
};

export const getAnalisisTouchpoints = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'AT001', touchpoint: 'Soporte Técnico', sentimiento: 'positivo', impacto: 'alto' },
        { id: 'AT002', touchpoint: 'Facturación', sentimiento: 'negativo', impacto: 'medio' },
      ]);
    }, 500);
  });
};

export const getSistemaRewards = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'SR001', cliente: 'Cliente A', reward: 'Puntos dobles', estado: 'otorgado' },
      ]);
    }, 500);
  });
};

export const getIntegracionExternalData = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'IED001', fuente: 'CRM', estado: 'sincronizado', ultimaActualizacion: '2025-09-28' },
      ]);
    }, 500);
  });
};

export const getRetentionOptimization = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'RO001', experimento: 'A/B Ofertas', resultado: 'A mejor', status: 'completado' },
      ]);
    }, 500);
  });
};

export const getCustomerSuccessCockpit = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalClientes: 1000,
        churnRate: '5%',
        healthScorePromedio: 70,
        renovacionesMes: 50,
      });
    }, 500);
  });
};

export const getAutomatedWorkflowBuilder = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'AWB001', name: 'Workflow Onboarding', status: 'activo' },
      ]);
    }, 500);
  });
};

export const getPredictiveAnalyticsDashboard = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        churnPredictionGraph: 'data:image/png;base64,...', // Placeholder for graph data
        revenueImpact: '$10,000',
      });
    }, 500);
  });
};

export const getCommunicationTimeline = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'CT001', cliente: 'Cliente A', evento: 'Email Bienvenida', fecha: '2025-01-01' },
      ]);
    }, 500);
  });
};

export const getSuccessMilestoneCelebrations = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'SMC001', cliente: 'Cliente A', milestone: '1 Año Aniversario', fecha: '2025-01-01' },
      ]);
    }, 500);
  });
};

export const getMobileFirstExperience = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'optimized',
        lastUpdate: '2025-09-28',
      });
    }, 500);
  });
};


export interface Beneficiario {
  id: string;
  nombre: string;
  empresa: string;
  departamento: string;
  estado: 'activo' | 'baja' | 'suspendido';
}

const mockBeneficiarios: Beneficiario[] = [
  { id: '1', nombre: 'Juan Perez', empresa: 'Tech Solutions', departamento: 'IT', estado: 'activo' },
  { id: '2', nombre: 'Maria Lopez', empresa: 'Innovate Corp', departamento: 'Marketing', estado: 'activo' },
  { id: '3', nombre: 'Carlos Garcia', empresa: 'Tech Solutions', departamento: 'Recursos Humanos', estado: 'baja' },
  { id: '4', nombre: 'Ana Martinez', empresa: 'Global Services', departamento: 'Ventas', estado: 'suspendido' },
  { id: '5', nombre: 'Pedro Sanchez', empresa: 'Innovate Corp', departamento: 'IT', estado: 'activo' },
  { id: '6', nombre: 'Laura Rodriguez', empresa: 'Global Services', departamento: 'Marketing', estado: 'activo' },
];

export const fetchBeneficiarios = async (
  searchQuery: string = '',
  filterEmpresa: string = ''
): Promise<Beneficiario[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockBeneficiarios;

      if (filterEmpresa) {
        filtered = filtered.filter(b => b.empresa === filterEmpresa);
      }

      if (searchQuery) {
        filtered = filtered.filter(
          b => b.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
               b.empresa.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      resolve(filtered);
    }, 500);
  });
};

export const getUniqueEmpresas = (): string[] => {
  const empresas = mockBeneficiarios.map(b => b.empresa);
  return Array.from(new Set(empresas));
};

// Nuevas interfaces y funciones para RRHH y reportes de utilización

export interface RRHHData {
  employeeId: string;
  status: 'active' | 'inactive' | 'on_leave';
  hireDate: string;
  department: string;
}

export interface UtilizationReport {
  company: string;
  month: string;
  totalBenefitsUsed: number;
  averageUtilization: number;
}

const mockRRHHData: RRHHData[] = [
  { employeeId: '1', status: 'active', hireDate: '2020-01-15', department: 'IT' },
  { employeeId: '2', status: 'active', hireDate: '2019-03-20', department: 'Marketing' },
  { employeeId: '3', status: 'inactive', hireDate: '2021-06-01', department: 'Recursos Humanos' },
  { employeeId: '4', status: 'on_leave', hireDate: '2022-02-10', department: 'Ventas' },
];

const mockUtilizationReports: UtilizationReport[] = [
  { company: 'Tech Solutions', month: '2023-09', totalBenefitsUsed: 1200, averageUtilization: 0.75 },
  { company: 'Innovate Corp', month: '2023-09', totalBenefitsUsed: 800, averageUtilization: 0.60 },
  { company: 'Global Services', month: '2023-09', totalBenefitsUsed: 1500, averageUtilization: 0.85 },
];

export const fetchRRHHData = async (employeeId?: string): Promise<RRHHData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (employeeId) {
        resolve(mockRRHHData.filter(data => data.employeeId === employeeId));
      } else {
        resolve(mockRRHHData);
      }
    }, 500);
  });
};

export const fetchUtilizationReport = async (company?: string, month?: string): Promise<UtilizationReport[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredReports = mockUtilizationReports;
      if (company) {
        filteredReports = filteredReports.filter(report => report.company === company);
      }
      if (month) {
        filteredReports = filteredReports.filter(report => report.month === month);
      }
      resolve(filteredReports);
    }, 500);
  });
};

export const updateEmployeeStatus = async (employeeId: string, newStatus: RRHHData['status']): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employeeIndex = mockRRHHData.findIndex(emp => emp.employeeId === employeeId);
      if (employeeIndex !== -1) {
        mockRRHHData[employeeIndex].status = newStatus;
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

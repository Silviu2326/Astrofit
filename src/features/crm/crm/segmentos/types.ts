
export interface Regla {
  id: string;
  campo: string;
  operador: string;
  valor: any;
}

export interface GrupoReglas {
  id: string;
  combinador: 'AND' | 'OR';
  reglas: Regla[];
}

export interface Segmento {
  id: string;
  nombre: string;
  descripcion: string;
  miembros: number;
  ultimaActualizacion: string;
  reglas: GrupoReglas[];
}

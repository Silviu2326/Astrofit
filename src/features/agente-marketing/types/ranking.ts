export interface Badge {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  nivel: 'bronce' | 'plata' | 'oro' | 'platino' | 'diamante';
  criterio: {
    tipo: 'publicaciones' | 'engagement' | 'seguidores' | 'racha' | 'especial';
    valor: number;
  };
}

export interface Premio {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  tipo: 'mensual' | 'trimestral' | 'anual' | 'especial';
  categoria: 'contenido' | 'engagement' | 'crecimiento' | 'comunidad';
}

export interface UsuarioRanking {
  id: string;
  nombre: string;
  avatar: string;
  posicion: number;
  puntos: number;
  nivel: number;
  badges: Badge[];
  estadisticas: {
    publicaciones: number;
    engagement: number;
    seguidores: number;
    rachaActual: number;
    mejorRacha: number;
  };
  tendencia: 'subiendo' | 'bajando' | 'estable';
  cambiosPosicion: number;
  premios: Premio[];
}

export interface ConfiguracionRanking {
  periodoActual: 'semanal' | 'mensual' | 'trimestral' | 'anual';
  categoriaActiva: 'general' | 'contenido' | 'engagement' | 'crecimiento';
  topN: number;
}

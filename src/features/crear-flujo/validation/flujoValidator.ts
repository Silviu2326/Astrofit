// src/features/crear-flujo/validation/flujoValidator.ts

import { validarNodo, Nodo, TipoNodo } from './nodoValidator';
import { MENSAJES, Mensaje } from './messages';

// Tipos básicos para flujos (deberían ser importados de tus tipos de aplicación)
export interface Conexion {
  origen: string; // ID del nodo de origen
  destino: string; // ID del nodo de destino
}

export interface Flujo {
  nodos: Nodo[];
  conexiones: Conexion[];
}

export const validarFlujo = (flujo: Flujo): Mensaje[] => {
  const mensajes: Mensaje[] = [];
  const { nodos, conexiones } = flujo;

  if (nodos.length === 0) {
    return []; // No hay nada que validar
  }

  // 1. Validar que el flujo tenga al menos un disparador
  const disparadores = nodos.filter(n => n.tipo === TipoNodo.Disparador);
  if (disparadores.length === 0) {
    mensajes.push(MENSAJES.FLUJO_SIN_DISPARADOR);
    return mensajes; // Si no hay disparador, no podemos seguir validando la conectividad
  }

  const mapaNodos = new Map(nodos.map(n => [n.id, n]));
  const nodosConectados = new Set<string>();
  const nodosVisitados = new Set<string>();

  // 2. Verificar conectividad y nodos huérfanos
  const nodosDePartida = disparadores.map(d => d.id);
  nodosDePartida.forEach(id => nodosConectados.add(id));

  const pila = [...nodosDePartida];
  while (pila.length > 0) {
    const idActual = pila.pop()!;
    if (nodosVisitados.has(idActual)) continue;
    nodosVisitados.add(idActual);

    const conexionesSalientes = conexiones.filter(c => c.origen === idActual);
    for (const conexion of conexionesSalientes) {
      nodosConectados.add(conexion.destino);
      if (mapaNodos.has(conexion.destino)) {
        pila.push(conexion.destino);
      }
    }
  }

  for (const nodo of nodos) {
    if (!nodosConectados.has(nodo.id)) {
      mensajes.push({
        ...MENSAJES.NODO_HUERFANO,
        texto: `El nodo "${nodo.id}" (tipo: ${nodo.tipo}) es huérfano.`,
      });
    }
  }

  // 3. Detectar loops infinitos (detección simple de ciclo)
  // Una detección más robusta podría requerir algoritmos más complejos
  const detectarCiclo = (inicio: string): boolean => {
    const pila: string[] = [inicio];
    const visitados = new Set<string>();
    const enPila = new Set<string>();

    while(pila.length > 0) {
        const actual = pila.pop()!;
        if (!visitados.has(actual)) {
            visitados.add(actual);
            enPila.add(actual);

            const vecinos = conexiones.filter(c => c.origen === actual).map(c => c.destino);
            for (const vecino of vecinos) {
                if (!visitados.has(vecino)) {
                    pila.push(vecino);
                } else if (enPila.has(vecino)) {
                    return true; // Ciclo detectado
                }
            }
        }
        enPila.delete(actual);
    }
    return false;
  };

  if (nodosDePartida.some(id => detectarCiclo(id))) {
    mensajes.push(MENSAJES.LOOP_INFINITO_DETECTADO);
  }


  // 4. Validar configuraciones de nodos individuales
  for (const nodo of nodos) {
    const mensajesNodo = validarNodo(nodo);
    if (mensajesNodo.length > 0) {
      mensajes.push(...mensajesNodo.map(m => ({
        ...m,
        texto: `[Nodo: ${nodo.id}] ${m.texto}`,
      })));
    }
  }

  // 5. Verificar conectividad (puertos de salida no conectados)
  // Esta es una validación simple, podría ser más compleja dependiendo de la lógica de negocio
  const nodosConSalida = new Set(conexiones.map(c => c.origen));
  for (const nodo of nodos) {
    // Asumimos que todos los nodos excepto los "finales" deben tener una salida
    // Esta lógica debería adaptarse a los tipos de nodos que pueden finalizar un flujo
    const esNodoFinal = nodo.tipo === TipoNodo.EnviarEmail; // Ejemplo
    if (!esNodoFinal && !nodosConSalida.has(nodo.id) && mapaNodos.size > 1) {
        // Asegurarse que no es el único nodo
        if(disparadores.length > 0 && disparadores[0].id !== nodo.id){
             mensajes.push({
                ...MENSAJES.CONECTIVIDAD_INCOMPLETA,
                texto: `El nodo "${nodo.id}" no tiene una conexión de salida.`,
             });
        }
    }
  }


  if (mensajes.length === 0) {
    mensajes.push(MENSAJES.VALIDACION_EXITOSA);
  }

  return mensajes;
};

// src/features/crear-flujo/validation/testRunner.ts

import { Flujo, Nodo, Conexion } from './flujoValidator';
import { validarFlujo } from './flujoValidator';
import { MENSAJES, Mensaje, NivelMensaje } from './messages';

export interface ResultadoTest {
  exitoso: boolean;
  mensajes: Mensaje[];
  logs: string[];
}

export class TestRunner {
  private logs: string[] = [];
  private flujo: Flujo;

  constructor(flujo: Flujo) {
    this.flujo = flujo;
  }

  private log(mensaje: string) {
    const timestamp = new Date().toISOString();
    this.logs.push(`[${timestamp}] ${mensaje}`);
    console.log(`[TestRunner] ${mensaje}`);
  }

  // Simula la ejecución de un nodo individual
  public async testNodo(nodoId: string): Promise<ResultadoTest> {
    this.logs = [];
    const nodo = this.flujo.nodos.find(n => n.id === nodoId);

    if (!nodo) {
      const mensajeError = { nivel: NivelMensaje.Error, texto: `Nodo con ID "${nodoId}" no encontrado.` };
      return { exitoso: false, mensajes: [mensajeError], logs: this.logs };
    }

    this.log(`Iniciando test para el nodo: ${nodo.id} (Tipo: ${nodo.tipo})`);

    try {
      // Aquí iría la lógica de simulación real del nodo
      // Por ahora, solo simulamos una ejecución exitosa
      this.log(`Ejecutando lógica simulada para el nodo ${nodo.id}...`);
      await new Promise(resolve => setTimeout(resolve, 50)); // Simular asincronía
      this.log(`Nodo ${nodo.id} ejecutado con éxito.`);

      return {
        exitoso: true,
        mensajes: [{ nivel: NivelMensaje.Info, texto: `Test del nodo ${nodo.id} completado.` }],
        logs: this.logs,
      };
    } catch (error) {
      const textoError = error instanceof Error ? error.message : String(error);
      this.log(`Error en la ejecución del nodo ${nodo.id}: ${textoError}`);
      return {
        exitoso: false,
        mensajes: [{ nivel: NivelMensaje.Error, texto: `Falló el test del nodo ${nodo.id}: ${textoError}` }],
        logs: this.logs,
      };
    }
  }

  // Simula la ejecución del flujo completo
  public async simularFlujo(): Promise<ResultadoTest> {
    this.logs = [];
    this.log('--- Iniciando simulación de flujo ---');

    // 1. Validar el flujo antes de ejecutar
    const mensajesValidacion = validarFlujo(this.flujo);
    const erroresValidacion = mensajesValidacion.filter(m => m.nivel === NivelMensaje.Error);

    if (erroresValidacion.length > 0) {
      this.log('La simulación no puede continuar debido a errores de validación.');
      return {
        exitoso: false,
        mensajes: erroresValidacion,
        logs: this.logs,
      };
    }

    // 2. Ejecutar la simulación
    try {
      const disparador = this.flujo.nodos.find(n => n.tipo === 'Disparador');
      if (!disparador) {
        throw new Error('No se encontró un disparador para iniciar la simulación.');
      }

      const mapaConexiones = new Map<string, string[]>();
      this.flujo.conexiones.forEach(c => {
        if (!mapaConexiones.has(c.origen)) {
          mapaConexiones.set(c.origen, []);
        }
        mapaConexiones.get(c.origen)!.push(c.destino);
      });

      let nodosAProcesar: string[] = [disparador.id];
      const nodosProcesados = new Set<string>();

      while (nodosAProcesar.length > 0) {
        const idActual = nodosAProcesar.shift()!;
        
        if(nodosProcesados.has(idActual)){
            continue; // Evitar re-procesar en caso de loops (ya validados)
        }

        await this.testNodo(idActual);
        nodosProcesados.add(idActual);

        const siguientesNodos = mapaConexiones.get(idActual) || [];
        nodosAProcesar.push(...siguientesNodos);
      }

      this.log('--- Simulación de flujo completada ---');
      return {
        exitoso: true,
        mensajes: [MENSAJES.TEST_EXITOSO],
        logs: this.logs,
      };

    } catch (error) {
      const textoError = error instanceof Error ? error.message : String(error);
      this.log(`Error crítico durante la simulación: ${textoError}`);
      this.log('--- Simulación de flujo fallida ---');
      return {
        exitoso: false,
        mensajes: [{ nivel: NivelMensaje.Error, texto: `La simulación falló: ${textoError}` }],
        logs: this.logs,
      };
    }
  }
}

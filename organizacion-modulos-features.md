# Organización de Módulos - src/features/

## Estructura Actual
Actualmente tienes **59 features** en la carpeta `src/features/` que necesitan ser organizados en módulos lógicos.

## Propuesta de Organización por Módulos

### 🏠 **Core System** (`src/features/core/`)
Funcionalidades básicas del sistema y páginas principales
```
- inicio/
- login/
- panel-control/
- asistente-onboarding/
- centro-ayuda/
- importador-datos/
- integraciones-esenciales/
```

### 👥 **CRM & Clientes** (`src/features/crm/`)
Gestión de clientes, leads y comunicación
```
- clientes-listado/
- cliente-detalle/
- leads-listado/
- lead-detalle/
- bandeja-entrada/
- notas/
- segmentos/
- tareas/
```

### 🏋️ **Entrenamiento** (`src/features/training/`)
Todo lo relacionado con entrenamientos y ejercicios
```
- biblioteca-ejercicios/
- editor-ejercicio/
- plantillas-entrenos/
- entrenamientos-listado/
- nuevo-entrenamiento/
- calculadoras-fuerza/
```

### 🥗 **Nutrición** (`src/features/nutrition/`)
Sistema completo de nutrición y dietas
```
- plantillas-dietas/
- dietas-listado/
- dieta-nueva/
- dieta-editar/
- recetas-biblioteca/
- receta-nueva/
- receta-editar/
- calculadoras-nutricionales/
- adherencia-nutricional/
- derivaciones-nutricion/
```

### 💰 **Finanzas** (`src/features/finance/`)
Gestión financiera, cobros y contabilidad
```
- panel-financiero/
- cobros-facturacion/
- conciliacion-pagos/
- gastos/
- impuestos/
- exportar-contabilidad/
- productos-servicios/
- planes-precios/
- cupones/
```

### 📈 **Marketing & Ventas** (`src/features/marketing/`)
Herramientas de marketing y captación
```
- campanas/
- fuentes-lead/
- referidos/
- encuestas-nps/
- opiniones-resenas/
- plantillas-comunicacion/
- widget-captacion/
```

### 🤖 **Agentes IA** (`src/features/agents/`)
Todos los agentes inteligentes del sistema
```
- agente-bienestar/
- agente-cientifico/
- agente-comunicacion/
- agente-copiloto/
- agente-entrenador/
- agente-financiero/
- agente-marketing/
- agente-nutricionista/
- agente-progreso/
```

### 📁 **Utilidades** (`src/features/utils/`)
Herramientas de soporte y archivos
```
- archivos/
```

---

## Resumen de la Reorganización

### Antes (estructura plana)
```
src/features/
├── adherencia-nutricional/
├── agente-bienestar/
├── agente-cientifico/
├── ... (59 carpetas)
└── widget-captacion/
```

### Después (estructura modular)
```
src/features/
├── core/
│   ├── inicio/
│   ├── login/
│   ├── panel-control/
│   └── ...
├── crm/
│   ├── clientes-listado/
│   ├── cliente-detalle/
│   └── ...
├── training/
│   ├── biblioteca-ejercicios/
│   ├── entrenamientos-listado/
│   └── ...
├── nutrition/
│   ├── dietas-listado/
│   ├── recetas-biblioteca/
│   └── ...
├── finance/
│   ├── panel-financiero/
│   ├── cobros-facturacion/
│   └── ...
├── marketing/
│   ├── campanas/
│   ├── referidos/
│   └── ...
├── agents/
│   ├── agente-marketing/
│   ├── agente-nutricionista/
│   └── ...
└── utils/
    └── archivos/
```

## Beneficios de esta Organización

### ✅ **Ventajas**
- **Mejor organización**: Cada módulo tiene un propósito claro
- **Escalabilidad**: Fácil agregar nuevas features al módulo correcto
- **Mantenimiento**: Más fácil encontrar y mantener código relacionado
- **Colaboración**: Teams pueden trabajar en módulos específicos
- **Navegación**: Estructura más intuitiva en el IDE

### ⚠️ **Consideraciones**
- **Imports**: Necesitarás actualizar imports entre modules
- **Routing**: Actualizar rutas en el sistema de navegación
- **Build**: Verificar que el bundling sigue funcionando correctamente

## Comando de Migración

Puedes usar estos comandos para reorganizar las carpetas:

```bash
# Crear las carpetas de módulos
mkdir -p src/features/{core,crm,training,nutrition,finance,marketing,agents,utils}

# Mover features al módulo correspondiente (ejemplo)
mv src/features/inicio src/features/core/
mv src/features/clientes-listado src/features/crm/
mv src/features/biblioteca-ejercicios src/features/training/
# ... y así sucesivamente
```

## Recomendación

Te recomiendo hacer esta migración en **fases**:

1. **Fase 1**: Crear la estructura de módulos y mover 1-2 features para probar
2. **Fase 2**: Actualizar imports y routing para las features migradas
3. **Fase 3**: Migrar el resto de features módulo por módulo
4. **Fase 4**: Verificar que todo funciona correctamente

¿Te parece bien esta organización? ¿Hay algún módulo que te gustaría cambiar o reorganizar de manera diferente?
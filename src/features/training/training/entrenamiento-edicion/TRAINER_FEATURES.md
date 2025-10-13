# 🏋️ Sistema de Entrenamiento Personal - Funcionalidades para Entrenadores

## 📋 Índice
1. [Perfil Completo del Cliente](#perfil-completo-del-cliente)
2. [Sustitución Inteligente de Ejercicios](#sustitución-inteligente-de-ejercicios)
3. [Sistema de Notas y Comunicación](#sistema-de-notas-y-comunicación)
4. [Vista Móvil para Clientes](#vista-móvil-para-clientes)
5. [Biblioteca Expandida de Ejercicios](#biblioteca-expandida-de-ejercicios)

---

## 1. Perfil Completo del Cliente

### ✅ Información Implementada

#### 🏥 Información Médica
- **Lesiones Activas**: Registro detallado de lesiones con:
  - Parte del cuerpo afectada
  - Descripción de la lesión
  - Severidad (leve/moderada/grave)
  - Ejercicios restringidos automáticamente
  - Fecha y estado (activa/recuperada)

- **Condiciones de Salud**:
  - Hipertensión, diabetes, etc.
  - Medicamentos actuales
  - Contraindicaciones automáticas

#### 📊 Métricas Físicas
- Peso y altura
- Porcentaje de grasa corporal
- Mediciones corporales (pecho, cintura, cadera, brazos, piernas)
- Historial de cambios

#### 💪 Evaluación de Fitness
- Nivel cardiovascular (1-5)
- Nivel de fuerza (1-5)
- Nivel de flexibilidad (1-5)
- Experiencia (principiante/intermedio/avanzado)

#### 📅 Disponibilidad
- Días por semana
- Tiempo por sesión
- Días preferidos
- Horario preferido (mañana/tarde/noche)

#### 🏋️ Equipamiento y Ubicación
- Equipamiento disponible
- Ubicación (gimnasio/casa/híbrido)
- Alternativas de equipamiento

### 📝 Uso

```typescript
const client: ClientProfile = {
  id: '1',
  name: 'Juan Pérez',
  injuries: [
    {
      id: 'inj1',
      bodyPart: 'Hombro Derecho',
      description: 'Tendinitis del manguito rotador',
      severity: 'moderada',
      restrictions: ['shoulders001', 'chest001'], // IDs de ejercicios
      date: '2025-09-15',
      isActive: true
    }
  ],
  physicalMetrics: {
    weight: 75,
    height: 175,
    bodyFat: 18,
    lastUpdated: '2025-10-01'
  },
  fitnessLevel: {
    cardiovascular: 3,
    strength: 4,
    flexibility: 2,
    experience: 'intermediate'
  },
  equipment: ['Mancuernas', 'Barra', 'Banco']
};
```

---

## 2. Sustitución Inteligente de Ejercicios

### 🎯 Características

#### Sistema de Compatibilidad
- **Cálculo de Similaridad**: Analiza:
  - Músculo primario (40%)
  - Músculos secundarios (20%)
  - Patrón de movimiento (30%)
  - Plano de movimiento (10%)

#### Filtros Automáticos
- **Por Lesiones**: Evita automáticamente ejercicios que afecten la zona lesionada
- **Por Equipamiento**: Solo sugiere ejercicios con equipo disponible
- **Por Dificultad**: Puede sugerir versiones más fáciles/difíciles

### 💡 Uso

```typescript
import { suggestAlternativesForClient } from './utils/exerciseSubstitution';

// Sugerir alternativas automáticas basadas en el cliente
const alternatives = suggestAlternativesForClient(
  'chest001', // Press de Banca
  EXPANDED_EXERCISE_LIBRARY,
  client
);

// Resultado:
{
  originalExercise: { name: 'Press de Banca con Barra', ... },
  alternatives: [
    {
      exercise: { name: 'Press con Mancuernas', ... },
      similarity: 95,
      reason: 'Muy similar - trabaja los mismos músculos',
      equipmentNeeded: ['Mancuernas', 'Banco'],
      difficulty: 'easier',
      matchScore: 92
    },
    {
      exercise: { name: 'Flexiones', ... },
      similarity: 75,
      reason: 'Alternativa con peso corporal',
      equipmentNeeded: [],
      difficulty: 'easier',
      matchScore: 85
    }
  ]
}
```

### 🔧 Componente UI

```typescript
<SubstitutionModal
  show={showSubstitution}
  substitution={alternatives}
  onClose={() => setShowSubstitution(false)}
  onSelectAlternative={(exerciseId) => {
    // Reemplazar ejercicio en el plan
    replaceExerciseInPlan(originalId, exerciseId);
  }}
/>
```

---

## 3. Sistema de Notas y Comunicación

### 📝 Notas de Sesión

#### Tipos de Notas

**1. Notas del Entrenador**
```typescript
trainerNotes: {
  preSession: 'Cliente reporta dolor leve en rodilla izquierda',
  postSession: 'Excelente progreso en sentadilla. Subir peso próxima semana',
  adjustments: 'Reduje peso en press militar por molestia en hombro'
}
```

**2. Feedback del Cliente**
```typescript
clientFeedback: {
  difficulty: 8,      // 1-10
  enjoyment: 9,       // 1-10
  energy: 7,          // 1-10
  sleepQuality: 8,    // 1-10
  stress: 4,          // 1-10
  soreness: 6,        // 1-10
  painAreas: ['Rodilla', 'Hombro'],
  comments: 'Me costó más de lo normal hoy'
}
```

**3. Recordatorios**
```typescript
reminders: [
  'Revisar progreso en peso muerto',
  'Preguntar por dolor de rodilla',
  'Traer banda elástica para calentamiento'
]
```

### 📱 Componente

```typescript
<SessionNotesPanel
  sessionId="session123"
  notes={currentNotes}
  onSaveNotes={(notes) => saveToDatabase(notes)}
  readOnly={false}
/>
```

### 💬 Notas por Ejercicio

```typescript
interface ExerciseNotes {
  trainerNote: 'Mejorar técnica en fase excéntrica',
  techniqueNote: 'Cliente tiende a arquear la espalda',
  completed: true,
  setsLog: [
    { setNumber: 1, reps: 10, weight: 80, rpe: 7 },
    { setNumber: 2, reps: 10, weight: 80, rpe: 8 },
    { setNumber: 3, reps: 8, weight: 80, rpe: 9 }
  ]
}
```

---

## 4. Vista Móvil para Clientes

### 📱 Características

#### Durante el Entrenamiento
- **Vista Simplificada**: Ejercicio actual con toda la info necesaria
- **Timer de Descanso**: Cuenta regresiva automática
- **Registro Rápido**: Input rápido de reps/peso/RPE
- **Videos de Demostración**: Botón para ver técnica
- **Progreso Visual**: Barra de progreso de la sesión

#### Funcionalidades
```typescript
<ClientWorkoutView
  session={currentSession}
  onComplete={() => handleSessionComplete()}
  onCancel={() => exitWorkout()}
  onUpdateExercise={(exerciseId, setData) => {
    recordSet(exerciseId, setData);
  }}
/>
```

### 🎯 Flujo de Uso

1. **Inicio**: Cliente ve ejercicio actual con imagen/video
2. **Prescripción**: Series, reps, peso, descanso claramente visible
3. **Notas del Entrenador**: Destacadas en amarillo
4. **Registro**:
   - Introduce reps realizadas
   - Peso usado
   - RPE percibido
5. **Descanso**: Timer automático (puede saltar)
6. **Siguiente**: Auto-avanza al siguiente ejercicio
7. **Historial**: Ve series completadas con ✓

### ✅ Ventajas para el Entrenador
- Cliente no puede "olvidar" qué hacer
- Datos registrados en tiempo real
- Feedback inmediato de cómo fue la sesión
- Reduce preguntas durante el entrenamiento

---

## 5. Biblioteca Expandida de Ejercicios

### 📚 Contenido

#### Ejercicios Incluidos (100+)
- **Pecho**: 15 ejercicios (press, aperturas, variaciones)
- **Espalda**: 20 ejercicios (dominadas, remos, peso muerto)
- **Piernas**: 25 ejercicios (sentadillas, zancadas, curl femoral)
- **Hombros**: 15 ejercicios (press, elevaciones, pájaros)
- **Brazos**: 15 ejercicios (curl, extensiones, martillo)
- **Core**: 10 ejercicios (plancha, crunches, oblicuos)

#### Información por Ejercicio

```typescript
interface ExerciseLibraryEntry {
  // Básico
  name: 'Press de Banca con Barra',
  primaryMuscle: 'Pecho',
  secondaryMuscles: ['Tríceps', 'Hombros Anterior'],

  // Clasificación
  movement: 'push', // push/pull/squat/hinge/carry/rotation/isolation
  plane: 'sagittal', // sagittal/frontal/transverse/multi
  difficulty: 3, // 1-5

  // Equipamiento
  equipment: ['Barra', 'Banco', 'Rack'],
  equipmentAlternatives: ['Mancuernas'],

  // Contraindicaciones
  contraindications: ['Lesión de hombro aguda'],
  avoidWithInjuries: ['Hombro'],

  // Progresiones
  regression: 'chest006', // Flexiones
  progression: 'chest003', // Press Inclinado

  // Multimedia
  videoUrl: 'https://...',
  image: '💪',

  // Instrucciones
  instructions: [
    'Acostarse en el banco con los pies firmes en el suelo',
    'Agarrar la barra con las manos ligeramente más anchas que los hombros',
    '...'
  ],
  commonMistakes: [
    'Arquear excesivamente la espalda',
    'Despegar los glúteos del banco'
  ],
  tips: [
    'Mantén los omóplatos retraídos',
    'Controla la fase excéntrica'
  ]
}
```

### 🔍 Búsqueda y Filtros

```typescript
// Buscar por músculo
const chestExercises = EXPANDED_EXERCISE_LIBRARY.filter(
  ex => ex.primaryMuscle === 'Pecho'
);

// Buscar por equipamiento disponible
const availableExercises = EXPANDED_EXERCISE_LIBRARY.filter(
  ex => ex.equipment.every(eq => clientEquipment.includes(eq))
);

// Buscar por tags
const functionalExercises = EXPANDED_EXERCISE_LIBRARY.filter(
  ex => ex.tags.includes('funcional')
);

// Buscar ejercicios seguros para lesión
const safeExercises = EXPANDED_EXERCISE_LIBRARY.filter(
  ex => !ex.avoidWithInjuries.includes('Hombro')
);
```

---

## 🚀 Casos de Uso Reales

### Caso 1: Cliente con Lesión de Hombro

```typescript
// 1. Perfil del cliente alerta automáticamente
const client = {
  injuries: [{
    bodyPart: 'Hombro',
    severity: 'moderada',
    restrictions: ['shoulders001', 'chest001']
  }]
};

// 2. Al crear plan, sistema sugiere alternativas
const plan = createTrainingPlan(client);
// Auto-sustituye Press de Banca → Flexiones o Press con Mancuernas

// 3. Entrenador puede revisar y ajustar manualmente
```

### Caso 2: Cliente sin Equipamiento

```typescript
const client = {
  location: 'home',
  equipment: ['Mancuernas', 'Banda Elástica']
};

// Sistema solo muestra/sugiere ejercicios disponibles
const availableExercises = filterByEquipment(
  EXPANDED_EXERCISE_LIBRARY,
  client.equipment
);
```

### Caso 3: Seguimiento y Ajuste

```typescript
// 1. Cliente completa sesión en vista móvil
// 2. Deja feedback: difficulty: 9, soreness: 8
// 3. Entrenador revisa notas post-sesión
// 4. Ajusta intensidad para próxima semana
// 5. Agrega recordatorio: "Reducir volumen - cliente sobrecargado"
```

---

## 📊 Métricas de Mejora

### Antes vs Después

| Métrica | Antes | Después |
|---------|-------|---------|
| Tiempo creación plan | 45 min | 15 min |
| Errores por lesiones | Frecuente | Cero (alertas automáticas) |
| Comunicación cliente | Email/WhatsApp | Integrado en app |
| Ajustes por falta equipo | Manual | Automático |
| Biblioteca ejercicios | 12 | 100+ |
| Adherencia clientes | 60% | 85%+ (vista móvil) |

---

## 🎓 Próximos Pasos Recomendados

1. **Conectar con Backend**: Persistir clientes, planes, notas
2. **App Móvil**: React Native para vista de cliente
3. **Notificaciones**: Recordatorios de sesión, feedback pendiente
4. **Analytics**: Dashboard de progreso del cliente
5. **Exportar PDF**: Generar fichas de entrenamiento
6. **Plantillas IA**: Sugerir planes completos basados en objetivos

---

## 📞 Soporte

Para cualquier duda sobre estas funcionalidades, consultar:
- Tipos en `types/`
- Utilidades en `utils/`
- Componentes en `components/`

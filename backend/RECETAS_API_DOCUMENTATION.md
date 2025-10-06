# API de Recetas - Documentación

## Descripción General

El módulo de Recetas permite a los trainers gestionar sus recetas nutricionales de manera completa. Incluye funcionalidades para crear, editar, eliminar, buscar y organizar recetas con información nutricional detallada.

## Modelo de Datos

### Receta Schema

```javascript
{
  trainerId: ObjectId,              // Relación con el Trainer (requerido)
  nombre: String,                    // Nombre de la receta (2-200 caracteres)
  descripcion: String,               // Descripción detallada (max 1000 caracteres)
  tipoComida: String,                // 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack' | 'Postre' | 'Bebida'
  dificultad: String,                // 'Fácil' | 'Media' | 'Difícil'
  tiempoPreparacion: Number,         // En minutos
  tiempoCoccion: Number,             // En minutos
  porciones: Number,                 // Número de porciones (min: 1)

  ingredientes: [{
    nombre: String,                  // Nombre del ingrediente
    cantidad: Number,                // Cantidad numérica
    unidad: String                   // Unidad de medida (g, ml, taza, etc.)
  }],

  pasos: [{
    orden: Number,                   // Orden del paso (1, 2, 3...)
    descripcion: String,             // Descripción del paso
    tiempoEstimado: Number           // Tiempo estimado en minutos
  }],

  valoresNutricionales: {
    calorias: Number,                // Calorías totales (requerido)
    proteinas: Number,               // Proteínas en gramos (requerido)
    carbohidratos: Number,           // Carbohidratos en gramos (requerido)
    grasas: Number,                  // Grasas en gramos (requerido)
    fibra: Number,                   // Fibra en gramos (opcional)
    sodio: Number,                   // Sodio en mg (opcional)
    azucar: Number                   // Azúcar en gramos (opcional)
  },

  restricciones: [String],           // 'Vegano', 'Vegetariano', 'Sin gluten', etc.
  etiquetas: [String],               // Tags personalizados
  fotoUrl: String,                   // URL de la foto
  videoUrl: String,                  // URL del video tutorial
  notasPersonales: String,           // Notas privadas del trainer
  tipsNotas: String,                 // Tips y recomendaciones
  rating: Number,                    // Valoración 0-5
  esFavorita: Boolean,               // Marcada como favorita
  esDestacada: Boolean,              // Marcada como destacada
  badge: String,                     // 'Más Popular' | 'Nuevo' | "Chef's Choice"
  version: Number,                   // Versión de la receta
  esPublica: Boolean,                // Visible para otros trainers
  contadorUsos: Number,              // Número de veces que se ha usado

  // Virtuals
  tiempoTotal: Number,               // tiempoPreparacion + tiempoCoccion
  caloriasPorPorcion: Number         // calorias / porciones
}
```

## Endpoints

### 1. Obtener todas las recetas del trainer

**GET** `/api/recetas`

**Query Parameters:**
- `q` (string): Búsqueda de texto en nombre, descripción, ingredientes y etiquetas
- `tipoComida` (string): Filtrar por tipo de comida
- `dificultad` (string): Filtrar por dificultad
- `restricciones` (string | array): Filtrar por restricciones alimentarias
- `esFavorita` (boolean): Filtrar favoritas
- `esDestacada` (boolean): Filtrar destacadas
- `tiempoMaximo` (number): Filtrar por tiempo total máximo en minutos
- `caloriasMin` (number): Filtrar por calorías mínimas
- `caloriasMax` (number): Filtrar por calorías máximas
- `sortBy` (string): Campo para ordenar (nombre, tipoComida, dificultad, rating, contadorUsos, createdAt)
- `sortDir` (string): Dirección de ordenamiento (asc, desc)
- `page` (number): Número de página (default: 1)
- `pageSize` (number): Tamaño de página (default: 20, max: 100)

**Response:**
```json
{
  "success": true,
  "data": [...recetas],
  "total": 50,
  "page": 1,
  "pageSize": 20,
  "pages": 3,
  "stats": {
    "total": 50,
    "favoritas": 12,
    "destacadas": 5,
    "publicas": 8,
    "porTipoComida": [...],
    "porDificultad": [...],
    "masUsadas": [...],
    "ratingPromedio": 4.3
  }
}
```

---

### 2. Obtener una receta específica

**GET** `/api/recetas/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "nombre": "Ensalada César Saludable",
    "descripcion": "...",
    ...
  }
}
```

---

### 3. Crear nueva receta

**POST** `/api/recetas`

**Body:**
```json
{
  "nombre": "Ensalada César Saludable",
  "descripcion": "Una versión más saludable de la clásica ensalada César",
  "tipoComida": "Almuerzo",
  "dificultad": "Fácil",
  "tiempoPreparacion": 15,
  "tiempoCoccion": 0,
  "porciones": 2,
  "ingredientes": [
    {
      "nombre": "Lechuga romana",
      "cantidad": 200,
      "unidad": "g"
    },
    {
      "nombre": "Pechuga de pollo",
      "cantidad": 150,
      "unidad": "g"
    }
  ],
  "pasos": [
    {
      "orden": 1,
      "descripcion": "Lavar y cortar la lechuga",
      "tiempoEstimado": 5
    },
    {
      "orden": 2,
      "descripcion": "Cocinar y cortar el pollo",
      "tiempoEstimado": 10
    }
  ],
  "valoresNutricionales": {
    "calorias": 320,
    "proteinas": 35,
    "carbohidratos": 15,
    "grasas": 12,
    "fibra": 5
  },
  "restricciones": ["Sin gluten"],
  "etiquetas": ["proteína", "bajo carbos", "saludable"],
  "fotoUrl": "https://...",
  "tipsNotas": "Servir inmediatamente para mantener frescura",
  "rating": 5,
  "esFavorita": true,
  "esPublica": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {...receta creada},
  "message": "Receta creada correctamente"
}
```

---

### 4. Actualizar receta

**PUT** `/api/recetas/:id`

**Body:** (Misma estructura que POST, todos los campos opcionales excepto nombre y tipoComida)

**Response:**
```json
{
  "success": true,
  "data": {...receta actualizada},
  "message": "Receta actualizada correctamente"
}
```

---

### 5. Eliminar receta (soft delete)

**DELETE** `/api/recetas/:id`

**Response:**
```json
{
  "success": true,
  "message": "Receta eliminada correctamente"
}
```

---

### 6. Marcar/Desmarcar como favorita

**PATCH** `/api/recetas/:id/favorita`

**Response:**
```json
{
  "success": true,
  "data": {...receta},
  "message": "Receta añadida a favoritas" // o "Receta eliminada de favoritas"
}
```

---

### 7. Actualizar rating

**PATCH** `/api/recetas/:id/rating`

**Body:**
```json
{
  "rating": 4.5
}
```

**Response:**
```json
{
  "success": true,
  "data": {...receta},
  "message": "Rating actualizado correctamente"
}
```

---

### 8. Incrementar contador de uso

**PATCH** `/api/recetas/:id/uso`

**Response:**
```json
{
  "success": true,
  "data": {...receta},
  "message": "Uso registrado correctamente"
}
```

---

### 9. Obtener estadísticas del trainer

**GET** `/api/recetas/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 50,
    "favoritas": 12,
    "destacadas": 5,
    "publicas": 8,
    "porTipoComida": [
      { "_id": "Desayuno", "count": 15 },
      { "_id": "Almuerzo", "count": 20 },
      ...
    ],
    "porDificultad": [
      { "_id": "Fácil", "count": 30 },
      ...
    ],
    "masUsadas": [
      {
        "nombre": "Avena con frutas",
        "contadorUsos": 45,
        "tipoComida": "Desayuno"
      },
      ...
    ],
    "ratingPromedio": 4.3
  }
}
```

---

### 10. Obtener recetas públicas

**GET** `/api/recetas/publicas`

**Query Parameters:**
- `q` (string): Búsqueda de texto
- `tipoComida` (string): Filtrar por tipo
- `dificultad` (string): Filtrar por dificultad
- `restricciones` (string | array): Filtrar por restricciones
- `sortBy` (string): Campo para ordenar (default: rating)
- `sortDir` (string): Dirección (default: desc)
- `page` (number): Página
- `pageSize` (number): Tamaño de página

**Response:**
```json
{
  "success": true,
  "data": [...recetas públicas],
  "total": 25,
  "page": 1,
  "pageSize": 20,
  "pages": 2
}
```

---

### 11. Duplicar receta

**POST** `/api/recetas/:id/duplicar`

Permite duplicar una receta propia o pública del sistema.

**Response:**
```json
{
  "success": true,
  "data": {...receta duplicada},
  "message": "Receta duplicada correctamente"
}
```

---

## Relación con Trainer

Todas las recetas están vinculadas a un `trainerId` específico mediante el modelo `Trainer`. El sistema utiliza el middleware de autenticación (`protect`) para:

1. Verificar que el usuario esté autenticado
2. Extraer el `trainerId` del token JWT
3. Filtrar automáticamente las recetas por trainer
4. Garantizar que solo se puedan modificar recetas propias

## Características Especiales

### 1. Búsqueda de Texto Completo
- Busca en: nombre, descripción, ingredientes y etiquetas
- Insensible a mayúsculas/minúsculas
- Índice de texto completo en MongoDB

### 2. Filtros Múltiples
- Por tipo de comida
- Por dificultad
- Por restricciones alimentarias
- Por tiempo total de preparación
- Por rango de calorías
- Por estado (favorita, destacada, pública)

### 3. Versionamiento
- Cada modificación incrementa el número de versión
- Permite rastrear cambios en las recetas

### 4. Sistema de Rating
- Valoración de 0 a 5 estrellas
- Cálculo automático de rating promedio

### 5. Contador de Usos
- Rastrea cuántas veces se ha usado una receta
- Identifica las recetas más populares

### 6. Recetas Públicas
- Los trainers pueden compartir recetas
- Otros trainers pueden duplicarlas y personalizarlas

### 7. Valores Nutricionales Calculados
- Calorías totales y por porción
- Macronutrientes detallados
- Micronutrientes opcionales (fibra, sodio, azúcar)

## Índices de Base de Datos

Para optimizar las consultas, el modelo incluye los siguientes índices:

- `{ trainerId: 1, isDeleted: 1 }`
- `{ trainerId: 1, tipoComida: 1 }`
- `{ trainerId: 1, dificultad: 1 }`
- `{ trainerId: 1, esFavorita: 1 }`
- `{ trainerId: 1, esPublica: 1 }`
- `{ esPublica: 1, isDeleted: 1 }`
- Índice de texto completo en nombre, descripción, ingredientes y etiquetas

## Validaciones

El sistema incluye validaciones exhaustivas usando `express-validator`:

- Nombres entre 2-200 caracteres
- Tipos de comida y dificultad con valores enum
- Tiempos no negativos
- Porciones mínimo 1
- Valores nutricionales positivos
- Rating entre 0-5
- IDs válidos de MongoDB

## Manejo de Errores

Todos los endpoints incluyen manejo de errores consistente:

```json
{
  "success": false,
  "error": "Mensaje de error descriptivo",
  "details": "Detalles técnicos del error"
}
```

Códigos de estado HTTP:
- `200` - Éxito
- `201` - Recurso creado
- `400` - Error de validación
- `404` - Recurso no encontrado
- `500` - Error del servidor

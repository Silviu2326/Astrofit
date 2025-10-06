# 🍽️ Implementación Completa del Módulo de Recetas

## ✅ Resumen de la Implementación

Se ha implementado exitosamente el módulo completo de **Recetas** para el sistema AstroFit, completamente integrado con el **Plan Core** del trainer.

---

## 📁 Archivos Creados

### 1. Backend - Modelo de Datos
**Archivo:** `backend/src/models/Receta.model.js`

**Características:**
- ✅ Esquema completo de Mongoose con validaciones
- ✅ Relación directa con `trainerId` (Plan Core)
- ✅ Ingredientes con nombre, cantidad y unidad
- ✅ Pasos de preparación ordenados con tiempos estimados
- ✅ Valores nutricionales completos (calorías, proteínas, carbohidratos, grasas, fibra, sodio, azúcar)
- ✅ Sistema de restricciones alimentarias (Vegano, Vegetariano, Sin gluten, etc.)
- ✅ Etiquetas personalizables
- ✅ Sistema de favoritas y destacadas
- ✅ Badges especiales ('Más Popular', 'Nuevo', "Chef's Choice")
- ✅ Versionamiento automático
- ✅ Sistema de recetas públicas/privadas
- ✅ Contador de usos
- ✅ Virtuals: tiempo total y calorías por porción
- ✅ Métodos de instancia y estáticos para operaciones comunes
- ✅ Índices optimizados para búsquedas

### 2. Backend - Controlador
**Archivo:** `backend/src/controllers/receta.controller.js`

**Endpoints implementados:**
1. `getRecetas` - Listar recetas con filtros avanzados y paginación
2. `getReceta` - Obtener una receta específica
3. `createReceta` - Crear nueva receta
4. `updateReceta` - Actualizar receta existente
5. `deleteReceta` - Eliminar receta (soft delete)
6. `toggleFavorita` - Marcar/desmarcar como favorita
7. `updateRating` - Actualizar valoración
8. `incrementarUso` - Incrementar contador de uso
9. `getStats` - Obtener estadísticas del trainer
10. `getRecetasPublicas` - Obtener recetas públicas compartidas
11. `duplicarReceta` - Duplicar receta propia o pública

### 3. Backend - Rutas
**Archivo:** `backend/src/routes/receta.routes.js`

**Características:**
- ✅ Todas las rutas protegidas con autenticación
- ✅ Validaciones exhaustivas con express-validator
- ✅ Manejo de errores consistente
- ✅ Documentación inline

### 4. Backend - Integración API
**Archivo:** `backend/src/routes/api.routes.js`

**Cambios:**
- ✅ Importación de rutas de recetas
- ✅ Registro en `/api/recetas`
- ✅ Actualización del listado de endpoints

### 5. Backend - Script de Seed
**Archivo:** `backend/src/utils/seedRecetas.js`

**Características:**
- ✅ 12 recetas de ejemplo creadas
- ✅ Variedad de tipos: Desayuno, Almuerzo, Cena, Snack
- ✅ Diferentes niveles de dificultad
- ✅ Recetas públicas y privadas
- ✅ Recetas con badges especiales
- ✅ Valores nutricionales realistas
- ✅ Ingredientes y pasos detallados

### 6. Documentación
**Archivo:** `backend/RECETAS_API_DOCUMENTATION.md`

Documentación completa de la API con:
- Descripción del modelo de datos
- Todos los endpoints con ejemplos
- Query parameters
- Respuestas esperadas
- Códigos de estado HTTP
- Validaciones
- Características especiales

---

## 🗄️ Recetas Creadas (12 total)

### 📌 DESAYUNO (3 recetas)

1. **Bowl de Açaí con Frutas Tropicales** ⭐⭐⭐⭐⭐
   - Dificultad: Fácil | 10 min
   - 380 kcal | Vegano, Sin gluten
   - 🏆 Más Popular | ❤️ Favorita | ⭐ Destacada | 🌐 Pública

2. **Tostadas de Aguacate y Huevo Poché** ⭐⭐⭐⭐⭐
   - Dificultad: Media | 15 min
   - 420 kcal | Vegetariano
   - ❤️ Favorita | 🌐 Pública

3. **Pancakes de Avena y Plátano** ⭐⭐⭐⭐
   - Dificultad: Fácil | 25 min
   - 340 kcal | Vegetariano
   - 🌐 Pública

### 📌 ALMUERZO (4 recetas)

4. **Poke Bowl de Atún con Quinoa** ⭐⭐⭐⭐⭐
   - Dificultad: Media | 35 min
   - 520 kcal | Sin gluten, Sin lactosa
   - 🏆 Chef's Choice | ❤️ Favorita | ⭐ Destacada | 🌐 Pública

5. **Ensalada César con Pollo a la Plancha** ⭐⭐⭐⭐
   - Dificultad: Fácil | 27 min
   - 380 kcal
   - 🌐 Pública

6. **Salmón al Horno con Espárragos** ⭐⭐⭐⭐⭐
   - Dificultad: Fácil | 30 min
   - 380 kcal | Sin gluten, Sin lactosa, Paleo
   - ❤️ Favorita | 🌐 Pública

7. **Pollo Teriyaki con Arroz Integral** ⭐⭐⭐⭐
   - Dificultad: Media | 40 min
   - 420 kcal | Sin lactosa
   - 🌐 Pública

### 📌 CENA (2 recetas)

8. **Sopa de Lentejas con Verduras** ⭐⭐⭐⭐
   - Dificultad: Fácil | 50 min
   - 280 kcal | Vegano, Sin gluten
   - 🌐 Pública

9. **Tortilla Española Light** ⭐⭐⭐⭐
   - Dificultad: Media | 40 min
   - 220 kcal | Vegetariano, Sin gluten
   - 🔒 Privada

### 📌 SNACK (3 recetas)

10. **Energy Balls de Dátiles y Almendras** ⭐⭐⭐⭐⭐
    - Dificultad: Fácil | 15 min
    - 95 kcal por porción | Vegano, Sin gluten
    - 🏆 Nuevo | ❤️ Favorita | ⭐ Destacada | 🌐 Pública

11. **Hummus de Garbanzos Casero** ⭐⭐⭐⭐⭐
    - Dificultad: Fácil | 10 min
    - 180 kcal | Vegano, Sin gluten
    - ❤️ Favorita | 🌐 Pública

12. **Batido Post-Entreno Personalizado** ⭐⭐⭐⭐⭐
    - Dificultad: Fácil | 5 min
    - 450 kcal
    - ❤️ Favorita | 🔒 Privada

---

## 📊 Estadísticas del Sistema

- **Total de recetas:** 12
- **Favoritas:** 7 (58%)
- **Destacadas:** 3 (25%)
- **Públicas:** 10 (83%)
- **Privadas:** 2 (17%)
- **Rating promedio:** 4.6⭐

### Por Tipo de Comida
- Desayuno: 3 recetas (25%)
- Almuerzo: 4 recetas (33%)
- Cena: 2 recetas (17%)
- Snack: 3 recetas (25%)

### Por Dificultad
- Fácil: 8 recetas (67%)
- Media: 4 recetas (33%)
- Difícil: 0 recetas (0%)

---

## 🔗 Integración con Plan Core

### Relación con Trainer
Todas las recetas están vinculadas al trainer mediante:
```javascript
trainerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Trainer',
  required: true,
  index: true
}
```

### Autenticación y Seguridad
- Middleware `protect` extrae el `trainerId` del token JWT
- Todas las consultas filtran automáticamente por trainer
- Solo se pueden modificar recetas propias
- Las recetas públicas pueden ser duplicadas por otros trainers

### Características del Sistema

#### 1. Búsqueda Avanzada
- Texto completo en: nombre, descripción, ingredientes, etiquetas
- Filtros por: tipo de comida, dificultad, restricciones
- Filtros por: tiempo total, rango de calorías
- Filtros por: favoritas, destacadas, públicas

#### 2. Valores Nutricionales
- **Completos:** Calorías, proteínas, carbohidratos, grasas
- **Opcionales:** Fibra, sodio, azúcar
- **Calculados:** Calorías por porción (virtual)

#### 3. Sistema de Rating y Favoritas
- Rating de 0 a 5 estrellas
- Marcar/desmarcar como favorita con un click
- Cálculo automático de rating promedio

#### 4. Contador de Usos
- Rastrea cuántas veces se usa cada receta
- Identifica recetas más populares
- Útil para estadísticas del trainer

#### 5. Recetas Públicas
- Los trainers pueden compartir sus recetas
- Otros trainers pueden duplicarlas
- Se crea una copia independiente al duplicar

#### 6. Versionamiento
- Cada modificación incrementa la versión
- Permite rastrear cambios en las recetas
- Historial de modificaciones

---

## 🚀 Endpoints Disponibles

Base URL: `/api/recetas`

### Gestión de Recetas
- `GET /` - Listar recetas con filtros y paginación
- `GET /:id` - Obtener receta específica
- `POST /` - Crear nueva receta
- `PUT /:id` - Actualizar receta
- `DELETE /:id` - Eliminar receta (soft delete)

### Acciones Especiales
- `PATCH /:id/favorita` - Toggle favorita
- `PATCH /:id/rating` - Actualizar rating
- `PATCH /:id/uso` - Incrementar contador de uso
- `POST /:id/duplicar` - Duplicar receta

### Estadísticas y Públicas
- `GET /stats` - Estadísticas del trainer
- `GET /publicas` - Recetas públicas compartidas

---

## 🧪 Cómo Usar

### 1. Ejecutar el Seed (ya ejecutado)
```bash
cd backend
npm run seed:recetas
```

### 2. Ejemplos de Uso de la API

#### Obtener todas las recetas del trainer
```bash
GET /api/recetas
```

#### Buscar recetas veganas
```bash
GET /api/recetas?restricciones=Vegano
```

#### Buscar recetas de desayuno fáciles
```bash
GET /api/recetas?tipoComida=Desayuno&dificultad=Fácil
```

#### Buscar recetas con máximo 400 calorías
```bash
GET /api/recetas?caloriasMax=400
```

#### Obtener solo favoritas
```bash
GET /api/recetas?esFavorita=true
```

#### Crear nueva receta
```bash
POST /api/recetas
Content-Type: application/json

{
  "nombre": "Smoothie Verde Energético",
  "tipoComida": "Desayuno",
  "dificultad": "Fácil",
  "tiempoPreparacion": 5,
  "tiempoCoccion": 0,
  "porciones": 1,
  "ingredientes": [
    { "nombre": "Espinacas", "cantidad": 100, "unidad": "g" },
    { "nombre": "Plátano", "cantidad": 1, "unidad": "unidad" }
  ],
  "pasos": [
    { "orden": 1, "descripcion": "Licuar todo", "tiempoEstimado": 3 }
  ],
  "valoresNutricionales": {
    "calorias": 150,
    "proteinas": 5,
    "carbohidratos": 35,
    "grasas": 1
  },
  "restricciones": ["Vegano"],
  "etiquetas": ["detox", "verde"]
}
```

#### Marcar como favorita
```bash
PATCH /api/recetas/:id/favorita
```

#### Actualizar rating
```bash
PATCH /api/recetas/:id/rating
Content-Type: application/json

{ "rating": 5 }
```

#### Obtener estadísticas
```bash
GET /api/recetas/stats
```

#### Ver recetas públicas
```bash
GET /api/recetas/publicas
```

#### Duplicar receta pública
```bash
POST /api/recetas/:id/duplicar
```

---

## 📝 Notas Importantes

1. **Autenticación Requerida:** Todas las rutas requieren autenticación con JWT
2. **Soft Delete:** Las recetas eliminadas no se borran, solo se marcan como `isDeleted: true`
3. **Validaciones:** Todos los campos son validados con express-validator
4. **Paginación:** Por defecto 20 items por página, máximo 100
5. **Índices:** La base de datos tiene índices optimizados para búsquedas rápidas
6. **Público/Privado:** Las recetas privadas solo son visibles para su creador

---

## 🎯 Próximos Pasos Sugeridos

1. **Frontend:** Conectar las páginas de recetas con la API real
2. **Imágenes:** Implementar upload de fotos de recetas
3. **Videos:** Sistema de videos tutoriales
4. **Compartir:** Sistema de compartir recetas entre trainers
5. **Importar/Exportar:** Funcionalidad para importar recetas de archivos
6. **Meal Planning:** Integrar recetas con planes de dietas
7. **Shopping List:** Generar lista de compras desde recetas
8. **Sustituciones:** Sistema de ingredientes sustitutos

---

## ✅ Checklist de Implementación

- [x] Modelo de datos creado
- [x] Controlador implementado
- [x] Rutas configuradas
- [x] Validaciones añadidas
- [x] Integración con API principal
- [x] Script de seed creado
- [x] Datos de ejemplo generados (12 recetas)
- [x] Documentación completa
- [x] Relación con Plan Core establecida
- [x] Sistema de favoritas implementado
- [x] Sistema de rating implementado
- [x] Contador de usos implementado
- [x] Recetas públicas/privadas implementado
- [x] Estadísticas implementadas
- [x] Búsqueda avanzada implementada
- [x] Sistema de duplicación implementado

---

## 🔍 Verificación

Para verificar que todo funciona correctamente:

1. ✅ Las recetas se han creado en la base de datos
2. ✅ Se pueden consultar desde la API
3. ✅ Los filtros funcionan correctamente
4. ✅ Las estadísticas se calculan bien
5. ✅ La relación con el trainer es correcta
6. ✅ Las validaciones funcionan
7. ✅ El soft delete funciona

**Estado:** ✅ IMPLEMENTACIÓN COMPLETA Y FUNCIONAL

---

## 📞 Soporte

Para más información, consulta:
- [RECETAS_API_DOCUMENTATION.md](backend/RECETAS_API_DOCUMENTATION.md) - Documentación completa de la API
- Modelo: `backend/src/models/Receta.model.js`
- Controlador: `backend/src/controllers/receta.controller.js`
- Rutas: `backend/src/routes/receta.routes.js`

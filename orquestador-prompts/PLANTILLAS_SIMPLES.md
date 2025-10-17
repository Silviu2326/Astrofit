# 🎯 Plantillas Simples - Generadores Específicos

## 📋 **Descripción General**

Las plantillas simples están diseñadas para tareas específicas y concretas. Son ideales para generar código desde documentación existente o para automatizar tareas repetitivas de desarrollo.

---

## 🏗️ **Plantilla: Generador Backend**

### **🎯 Propósito**
Genera modelos, controladores y rutas desde documentación MD.

### **📥 Inputs que recibirá Cursor:**
1. **Archivo MD con especificaciones**: Documentación de entidades y funcionalidades
2. **Path del src del backend**: Ruta donde generar los archivos

### **📤 Outputs que generará:**
- Modelos de datos con validaciones
- Controladores CRUD completos
- Rutas RESTful con middleware
- Documentación de la API

### **💡 Ejemplo de Uso:**
```
Input 1: "user-specifications.md" (con entidades User, Product, Order)
Input 2: "src/backend"
Output: 
- src/backend/models/User.js
- src/backend/controllers/userController.js
- src/backend/routes/userRoutes.js
- src/backend/models/Product.js
- src/backend/controllers/productController.js
- src/backend/routes/productRoutes.js
```

### **🔧 Chats Configurados:**
- **Chat 1 - Model Generator**: Genera modelos desde MD
- **Chat 2 - Controller Generator**: Crea controladores CRUD
- **Chat 3 - Route Generator**: Genera rutas RESTful

---

## ⚛️ **Plantilla: Generador Componentes Frontend**

### **🎯 Propósito**
Crea componentes React/TypeScript desde especificaciones.

### **📥 Inputs que recibirá Cursor:**
1. **Archivo MD con diseño de componentes**: Especificaciones de UI/UX
2. **Path del src del frontend**: Ruta donde generar los componentes

### **📤 Outputs que generará:**
- Componentes React funcionales
- Interfaces TypeScript
- Estilos CSS/Tailwind
- Hooks personalizados
- Tests unitarios

### **💡 Ejemplo de Uso:**
```
Input 1: "component-specs.md" (con UserCard, ProductList, OrderForm)
Input 2: "src/frontend/components"
Output:
- src/frontend/components/UserCard.tsx
- src/frontend/components/ProductList.tsx
- src/frontend/components/OrderForm.tsx
- src/frontend/hooks/useUser.ts
- src/frontend/types/user.ts
```

### **🔧 Chats Configurados:**
- **Chat 1 - Component Generator**: Genera componentes React
- **Chat 2 - Hook Generator**: Crea hooks personalizados
- **Chat 3 - Type Generator**: Genera tipos TypeScript

---

## 🗄️ **Plantilla: Generador Esquema BD**

### **🎯 Propósito**
Crea esquemas de base de datos desde documentación.

### **📥 Inputs que recibirá Cursor:**
1. **Archivo MD con entidades**: Especificaciones de tablas/colecciones
2. **Tipo de BD**: PostgreSQL/MySQL/MongoDB

### **📤 Outputs que generará:**
- Scripts de creación de BD
- Migraciones de base de datos
- Índices optimizados
- Scripts de seeding

### **💡 Ejemplo de Uso:**
```
Input 1: "database-schema.md" (con tablas users, products, orders)
Input 2: "PostgreSQL"
Output:
- migrations/001_create_users.sql
- migrations/002_create_products.sql
- migrations/003_create_orders.sql
- seeds/initial_data.sql
- indexes/performance_indexes.sql
```

### **🔧 Chats Configurados:**
- **Chat 1 - Schema Generator**: Genera esquema desde MD
- **Chat 2 - Migration Generator**: Crea migraciones
- **Chat 3 - Seed Generator**: Genera datos iniciales

---

## 📚 **Plantilla: Generador Documentación API**

### **🎯 Propósito**
Genera documentación completa de APIs desde código.

### **📥 Inputs que recibirá Cursor:**
1. **Archivos de rutas/controladores**: Código fuente de la API
2. **Path de documentación**: Ruta donde generar la documentación

### **📤 Outputs que generará:**
- Documentación Swagger/OpenAPI
- Ejemplos de uso
- SDKs en múltiples lenguajes
- Guías de integración

### **💡 Ejemplo de Uso:**
```
Input 1: "src/routes/*.js, src/controllers/*.js"
Input 2: "docs/api"
Output:
- docs/api/swagger.json
- docs/api/examples.md
- docs/api/sdks/python/
- docs/api/sdks/javascript/
- docs/api/integration-guide.md
```

### **🔧 Chats Configurados:**
- **Chat 1 - Swagger Generator**: Genera documentación OpenAPI
- **Chat 2 - SDK Generator**: Crea SDKs en múltiples lenguajes
- **Chat 3 - Guide Generator**: Genera guías de integración

---

## 🧪 **Plantilla: Generador Tests**

### **🎯 Propósito**
Crea tests automatizados desde código existente.

### **📥 Inputs que recibirá Cursor:**
1. **Archivos de código a testear**: Código fuente a cubrir con tests
2. **Path de tests**: Ruta donde generar los tests

### **📤 Outputs que generará:**
- Tests unitarios
- Tests de integración
- Mocks y fixtures
- Reportes de cobertura

### **💡 Ejemplo de Uso:**
```
Input 1: "src/controllers/userController.js, src/models/User.js"
Input 2: "tests"
Output:
- tests/unit/userController.test.js
- tests/unit/User.test.js
- tests/integration/userRoutes.test.js
- tests/mocks/userMocks.js
- tests/fixtures/userFixtures.js
```

### **🔧 Chats Configurados:**
- **Chat 1 - Unit Test Generator**: Genera tests unitarios
- **Chat 2 - Integration Test Generator**: Crea tests de integración
- **Chat 3 - Mock Generator**: Genera mocks y fixtures

---

## 🚀 **Casos de Uso Comunes**

### **📋 Desarrollo Backend Rápido**
1. Tienes documentación de entidades en MD
2. Usas "Generador Backend"
3. Obtienes modelos, controladores y rutas completos
4. Solo necesitas ajustar lógica de negocio específica

### **⚛️ Componentes Frontend**
1. Tienes especificaciones de UI en MD
2. Usas "Generador Componentes Frontend"
3. Obtienes componentes React con TypeScript
4. Solo necesitas ajustar estilos y funcionalidad

### **🗄️ Base de Datos**
1. Tienes esquema de BD documentado en MD
2. Usas "Generador Esquema BD"
3. Obtienes migraciones y scripts completos
4. Solo necesitas ajustar índices específicos

### **📚 Documentación API**
1. Tienes API desarrollada
2. Usas "Generador Documentación API"
3. Obtienes documentación Swagger completa
4. Solo necesitas agregar ejemplos específicos

### **🧪 Testing**
1. Tienes código desarrollado
2. Usas "Generador Tests"
3. Obtienes tests unitarios e integración
4. Solo necesitas agregar casos edge específicos

---

## 💡 **Ventajas de las Plantillas Simples**

### **✅ Beneficios**
- **Tareas específicas**: Enfocadas en una sola tarea
- **Inputs claros**: Solo necesitas documentación MD
- **Outputs predecibles**: Sabes exactamente qué obtendrás
- **Rápido**: Generan código en minutos
- **Consistente**: Siguen patrones estándar
- **Extensible**: Fácil de personalizar después

### **🎯 Cuándo Usar**
- **Prototipado rápido**: Para validar ideas
- **Boilerplate**: Para evitar código repetitivo
- **Documentación**: Para generar desde especificaciones
- **Testing**: Para cubrir código existente
- **Migración**: Para convertir documentación a código

---

## 🔧 **Configuración Recomendada**

### **Para Backend (Node.js)**
- **ORM**: Mongoose/Sequelize/TypeORM
- **Framework**: Express.js
- **Validación**: Joi/Yup
- **Testing**: Jest/Supertest

### **Para Frontend (React)**
- **Framework**: React 18+
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library

### **Para Base de Datos**
- **SQL**: PostgreSQL/MySQL
- **NoSQL**: MongoDB
- **Migraciones**: Knex/Sequelize
- **Optimización**: Índices, particionado

---

## 📞 **Soporte y Personalización**

- **Documentación**: Cada plantilla incluye prompts específicos
- **Personalización**: Modifica los prompts según tu stack
- **Extensión**: Agrega nuevas plantillas simples
- **Integración**: Combina con plantillas complejas

¡Las plantillas simples son perfectas para automatizar tareas específicas y generar código rápidamente desde documentación! 🚀





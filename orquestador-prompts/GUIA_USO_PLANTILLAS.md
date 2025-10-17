# 🎯 Guía de Uso de Plantillas Especializadas

## 📋 **Plantilla: Extraer User Stories de Notion**

### **🎯 Propósito**
Analiza páginas de Notion para extraer user stories y generar documentación estructurada.

### **📥 Inputs que recibirá Cursor:**
1. **URL de página Notion**: Enlace directo a la página de Notion con user stories
2. **Path del módulo**: Ruta donde guardar el archivo MD generado

### **📤 Outputs que generará:**
- Archivo MD con user stories estructuradas
- Criterios de aceptación detallados
- Desglose técnico frontend/backend
- Mapa de dependencias entre user stories

### **💡 Ejemplo de Uso:**
```
Input 1: https://notion.so/mi-empresa/user-stories-abc123
Input 2: src/modules/user-management
Output: src/modules/user-management/user-stories.md
```

---

## 🚀 **Plantilla: Desarrollo Full-Stack**

### **🎯 Propósito**
Desarrolla aplicaciones completas full-stack.

### **📥 Inputs que recibirá Cursor:**
1. **Especificaciones de la aplicación**: Descripción detallada de funcionalidades
2. **Stack tecnológico preferido**: React, Node.js, PostgreSQL, etc.

### **📤 Outputs que generará:**
- Estructura de proyecto completa
- Componentes React/TypeScript
- APIs REST con documentación
- Esquemas de base de datos
- Configuración Docker
- Documentación técnica

### **💡 Ejemplo de Uso:**
```
Input 1: "Aplicación de gestión de tareas con autenticación, CRUD de tareas, y notificaciones"
Input 2: "React, Node.js, PostgreSQL, Redis"
Output: Proyecto completo con frontend, backend, BD y documentación
```

---

## 🛒 **Plantilla: Plataforma E-commerce**

### **🎯 Propósito**
Construye tiendas online completas con todas las funcionalidades.

### **📥 Inputs que recibirá Cursor:**
1. **Catálogo de productos**: Lista de productos con precios y categorías
2. **Métodos de pago requeridos**: Stripe, PayPal, transferencia bancaria
3. **Reglas de negocio**: Descuentos, envíos, impuestos

### **📤 Outputs que generará:**
- Frontend de tienda con catálogo
- Sistema de pagos integrado
- Gestión de inventario
- Procesamiento de pedidos
- Dashboard de analytics

### **💡 Ejemplo de Uso:**
```
Input 1: "Productos: Ropa, Electrónicos, Hogar. Precios: $10-$500"
Input 2: "Stripe, PayPal, Transferencia"
Input 3: "Descuento 10% por compras >$100, Envío gratis >$50"
Output: Tienda online completa con todas las funcionalidades
```

---

## ☁️ **Plantilla: Aplicación SaaS**

### **🎯 Propósito**
Desarrolla aplicaciones SaaS multi-tenant con suscripciones.

### **📥 Inputs que recibirá Cursor:**
1. **Modelo de negocio SaaS**: Descripción del servicio
2. **Planes de suscripción**: Básico, Pro, Enterprise con precios
3. **Funcionalidades por plan**: Qué incluye cada plan

### **📤 Outputs que generará:**
- Arquitectura multi-tenant
- Sistema de suscripciones
- Facturación automática
- Gestión de usuarios
- Analytics empresariales

### **💡 Ejemplo de Uso:**
```
Input 1: "Plataforma de gestión de proyectos"
Input 2: "Básico: $10/mes, Pro: $30/mes, Enterprise: $100/mes"
Input 3: "Básico: 5 usuarios, Pro: 25 usuarios, Enterprise: Ilimitado"
Output: SaaS completo con suscripciones y facturación
```

---

## 🤖 **Plantilla: Integración AI/ML**

### **🎯 Propósito**
Integra inteligencia artificial en aplicaciones existentes.

### **📥 Inputs que recibirá Cursor:**
1. **Datos de entrenamiento**: Dataset o fuentes de datos
2. **Casos de uso de IA**: Chatbot, recomendaciones, análisis
3. **Modelos pre-entrenados**: OpenAI, Hugging Face, modelos custom

### **📤 Outputs que generará:**
- Interfaces de IA (chat, formularios inteligentes)
- Pipelines de ML
- Procesamiento de datos
- Integración de modelos en producción

### **💡 Ejemplo de Uso:**
```
Input 1: "Dataset de conversaciones de soporte"
Input 2: "Chatbot de soporte, análisis de sentimientos"
Input 3: "GPT-4, BERT para análisis de texto"
Output: Sistema de IA completo integrado
```

---

## ⚡ **Plantilla: Aplicación Tiempo Real**

### **🎯 Propósito**
Desarrolla aplicaciones con comunicación en tiempo real.

### **📥 Inputs que recibirá Cursor:**
1. **Casos de uso de tiempo real**: Chat, notificaciones, colaboración
2. **Volumen de usuarios esperado**: 100, 1000, 10000+ usuarios
3. **Tipos de eventos**: Mensajes, actualizaciones, notificaciones

### **📤 Outputs que generará:**
- WebSocket servers
- Interfaces en tiempo real
- Sistemas de notificaciones
- Streaming de eventos

### **💡 Ejemplo de Uso:**
```
Input 1: "Chat en tiempo real, notificaciones push, colaboración en documentos"
Input 2: "1000 usuarios simultáneos"
Input 3: "Mensajes, typing indicators, cursor sharing"
Output: Aplicación tiempo real completa
```

---

## 🏗️ **Plantilla: Arquitectura Microservicios**

### **🎯 Propósito**
Diseña arquitecturas distribuidas escalables.

### **📥 Inputs que recibirá Cursor:**
1. **Servicios a descomponer**: Lista de servicios/módulos
2. **Requisitos de escalabilidad**: Usuarios, transacciones, datos
3. **Tecnologías preferidas**: Docker, Kubernetes, AWS, etc.

### **📤 Outputs que generará:**
- API Gateway
- Service discovery
- Eventos asíncronos
- Orquestación de contenedores
- Monitoreo distribuido

### **💡 Ejemplo de Uso:**
```
Input 1: "Autenticación, Usuarios, Productos, Pedidos, Pagos"
Input 2: "1M usuarios, 10K transacciones/segundo"
Input 3: "Docker, Kubernetes, AWS, Redis, PostgreSQL"
Output: Arquitectura microservicios completa
```

---

## 💰 **Plantilla: Aplicación FinTech**

### **🎯 Propósito**
Desarrolla aplicaciones financieras seguras y compliant.

### **📥 Inputs que recibirá Cursor:**
1. **Regulaciones financieras aplicables**: PCI DSS, GDPR, SOX
2. **Tipos de transacciones**: Pagos, transferencias, inversiones
3. **Requisitos de seguridad**: Encriptación, autenticación, auditoría

### **📤 Outputs que generará:**
- Interfaces financieras
- Procesamiento de pagos
- Evaluación de riesgos
- Reportes de cumplimiento
- Integración blockchain

### **💡 Ejemplo de Uso:**
```
Input 1: "PCI DSS, GDPR, regulaciones bancarias"
Input 2: "Pagos con tarjeta, transferencias ACH, criptomonedas"
Input 3: "AES-256, 2FA, logs de auditoría completos"
Output: Aplicación FinTech compliant y segura
```

---

## 🏥 **Plantilla: Aplicación Healthcare**

### **🎯 Propósito**
Desarrolla aplicaciones de salud HIPAA-compliant.

### **📥 Inputs que recibirá Cursor:**
1. **Tipos de datos médicos**: Historiales, recetas, diagnósticos
2. **Flujos de trabajo clínicos**: Consultas, seguimiento, emergencias
3. **Requisitos de privacidad**: HIPAA, encriptación, acceso controlado

### **📤 Outputs que generará:**
- Interfaces de salud
- Gestión de pacientes
- Registros médicos seguros
- Cumplimiento HIPAA
- Funcionalidades de telemedicina

### **💡 Ejemplo de Uso:**
```
Input 1: "Historiales médicos, recetas, resultados de laboratorio"
Input 2: "Consultas virtuales, seguimiento de pacientes, alertas médicas"
Input 3: "HIPAA compliant, encriptación end-to-end, auditoría completa"
Output: Sistema de salud completo y seguro
```

---

## 🎮 **Plantilla: Plataforma Gaming**

### **🎯 Propósito**
Construye plataformas de gaming y sistemas multijugador.

### **📥 Inputs que recibirá Cursor:**
1. **Mecánicas de juego**: PvP, PvE, cooperativo, competitivo
2. **Número de jugadores simultáneos**: 2, 10, 100, 1000+
3. **Tipos de competencia**: Rankings, torneos, ligas

### **📤 Outputs que generará:**
- Interfaces de juego
- Backends de gaming
- Sistemas multijugador
- Leaderboards
- Analytics de jugadores

### **💡 Ejemplo de Uso:**
```
Input 1: "Juego de estrategia multijugador, batallas PvP, alianzas"
Input 2: "1000 jugadores simultáneos por servidor"
Input 3: "Rankings globales, torneos semanales, ligas por regiones"
Output: Plataforma gaming completa
```

---

## 🌐 **Plantilla: Aplicación IoT**

### **🎯 Propósito**
Desarrolla sistemas IoT para monitoreo y control de dispositivos.

### **📥 Inputs que recibirá Cursor:**
1. **Tipos de sensores/dispositivos**: Temperatura, humedad, movimiento, cámaras
2. **Volumen de datos**: 100, 1000, 10000+ dispositivos
3. **Requisitos de tiempo real**: Latencia, frecuencia de actualización

### **📤 Outputs que generará:**
- Dashboards IoT
- Gestión de dispositivos
- Ingesta de datos de sensores
- Procesamiento edge

### **💡 Ejemplo de Uso:**
```
Input 1: "Sensores de temperatura, humedad, cámaras de seguridad"
Input 2: "500 dispositivos, 1M datos/día"
Input 3: "Latencia <100ms, actualización cada 30 segundos"
Output: Sistema IoT completo
```

---

## 📝 **Plantilla: Sistema CMS**

### **🎯 Propósito**
Construye sistemas de gestión de contenido robustos.

### **📥 Inputs que recibirá Cursor:**
1. **Tipos de contenido**: Artículos, páginas, medios, productos
2. **Flujos de aprobación**: Draft → Review → Published
3. **Requisitos de SEO**: Meta tags, sitemaps, optimización

### **📤 Outputs que generará:**
- Interfaces de CMS
- APIs de contenido
- Gestión de medios
- Optimización SEO
- Flujos de trabajo editoriales

### **💡 Ejemplo de Uso:**
```
Input 1: "Blog posts, páginas estáticas, galerías de imágenes"
Input 2: "Autor → Editor → Publicador → Live"
Input 3: "Meta tags automáticos, sitemap XML, schema markup"
Output: CMS completo con SEO
```

---

## 🔌 **Plantilla: Plataforma de APIs**

### **🎯 Propósito**
Desarrolla plataformas de APIs empresariales.

### **📥 Inputs que recibirá Cursor:**
1. **Servicios a exponer**: Autenticación, usuarios, productos, pagos
2. **Políticas de rate limiting**: 1000 req/hora, 10000 req/día
3. **Requisitos de documentación**: Swagger, ejemplos, SDKs

### **📤 Outputs que generará:**
- Diseño de APIs RESTful
- Gateway de APIs
- Limitación de velocidad
- Documentación automática
- Portal de desarrolladores

### **💡 Ejemplo de Uso:**
```
Input 1: "APIs de e-commerce: productos, carrito, checkout, usuarios"
Input 2: "1000 req/hora por API key, 10000 req/día por usuario"
Input 3: "Swagger UI, SDKs en Python/JavaScript, ejemplos de código"
Output: Plataforma de APIs completa
```

---

## 🚀 **Flujo de Trabajo Recomendado**

### **1. Selección de Plantilla**
- Identifica el tipo de proyecto
- Selecciona la plantilla más adecuada
- Configura la cantidad de chats necesaria

### **2. Preparación de Inputs**
- Define claramente los requisitos
- Prepara los datos necesarios
- Establece los outputs esperados

### **3. Ejecución**
- Ejecuta el orquestador con la plantilla seleccionada
- Proporciona los inputs requeridos
- Monitorea el progreso en cada chat

### **4. Revisión y Ajustes**
- Revisa los outputs generados
- Ajusta según sea necesario
- Itera para mejorar los resultados

---

## 💡 **Consejos de Uso**

1. **Sé específico en los inputs**: Mientras más detallado, mejor será el output
2. **Usa ejemplos concretos**: Ayuda a Cursor a entender mejor los requisitos
3. **Itera y mejora**: Los primeros resultados pueden necesitar ajustes
4. **Documenta los outputs**: Guarda los resultados para referencia futura
5. **Personaliza los prompts**: Adapta los prompts a tu stack tecnológico específico

¡Con estas plantillas especializadas, podrás desarrollar cualquier tipo de aplicación de manera eficiente y profesional! 🚀





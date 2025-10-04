# 🌐 Grupos de Comunidad

Módulo completo de gestión de grupos comunitarios con sistema de roles, feed, miembros y reglas.

## 🎨 Diseño

- **Gradiente**: `from-purple-600 via-indigo-600 to-blue-600`
- **Estilo**: Glassmorphism con efectos de profundidad
- **Tema**: Moderno y colaborativo

## ✨ Características

### 1. Gestión de Grupos
- ✅ Crear grupos con información completa
- ✅ Configuración de privacidad (Público/Privado/Secreto)
- ✅ Categorización temática
- ✅ Imágenes de portada e iconos personalizados
- ✅ Etiquetas y descripción detallada

### 2. Sistema de Roles
- 👑 **Administradores**: Control total del grupo
- 🛡️ **Moderadores**: Gestión de contenido y miembros
- 👤 **Miembros**: Participación en el grupo

### 3. Feed del Grupo
- 📝 Crear publicaciones con texto e imágenes
- 💬 Sistema de comentarios
- ❤️ Likes y reacciones
- 📌 Publicaciones fijadas
- 🔄 Compartir contenido

### 4. Gestión de Miembros
- 👥 Lista completa de miembros
- 🔍 Búsqueda y filtrado por rol
- 📊 Estadísticas de participación
- 🏆 Sistema de reputación
- 💬 Mensajería directa

### 5. Reglas del Grupo
- 📋 Definición de reglas claras
- ⚠️ Advertencias y consecuencias
- 📝 Editor de reglas para administradores

## 📁 Estructura de Archivos

```
grupos-comunidad/
├── components/
│   ├── GruposComunidad.tsx      # Componente principal
│   ├── GroupCard.tsx             # Tarjeta de grupo
│   ├── CreateGroupModal.tsx      # Modal de creación
│   ├── GroupDetail.tsx           # Vista detallada
│   ├── GroupFeed.tsx             # Feed de publicaciones
│   ├── GroupMembers.tsx          # Gestión de miembros
│   └── GroupRules.tsx            # Reglas del grupo
├── types/
│   └── index.ts                  # Definiciones TypeScript
├── index.ts                      # Exportaciones
└── README.md                     # Documentación
```

## 🚀 Uso

```tsx
import { GruposComunidad } from '@/features/grupos-comunidad';

function App() {
  return <GruposComunidad />;
}
```

## 🎯 Componentes Principales

### GruposComunidad
Componente principal con tres pestañas:
- **Descubrir**: Explora todos los grupos disponibles
- **Mis Grupos**: Grupos en los que eres miembro
- **Tendencias**: Grupos más populares

### GroupCard
Tarjeta informativa de grupo con:
- Imagen de portada
- Información básica
- Estadísticas de miembros y publicaciones
- Indicador de privacidad
- Badge de rol (si aplica)

### CreateGroupModal
Modal completo para crear grupos con:
- Información básica (nombre, descripción)
- Selección de categoría
- Configuración de privacidad
- Gestión de etiquetas
- Sistema de reglas
- Subida de imágenes

### GroupDetail
Vista detallada del grupo con:
- Navegación por pestañas
- Feed de publicaciones
- Lista de miembros
- Información completa
- Acciones administrativas

### GroupFeed
Sistema completo de publicaciones:
- Crear nuevas publicaciones
- Ver publicaciones del grupo
- Interacciones (like, comentar, compartir)
- Publicaciones fijadas

### GroupMembers
Gestión de miembros con:
- Lista completa de miembros
- Búsqueda y filtros
- Estadísticas por rol
- Acciones de moderación

### GroupRules
Visualización de reglas:
- Listado numerado
- Descripciones detalladas
- Advertencias importantes

## 🎨 Características de Diseño

### Colores por Categoría
- 💻 Tecnología: Azul
- 🎮 Gaming: Morado
- 🎨 Arte: Rosa
- 🎵 Música: Índigo
- ⚽ Deportes: Verde
- 📚 Educación: Amarillo
- 💼 Negocios: Rojo
- 🌟 Estilo de vida: Teal
- 🎬 Entretenimiento: Naranja

### Estados de Privacidad
- 🌐 **Público**: Cualquiera puede ver y unirse
- 🔒 **Privado**: Solo miembros ven el contenido
- 👁️ **Secreto**: No aparece en búsquedas

### Badges de Rol
- 👑 Administrador: Amarillo
- 🛡️ Moderador: Azul
- ✅ Miembro: Verde

## 📊 Tipos de Datos

### CommunityGroup
```typescript
interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  category: GroupCategory;
  privacy: 'public' | 'private' | 'secret';
  memberCount: number;
  postCount: number;
  isJoined: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  // ... más propiedades
}
```

### GroupMember
```typescript
interface GroupMember {
  id: string;
  username: string;
  role: 'admin' | 'moderator' | 'member';
  reputation: number;
  postsCount: number;
  // ... más propiedades
}
```

### GroupPost
```typescript
interface GroupPost {
  id: string;
  content: string;
  authorName: string;
  likes: number;
  comments: number;
  isPinned: boolean;
  // ... más propiedades
}
```

## 🔧 Funcionalidades Futuras

- [ ] Sistema de notificaciones del grupo
- [ ] Chat en tiempo real
- [ ] Eventos del grupo
- [ ] Integración con calendario
- [ ] Sistema de badges y logros
- [ ] Exportar datos del grupo
- [ ] Analíticas avanzadas
- [ ] Subgrupos y canales
- [ ] Sistema de encuestas
- [ ] Integración con redes sociales

## 📝 Notas de Desarrollo

- Todos los componentes usan el sistema de diseño glassmorphism
- Implementación completa con TypeScript para type safety
- Componentes totalmente responsivos
- Optimizado para rendimiento con React hooks
- Mock data incluido para desarrollo y testing

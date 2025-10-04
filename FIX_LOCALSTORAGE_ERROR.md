# Fix: LocalStorage Parse Error

## Problema
Los componentes Header.tsx y Sidebar.tsx tienen errores al intentar parsear `localStorage.getItem('currentUser')` cuando el valor es el string literal `"undefined"`.

## Solución

### 1. Usar la nueva función helper (RECOMENDADO)

He creado `src/utils/localStorage.ts` con funciones seguras para manejar localStorage.

#### En Header.tsx (líneas 1-34):

**ANTES:**
```typescript
import React, { useState, useEffect } from 'react';
import { Bell, Search, User, LogOut, Menu, Settings, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ... interfaces ...

export const Header: React.FC<HeaderProps> = ({ onLogout, onToggleSidebar }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);
```

**DESPUÉS:**
```typescript
import React, { useState, useEffect } from 'react';
import { Bell, Search, User, LogOut, Menu, Settings, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/localStorage';

// ... interfaces ...

export const Header: React.FC<HeaderProps> = ({ onLogout, onToggleSidebar }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
```

#### En Sidebar.tsx (líneas 625-636):

**ANTES:**
```typescript
useEffect(() => {
  const userStr = localStorage.getItem('currentUser');
  if (userStr) {
    try {
      const user = JSON.parse(userStr) as User;
      setCurrentUser(user);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }
}, []);
```

**DESPUÉS:**
```typescript
import { getCurrentUser } from '../../utils/localStorage';

// ...

useEffect(() => {
  const user = getCurrentUser();
  if (user) {
    setCurrentUser(user);
  }
}, []);
```

### 2. Alternativa sin helper (si prefieres no importar)

Agrega validación para strings literales:

```typescript
useEffect(() => {
  const userStr = localStorage.getItem('currentUser');
  // Check for invalid values
  if (userStr && userStr !== 'undefined' && userStr !== 'null') {
    try {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      // Clean up invalid data
      localStorage.removeItem('currentUser');
    }
  }
}, []);
```

## Beneficios de usar el helper

1. ✅ **Manejo centralizado de errores**
2. ✅ **Limpieza automática de datos inválidos**
3. ✅ **Código más limpio y legible**
4. ✅ **Reutilizable en toda la aplicación**
5. ✅ **TypeScript seguro**

## Funciones disponibles en `utils/localStorage.ts`

- `getCurrentUser()` - Obtiene el usuario actual de forma segura
- `setCurrentUser(user)` - Guarda el usuario de forma segura
- `clearAuthData()` - Limpia todos los datos de autenticación
- `safeGetJSON<T>(key)` - Parse JSON genérico seguro
- `safeSetJSON<T>(key, value)` - Guarda JSON genérico seguro

## Aplicar los cambios

1. Actualizar import en Header.tsx (línea 3)
2. Simplificar useEffect en Header.tsx (líneas 23-34)
3. Actualizar import en Sidebar.tsx
4. Simplificar useEffect en Sidebar.tsx (líneas 625-636)

Esto eliminará completamente los errores de parsing de JSON.

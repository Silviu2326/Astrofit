# Tests de Integración - Biblioteca Contenidos

Este directorio contiene las pruebas de integración para el módulo de biblioteca-contenidos.

## Estructura de Pruebas

### `bibliotecaContenidos.test.ts`
Archivo principal de pruebas que incluye:

#### Tests de API
- **API de Artículos**: getArticulos, getArticuloById, createArticulo, updateArticulo, deleteArticulo
- **API de Videos**: getVideos, getVideoById, createVideo, updateVideo, deleteVideo, toggleFavorite
- **API de Archivos**: getArchivos, getArchivoById, createArchivo, updateArchivo, deleteArchivo, recordDownload
- **API de Búsqueda**: searchContent, getSearchSuggestions

#### Tests de Render
- **ContenidosArticulosPage**: Verifica que la página se renderiza correctamente
- **ContenidosVideoPage**: Verifica que la página se renderiza correctamente
- **ContenidosDescargablesPage**: Verifica que la página se renderiza correctamente
- **BuscadorContenidosPage**: Verifica que la página se renderiza correctamente

#### Tests de Verificación
- **Ausencia de Mocks**: Verifica que no hay mocks activos en producción
- **Variables de Entorno**: Verifica que se usan correctamente
- **Headers de Autorización**: Verifica que se configuran correctamente

#### Tests de Manejo de Errores
- **Errores de Red**: Manejo de errores de conexión
- **Errores 404**: Manejo de recursos no encontrados
- **Errores 401**: Manejo de errores de autorización

## Configuración

### `setup.ts`
Archivo de configuración que incluye:
- Mocks de window.location
- Mocks de console
- Mocks de react-router-dom
- Mocks de framer-motion
- Mocks de react-hot-toast
- Mocks de componentes UI

## Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas del módulo
npm test biblioteca-contenidos

# Ejecutar pruebas con coverage
npm test -- --coverage biblioteca-contenidos

# Ejecutar pruebas en modo watch
npm test -- --watch biblioteca-contenidos
```

## Criterios de Aceptación

✅ **Todos los tests pasan correctamente**
✅ **Las APIs responden con los tipos esperados**
✅ **El manejo de errores funciona en todos los casos**
✅ **No hay mocks activos en el código de producción**
✅ **Las páginas renderizan correctamente**

## Tecnologías Utilizadas

- **Vitest**: Framework de testing
- **React Testing Library**: Testing de componentes React
- **Axios Mock**: Mocking de llamadas HTTP
- **JSDOM**: Entorno DOM para testing

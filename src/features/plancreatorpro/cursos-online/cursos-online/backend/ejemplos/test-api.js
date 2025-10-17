#!/usr/bin/env node
/**
 * Script de ejemplo para probar la API de usuarios
 * Ejecutar con: node ejemplos/test-api.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Configuración de axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Colores para consola
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Función para manejar errores
function handleError(error, operation) {
  if (error.response) {
    log(`❌ Error en ${operation}:`, 'red');
    log(`   Status: ${error.response.status}`, 'red');
    log(`   Mensaje: ${error.response.data.error?.message || 'Error desconocido'}`, 'red');
  } else {
    log(`❌ Error de conexión en ${operation}: ${error.message}`, 'red');
  }
}

// 1. Verificar que el servidor esté funcionando
async function verificarServidor() {
  try {
    log('🔍 Verificando servidor...', 'blue');
    const response = await api.get('/health');
    log('✅ Servidor funcionando correctamente', 'green');
    log(`   Status: ${response.data.status}`, 'green');
    log(`   Uptime: ${response.data.uptime}s`, 'green');
    return true;
  } catch (error) {
    handleError(error, 'verificación del servidor');
    return false;
  }
}

// 2. Crear usuarios de ejemplo
async function crearUsuariosEjemplo() {
  const usuarios = [
    {
      nombre: 'Ana',
      apellido: 'García',
      email: 'ana.garcia@email.com',
      password: 'password123',
      telefono: '+34611111111',
      fechaNacimiento: '1995-03-15',
      rol: 'estudiante',
      direccion: {
        calle: 'Calle de la Paz 1',
        ciudad: 'Madrid',
        codigoPostal: '28001',
        pais: 'España'
      }
    },
    {
      nombre: 'Carlos',
      apellido: 'López',
      email: 'carlos.lopez@email.com',
      password: 'password123',
      telefono: '+34622222222',
      fechaNacimiento: '1988-07-22',
      rol: 'instructor',
      direccion: {
        calle: 'Avenida Principal 45',
        ciudad: 'Barcelona',
        codigoPostal: '08001',
        pais: 'España'
      }
    },
    {
      nombre: 'María',
      apellido: 'Rodríguez',
      email: 'maria.rodriguez@email.com',
      password: 'password123',
      telefono: '+34633333333',
      fechaNacimiento: '1992-11-08',
      rol: 'estudiante',
      direccion: {
        calle: 'Plaza Mayor 12',
        ciudad: 'Valencia',
        codigoPostal: '46001',
        pais: 'España'
      }
    }
  ];

  const usuariosCreados = [];

  for (const usuario of usuarios) {
    try {
      log(`👤 Creando usuario: ${usuario.nombre} ${usuario.apellido}`, 'blue');
      const response = await api.post('/users', usuario);
      usuariosCreados.push(response.data.data.usuario);
      log(`✅ Usuario creado: ${usuario.email}`, 'green');
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.error.message.includes('ya está registrado')) {
        log(`⚠️  Usuario ya existe: ${usuario.email}`, 'yellow');
      } else {
        handleError(error, `creación de usuario ${usuario.email}`);
      }
    }
  }

  return usuariosCreados;
}

// 3. Obtener todos los usuarios
async function obtenerUsuarios() {
  try {
    log('📋 Obteniendo todos los usuarios...', 'blue');
    const response = await api.get('/users');
    const usuarios = response.data.data.usuarios;
    log(`✅ Encontrados ${usuarios.length} usuarios`, 'green');
    
    usuarios.forEach(usuario => {
      log(`   - ${usuario.nombreCompleto} (${usuario.email}) - ${usuario.rol}`, 'green');
    });
    
    return usuarios;
  } catch (error) {
    handleError(error, 'obtener usuarios');
    return [];
  }
}

// 4. Obtener usuario por ID
async function obtenerUsuarioPorId(usuarioId) {
  try {
    log(`🔍 Obteniendo usuario por ID: ${usuarioId}`, 'blue');
    const response = await api.get(`/users/${usuarioId}`);
    const usuario = response.data.data.usuario;
    log(`✅ Usuario encontrado: ${usuario.nombreCompleto}`, 'green');
    return usuario;
  } catch (error) {
    handleError(error, `obtener usuario ${usuarioId}`);
    return null;
  }
}

// 5. Actualizar usuario
async function actualizarUsuario(usuarioId) {
  try {
    log(`✏️  Actualizando usuario: ${usuarioId}`, 'blue');
    const datosActualizacion = {
      telefono: '+34699999999',
      direccion: {
        ciudad: 'Sevilla'
      },
      preferencias: {
        idioma: 'en',
        notificaciones: {
          email: false,
          push: true
        }
      }
    };
    
    const response = await api.put(`/users/${usuarioId}`, datosActualizacion);
    log(`✅ Usuario actualizado: ${response.data.data.usuario.nombreCompleto}`, 'green');
    return response.data.data.usuario;
  } catch (error) {
    handleError(error, `actualizar usuario ${usuarioId}`);
    return null;
  }
}

// 6. Obtener estadísticas
async function obtenerEstadisticas() {
  try {
    log('📊 Obteniendo estadísticas...', 'blue');
    const response = await api.get('/users/estadisticas');
    const stats = response.data.data.estadisticas;
    
    log('✅ Estadísticas obtenidas:', 'green');
    log(`   Total usuarios: ${stats.totalUsuarios}`, 'green');
    log(`   Usuarios activos: ${stats.usuariosActivos}`, 'green');
    log(`   Usuarios inactivos: ${stats.usuariosInactivos}`, 'green');
    log(`   Usuarios recientes (30 días): ${stats.usuariosRecientes}`, 'green');
    
    if (stats.distribucionPorRol.length > 0) {
      log('   Distribución por rol:', 'green');
      stats.distribucionPorRol.forEach(rol => {
        log(`     ${rol._id}: ${rol.count}`, 'green');
      });
    }
    
    return stats;
  } catch (error) {
    handleError(error, 'obtener estadísticas');
    return null;
  }
}

// 7. Probar filtros de búsqueda
async function probarFiltros() {
  try {
    log('🔍 Probando filtros de búsqueda...', 'blue');
    
    // Buscar por rol
    log('   Buscando instructores...', 'blue');
    const instructores = await api.get('/users?rol=instructor');
    log(`   ✅ Encontrados ${instructores.data.data.usuarios.length} instructores`, 'green');
    
    // Buscar por nombre
    log('   Buscando usuarios con nombre "Ana"...', 'blue');
    const usuariosAna = await api.get('/users?nombre=Ana');
    log(`   ✅ Encontrados ${usuariosAna.data.data.usuarios.length} usuarios con nombre "Ana"`, 'green');
    
    return true;
  } catch (error) {
    handleError(error, 'probar filtros');
    return false;
  }
}

// Función principal
async function main() {
  log('🚀 Iniciando pruebas de la API de usuarios', 'blue');
  log('=' .repeat(50), 'blue');
  
  // Verificar servidor
  const servidorOk = await verificarServidor();
  if (!servidorOk) {
    log('❌ No se puede continuar sin servidor funcionando', 'red');
    return;
  }
  
  log('', 'reset');
  
  // Crear usuarios
  const usuariosCreados = await crearUsuariosEjemplo();
  log('', 'reset');
  
  // Obtener usuarios
  const todosUsuarios = await obtenerUsuarios();
  log('', 'reset');
  
  // Obtener usuario específico
  if (todosUsuarios.length > 0) {
    const primerUsuario = todosUsuarios[0];
    await obtenerUsuarioPorId(primerUsuario._id);
    log('', 'reset');
    
    // Actualizar usuario
    await actualizarUsuario(primerUsuario._id);
    log('', 'reset');
  }
  
  // Obtener estadísticas
  await obtenerEstadisticas();
  log('', 'reset');
  
  // Probar filtros
  await probarFiltros();
  log('', 'reset');
  
  log('🎉 Pruebas completadas exitosamente!', 'green');
  log('=' .repeat(50), 'green');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(error => {
    log(`❌ Error fatal: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = {
  verificarServidor,
  crearUsuariosEjemplo,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  obtenerEstadisticas,
  probarFiltros
};

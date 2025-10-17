const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

// Importar la aplicación
const app = require('../../server');

// Importar modelos
const User = require('../../models/User');
const Curso = require('../models/Curso.model');
const Modulo = require('../models/Modulo.model');
const Leccion = require('../models/Leccion.model');
const Quiz = require('../models/Quiz.model');
const QuizResult = require('../models/QuizResult.model');

describe('Cursos API Integration Tests', () => {
  let authToken;
  let testUser;
  let testCurso;
  let testModulo;
  let testLeccion;
  let testQuiz;

  beforeAll(async () => {
    // Configurar base de datos de test
    const mongoTestURI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/cursos-online-test';
    
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoTestURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  beforeEach(async () => {
    // Limpiar base de datos
    await User.deleteMany({});
    await Curso.deleteMany({});
    await Modulo.deleteMany({});
    await Leccion.deleteMany({});
    await Quiz.deleteMany({});
    await QuizResult.deleteMany({});

    // Crear usuario de prueba
    testUser = new User({
      nombre: 'Test Instructor',
      email: 'instructor@test.com',
      password: 'password123',
      rol: 'instructor',
      activo: true
    });
    await testUser.save();

    // Generar token JWT
    authToken = jwt.sign(
      { id: testUser._id },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );

    // Crear curso de prueba
    testCurso = new Curso({
      titulo: 'Curso de Prueba',
      descripcion: 'Descripción del curso de prueba',
      precio: 99.99,
      categoria: 'Programación',
      instructorId: testUser._id,
      estado: 'activo'
    });
    await testCurso.save();

    // Crear módulo de prueba
    testModulo = new Modulo({
      titulo: 'Módulo 1',
      descripcion: 'Descripción del módulo',
      orden: 1,
      cursoId: testCurso._id
    });
    await testModulo.save();

    // Crear lección de prueba
    testLeccion = new Leccion({
      titulo: 'Lección 1',
      descripcion: 'Descripción de la lección',
      tipo: 'video',
      contenido: 'Contenido de la lección',
      duracion: 30,
      orden: 1,
      moduloId: testModulo._id,
      cursoId: testCurso._id
    });
    await testLeccion.save();

    // Crear quiz de prueba
    testQuiz = new Quiz({
      titulo: 'Quiz de Prueba',
      descripcion: 'Descripción del quiz',
      duracion: 30,
      intentosPermitidos: 3,
      puntuacionMinima: 70,
      estado: 'activo',
      preguntas: [
        {
          pregunta: '¿Cuál es la capital de España?',
          tipo: 'opcion-multiple',
          opciones: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'],
          respuestaCorrecta: 'Madrid',
          puntos: 10,
          orden: 1
        }
      ],
      cursoId: testCurso._id,
      leccionId: testLeccion._id
    });
    await testQuiz.save();
  });

  afterAll(async () => {
    // Cerrar conexión a la base de datos
    await mongoose.connection.close();
  });

  describe('GET /api/cursos', () => {
    it('debe listar cursos con paginación', async () => {
      const response = await request(app)
        .get('/api/cursos')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.cursos).toHaveLength(1);
      expect(response.body.data.pagination).toBeDefined();
      expect(response.body.data.pagination.total).toBe(1);
    });

    it('debe filtrar cursos por estado', async () => {
      const response = await request(app)
        .get('/api/cursos?estado=activo')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.cursos).toHaveLength(1);
    });

    it('debe buscar cursos por título', async () => {
      const response = await request(app)
        .get('/api/cursos?search=Prueba')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.cursos).toHaveLength(1);
    });

    it('debe requerir autenticación', async () => {
      const response = await request(app)
        .get('/api/cursos')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('token');
    });
  });

  describe('POST /api/cursos', () => {
    it('debe crear curso exitosamente', async () => {
      const cursoData = {
        titulo: 'Nuevo Curso',
        descripcion: 'Descripción del nuevo curso',
        precio: 149.99,
        categoria: 'Diseño',
        duracion: '4 semanas'
      };

      const response = await request(app)
        .post('/api/cursos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(cursoData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.titulo).toBe(cursoData.titulo);
      expect(response.body.data.instructorId).toBe(testUser._id.toString());
      expect(response.body.data.estado).toBe('borrador');
    });

    it('debe validar campos requeridos', async () => {
      const response = await request(app)
        .post('/api/cursos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('requeridos');
    });

    it('debe validar longitud del título', async () => {
      const response = await request(app)
        .post('/api/cursos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          titulo: 'AB', // Muy corto
          descripcion: 'Descripción válida',
          precio: 99.99,
          categoria: 'Test'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/cursos/:id', () => {
    it('debe obtener curso específico', async () => {
      const response = await request(app)
        .get(`/api/cursos/${testCurso._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(testCurso._id.toString());
      expect(response.body.data.titulo).toBe(testCurso.titulo);
    });

    it('debe devolver 404 para curso inexistente', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/cursos/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('no encontrado');
    });

    it('debe validar formato de ID', async () => {
      const response = await request(app)
        .get('/api/cursos/invalid-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('PUT /api/cursos/:id', () => {
    it('debe actualizar curso exitosamente', async () => {
      const updateData = {
        titulo: 'Curso Actualizado',
        descripcion: 'Descripción actualizada',
        precio: 199.99
      };

      const response = await request(app)
        .put(`/api/cursos/${testCurso._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.titulo).toBe(updateData.titulo);
      expect(response.body.data.precio).toBe(updateData.precio);
    });

    it('debe validar permisos del instructor', async () => {
      // Crear otro usuario
      const otroUsuario = new User({
        nombre: 'Otro Instructor',
        email: 'otro@test.com',
        password: 'password123',
        rol: 'instructor',
        activo: true
      });
      await otroUsuario.save();

      const otroToken = jwt.sign(
        { id: otroUsuario._id },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '1h' }
      );

      const response = await request(app)
        .put(`/api/cursos/${testCurso._id}`)
        .set('Authorization', `Bearer ${otroToken}`)
        .send({ titulo: 'Curso Hackeado' })
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('permisos');
    });

    it('debe validar campos de actualización', async () => {
      const response = await request(app)
        .put(`/api/cursos/${testCurso._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          titulo: 'AB', // Muy corto
          precio: -10 // Negativo
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('DELETE /api/cursos/:id', () => {
    it('debe eliminar curso exitosamente', async () => {
      const response = await request(app)
        .delete(`/api/cursos/${testCurso._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('eliminado');

      // Verificar que el curso fue eliminado
      const cursoEliminado = await Curso.findById(testCurso._id);
      expect(cursoEliminado).toBeNull();
    });

    it('debe eliminar referencias relacionadas', async () => {
      await request(app)
        .delete(`/api/cursos/${testCurso._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Verificar que las referencias fueron eliminadas
      const modulos = await Modulo.find({ cursoId: testCurso._id });
      const lecciones = await Leccion.find({ cursoId: testCurso._id });
      const quizzes = await Quiz.find({ cursoId: testCurso._id });

      expect(modulos).toHaveLength(0);
      expect(lecciones).toHaveLength(0);
      expect(quizzes).toHaveLength(0);
    });

    it('debe validar permisos para eliminar', async () => {
      const otroUsuario = new User({
        nombre: 'Otro Instructor',
        email: 'otro@test.com',
        password: 'password123',
        rol: 'instructor',
        activo: true
      });
      await otroUsuario.save();

      const otroToken = jwt.sign(
        { id: otroUsuario._id },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '1h' }
      );

      const response = await request(app)
        .delete(`/api/cursos/${testCurso._id}`)
        .set('Authorization', `Bearer ${otroToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('permisos');
    });
  });

  describe('POST /api/cursos/upload', () => {
    it('debe subir archivo exitosamente', async () => {
      // Crear archivo temporal de prueba
      const testFilePath = path.join(__dirname, 'test-file.txt');
      fs.writeFileSync(testFilePath, 'Contenido de prueba');

      const response = await request(app)
        .post('/api/cursos/upload')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', testFilePath)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.filename).toBeDefined();
      expect(response.body.data.url).toBeDefined();

      // Limpiar archivo temporal
      fs.unlinkSync(testFilePath);
    });

    it('debe validar tipo de archivo', async () => {
      const testFilePath = path.join(__dirname, 'test-file.exe');
      fs.writeFileSync(testFilePath, 'Contenido ejecutable');

      const response = await request(app)
        .post('/api/cursos/upload')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', testFilePath)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('permitido');

      // Limpiar archivo temporal
      fs.unlinkSync(testFilePath);
    });

    it('debe validar tamaño de archivo', async () => {
      // Crear archivo grande (simulado)
      const testFilePath = path.join(__dirname, 'large-file.txt');
      const largeContent = 'x'.repeat(11 * 1024 * 1024); // 11MB
      fs.writeFileSync(testFilePath, largeContent);

      const response = await request(app)
        .post('/api/cursos/upload')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', testFilePath)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('grande');

      // Limpiar archivo temporal
      fs.unlinkSync(testFilePath);
    });

    it('debe requerir archivo', async () => {
      const response = await request(app)
        .post('/api/cursos/upload')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('archivo');
    });
  });

  describe('GET /api/cursos/:id/lecciones', () => {
    it('debe obtener lecciones del curso', async () => {
      const response = await request(app)
        .get(`/api/cursos/${testCurso._id}/lecciones`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].titulo).toBe(testLeccion.titulo);
    });
  });

  describe('POST /api/cursos/:id/lecciones', () => {
    it('debe crear lección exitosamente', async () => {
      const leccionData = {
        titulo: 'Nueva Lección',
        descripcion: 'Descripción de la lección',
        tipo: 'texto',
        contenido: 'Contenido de la lección',
        duracion: 15,
        orden: 2,
        moduloId: testModulo._id
      };

      const response = await request(app)
        .post(`/api/cursos/${testCurso._id}/lecciones`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(leccionData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.titulo).toBe(leccionData.titulo);
      expect(response.body.data.cursoId).toBe(testCurso._id.toString());
    });
  });

  describe('GET /api/cursos/:id/quizzes', () => {
    it('debe obtener quizzes del curso', async () => {
      const response = await request(app)
        .get(`/api/cursos/${testCurso._id}/quizzes`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].titulo).toBe(testQuiz.titulo);
    });
  });

  describe('POST /api/cursos/:id/quizzes', () => {
    it('debe crear quiz exitosamente', async () => {
      const quizData = {
        titulo: 'Nuevo Quiz',
        descripcion: 'Descripción del quiz',
        duracion: 20,
        intentosPermitidos: 2,
        puntuacionMinima: 80,
        estado: 'activo',
        preguntas: [
          {
            pregunta: '¿Cuál es 2+2?',
            tipo: 'opcion-multiple',
            opciones: ['3', '4', '5', '6'],
            respuestaCorrecta: '4',
            puntos: 10,
            orden: 1
          }
        ]
      };

      const response = await request(app)
        .post(`/api/cursos/${testCurso._id}/quizzes`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(quizData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.titulo).toBe(quizData.titulo);
      expect(response.body.data.cursoId).toBe(testCurso._id.toString());
    });
  });

  describe('POST /api/cursos/quizzes/:id/submit', () => {
    it('debe enviar quiz exitosamente', async () => {
      const respuestas = [
        {
          questionId: testQuiz.preguntas[0]._id.toString(),
          answerText: 'Madrid'
        }
      ];

      const response = await request(app)
        .post(`/api/cursos/quizzes/${testQuiz._id}/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ respuestas })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.aprobado).toBe(true);
      expect(response.body.data.porcentaje).toBe(100);
    });

    it('debe validar respuestas requeridas', async () => {
      const response = await request(app)
        .post(`/api/cursos/quizzes/${testQuiz._id}/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('respuestas');
    });
  });

  describe('Autenticación', () => {
    it('debe rechazar requests sin token', async () => {
      const response = await request(app)
        .get('/api/cursos')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('token');
    });

    it('debe rechazar requests con token inválido', async () => {
      const response = await request(app)
        .get('/api/cursos')
        .set('Authorization', 'Bearer token-invalido')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('inválido');
    });

    it('debe rechazar requests con token expirado', async () => {
      const tokenExpirado = jwt.sign(
        { id: testUser._id },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '-1h' } // Token expirado
      );

      const response = await request(app)
        .get('/api/cursos')
        .set('Authorization', `Bearer ${tokenExpirado}`)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('expirado');
    });
  });
});

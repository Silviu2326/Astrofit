// Configuración global para tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-for-jwt';
process.env.MONGODB_TEST_URI = 'mongodb://localhost:27017/cursos-online-test';

// Configurar timeout para tests
jest.setTimeout(30000);

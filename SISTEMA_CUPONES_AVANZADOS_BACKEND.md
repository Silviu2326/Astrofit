# Sistema de Cupones Avanzados

## Descripción
Sistema completo de gestión de cupones de descuento con funcionalidades avanzadas para e-commerce y plataformas de servicios. El sistema permite crear, gestionar y aplicar cupones con diferentes tipos de descuento, restricciones de uso, y seguimiento de métricas.

## Modelos de Datos Necesarios

### 1. Cupon (Ya existe - requiere modificaciones)
**Archivo:** `backend/src/models/Coupon.model.js`

**Campos actuales que se mantienen:**
- `code`: String (único, requerido)
- `type`: String (enum: 'percentage', 'fixed', 'free-shipping', '2x1')
- `value`: Number (requerido, min: 0)
- `status`: String (enum: 'active', 'scheduled', 'expired', 'paused')
- `description`: String
- `startDate`: Date
- `endDate`: Date
- `usageLimit`: Number
- `usageCount`: Number
- `totalDiscount`: Number
- `revenue`: Number
- `applicableTo`: String (enum: 'all', 'products', 'categories', 'plans')
- `products`: [String]
- `categories`: [String]
- `minPurchase`: Number
- `onePerCustomer`: Boolean
- `campaign`: String
- `tags`: [String]
- `uses`: [couponUseSchema]
- `active`: Boolean

**Campos a añadir/modificar:**
```javascript
// Añadir campos para el frontend
nombre: {
  type: String,
  required: [true, 'El nombre del cupón es requerido'],
  trim: true
},
clientesValidos: {
  type: String,
  enum: ['todos', 'especificos'],
  default: 'todos'
},
clientesEspecificos: {
  type: [mongoose.Schema.Types.ObjectId],
  ref: 'Cliente',
  default: []
},
productosAplicables: {
  type: [mongoose.Schema.Types.ObjectId],
  ref: 'Producto',
  default: []
},
// Modificar el tipo para incluir 'cantidadFija'
type: {
  type: String,
  enum: ['percentage', 'fixed', 'cantidadFija', 'free-shipping', '2x1'],
  required: [true, 'El tipo de cupón es requerido']
}
```

### 2. CuponUse (Ya existe - sin modificaciones)
**Archivo:** `backend/src/models/Coupon.model.js` (subdocumento)

**Campos:**
- `customerName`: String (requerido)
- `customerId`: ObjectId (ref: 'Cliente')
- `date`: Date (default: Date.now)
- `product`: String
- `discountApplied`: Number (requerido)
- `orderTotal`: Number (requerido)
- `channel`: String (enum: ['web', 'mobile', 'pos', 'other'])

### 3. Cliente (Ya existe - sin modificaciones)
**Archivo:** `backend/src/models/Cliente.model.js`

**Relación:** Los cupones pueden estar restringidos a clientes específicos.

### 4. Producto (Ya existe - sin modificaciones)
**Archivo:** `backend/src/models/Producto.model.js`

**Relación:** Los cupones pueden aplicarse a productos específicos.

## Endpoints Necesarios

### Endpoints Existentes (Ya implementados)
**Archivo:** `backend/src/controllers/cupon.controller.js`

- `GET /api/cupones` - Obtener todos los cupones
- `GET /api/cupones/:id` - Obtener cupón por ID
- `GET /api/cupones/code/:code` - Obtener cupón por código
- `POST /api/cupones` - Crear cupón
- `PUT /api/cupones/:id` - Actualizar cupón
- `DELETE /api/cupones/:id` - Eliminar cupón
- `POST /api/cupones/validate` - Validar cupón
- `POST /api/cupones/:id/apply` - Aplicar cupón
- `GET /api/cupones/expiring/soon` - Cupones por expirar
- `GET /api/cupones/stats` - Estadísticas de cupones
- `GET /api/cupones/campaign/:campaign` - Cupones por campaña
- `PATCH /api/cupones/:id/toggle-status` - Pausar/Reanudar cupón
- `PATCH /api/cupones/:id/toggle-active` - Activar/Desactivar cupón

### Endpoints Adicionales Necesarios

#### 1. Generar Código de Cupón
```javascript
// @desc    Generar código único para cupón
// @route   POST /api/cupones/generate-code
// @access  Private
export const generateCouponCode = async (req, res) => {
  try {
    const { prefix = '', length = 10 } = req.body;
    
    let code;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (!isUnique && attempts < maxAttempts) {
      code = generateRandomCode(prefix, length);
      const existing = await Coupon.findOne({ code });
      isUnique = !existing;
      attempts++;
    }
    
    if (!isUnique) {
      return res.status(500).json({
        success: false,
        error: 'No se pudo generar un código único'
      });
    }
    
    res.status(200).json({
      success: true,
      data: { code }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

#### 2. Validar Cupón con Restricciones de Cliente
```javascript
// @desc    Validar cupón con restricciones de cliente específico
// @route   POST /api/cupones/validate-customer
// @access  Public
export const validateCouponForCustomer = async (req, res) => {
  try {
    const { code, customerId, purchaseAmount } = req.body;
    
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        error: 'Cupón no encontrado'
      });
    }
    
    // Verificar si el cliente está en la lista de clientes específicos
    if (coupon.clientesValidos === 'especificos') {
      const isAllowed = coupon.clientesEspecificos.includes(customerId);
      if (!isAllowed) {
        return res.status(403).json({
          success: false,
          error: 'Este cupón no es válido para tu cuenta'
        });
      }
    }
    
    // Resto de validaciones...
    const result = coupon.applyDiscount(purchaseAmount);
    
    res.status(200).json({
      success: result.success,
      data: result.success ? {
        couponId: coupon._id,
        code: coupon.code,
        type: coupon.type,
        discount: result.discount,
        finalAmount: result.finalAmount,
        originalAmount: purchaseAmount
      } : null,
      error: result.success ? null : result.reason
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

#### 3. Obtener Cupones por Cliente
```javascript
// @desc    Obtener cupones válidos para un cliente específico
// @route   GET /api/cupones/customer/:customerId
// @access  Public
export const getCouponsForCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { active = true } = req.query;
    
    const filters = {
      active: active === 'true',
      status: 'active',
      $or: [
        { clientesValidos: 'todos' },
        { clientesEspecificos: customerId }
      ]
    };
    
    const coupons = await Coupon.find(filters)
      .select('code nombre type value description startDate endDate minPurchase')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

#### 4. Duplicar Cupón
```javascript
// @desc    Duplicar un cupón existente
// @route   POST /api/cupones/:id/duplicate
// @access  Private
export const duplicateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, code } = req.body;
    
    const originalCoupon = await Coupon.findById(id);
    
    if (!originalCoupon) {
      return res.status(404).json({
        success: false,
        error: 'Cupón original no encontrado'
      });
    }
    
    // Crear copia del cupón
    const duplicatedData = originalCoupon.toObject();
    delete duplicatedData._id;
    delete duplicatedData.createdAt;
    delete duplicatedData.updatedAt;
    delete duplicatedData.usageCount;
    delete duplicatedData.totalDiscount;
    delete duplicatedData.revenue;
    delete duplicatedData.uses;
    
    duplicatedData.nombre = nombre || `${originalCoupon.nombre} (Copia)`;
    duplicatedData.code = code || generateRandomCode();
    duplicatedData.status = 'scheduled';
    
    const duplicatedCoupon = await Coupon.create(duplicatedData);
    
    res.status(201).json({
      success: true,
      data: duplicatedCoupon
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
```

## Relaciones Entre Modelos

### 1. Cupon → Cliente
- **Tipo:** Many-to-Many (opcional)
- **Campo:** `clientesEspecificos: [ObjectId]`
- **Descripción:** Los cupones pueden estar restringidos a clientes específicos

### 2. Cupon → Producto
- **Tipo:** Many-to-Many (opcional)
- **Campo:** `productosAplicables: [ObjectId]`
- **Descripción:** Los cupones pueden aplicarse solo a productos específicos

### 3. Cupon → CuponUse
- **Tipo:** One-to-Many
- **Campo:** `uses: [couponUseSchema]`
- **Descripción:** Un cupón puede tener múltiples usos registrados

### 4. CuponUse → Cliente
- **Tipo:** Many-to-One
- **Campo:** `customerId: ObjectId`
- **Descripción:** Cada uso de cupón está asociado a un cliente

## Tecnologías Sugeridas

### Backend Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Base de Datos:** MongoDB con Mongoose
- **Validación:** Joi o express-validator
- **Autenticación:** JWT con bcrypt
- **Documentación:** Swagger/OpenAPI

### Dependencias Adicionales
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "cors": "^2.8.5",
    "helmet": "^6.0.1",
    "express-rate-limit": "^6.7.0",
    "joi": "^17.7.0",
    "moment": "^2.29.4",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.5.0",
    "supertest": "^6.3.3"
  }
}
```

### Funciones de Utilidad Necesarias

#### 1. Generador de Códigos
```javascript
// utils/couponUtils.js
export const generateRandomCode = (prefix = '', length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = prefix.toUpperCase();
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};
```

#### 2. Validador de Fechas
```javascript
export const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  
  if (start >= end) {
    return { valid: false, error: 'La fecha de inicio debe ser anterior a la fecha de fin' };
  }
  
  if (end <= now) {
    return { valid: false, error: 'La fecha de fin debe ser futura' };
  }
  
  return { valid: true };
};
```

#### 3. Calculadora de Descuentos
```javascript
export const calculateDiscount = (type, value, purchaseAmount) => {
  switch (type) {
    case 'percentage':
      return Math.min((purchaseAmount * value) / 100, purchaseAmount);
    case 'fixed':
    case 'cantidadFija':
      return Math.min(value, purchaseAmount);
    case 'free-shipping':
      return 0; // Se maneja por separado
    case '2x1':
      return purchaseAmount / 2;
    default:
      return 0;
  }
};
```

## Modificaciones Necesarias en Archivos Existentes

### 1. Actualizar Modelo Coupon
- Añadir campos `nombre`, `clientesValidos`, `clientesEspecificos`, `productosAplicables`
- Modificar enum de `type` para incluir `'cantidadFija'`
- Añadir índices para los nuevos campos

### 2. Actualizar Controlador
- Añadir validaciones para los nuevos campos
- Implementar lógica de restricciones de cliente
- Añadir endpoints adicionales

### 3. Actualizar Rutas
- Añadir nuevas rutas para funcionalidades adicionales
- Mantener compatibilidad con endpoints existentes

### 4. Middleware de Validación
```javascript
// middleware/couponValidation.js
export const validateCouponData = (req, res, next) => {
  const { nombre, tipo, valor, fechaInicio, fechaFin, clientesValidos } = req.body;
  
  if (!nombre || !tipo || valor === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Campos requeridos: nombre, tipo, valor'
    });
  }
  
  if (clientesValidos === 'especificos' && (!req.body.clientesEspecificos || req.body.clientesEspecificos.length === 0)) {
    return res.status(400).json({
      success: false,
      error: 'Debe especificar clientes cuando se selecciona "específicos"'
    });
  }
  
  next();
};
```

## Consideraciones de Seguridad

1. **Validación de Entrada:** Sanitizar y validar todos los datos de entrada
2. **Rate Limiting:** Implementar límites de uso para prevenir abuso
3. **Autenticación:** Proteger endpoints de administración
4. **Autorización:** Verificar permisos para operaciones sensibles
5. **Auditoría:** Registrar todas las operaciones importantes

## Métricas y Analytics

1. **Tasa de Conversión:** Porcentaje de cupones utilizados vs. creados
2. **ROI por Cupón:** Retorno de inversión por cupón
3. **Efectividad por Tipo:** Comparar efectividad entre tipos de descuento
4. **Análisis Temporal:** Patrones de uso por fecha/hora
5. **Segmentación:** Efectividad por segmento de cliente

Este sistema proporciona una base sólida para la gestión avanzada de cupones con todas las funcionalidades necesarias para el frontend React/TypeScript analizado.


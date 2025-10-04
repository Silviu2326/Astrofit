# 🎨 Guía de Estilos UI - Sistema de Diseño Moderno

## 📋 Tabla de Contenidos
1. [Filosofía de Diseño](#filosofía-de-diseño)
2. [Paleta de Colores](#paleta-de-colores)
3. [Tipografía](#tipografía)
4. [Espaciado y Layout](#espaciado-y-layout)
5. [Componentes Base](#componentes-base)
6. [Efectos Visuales](#efectos-visuales)
7. [Animaciones](#animaciones)
8. [Patrones de Uso](#patrones-de-uso)
9. [Ejemplos de Código](#ejemplos-de-código)

---

## 🎯 Filosofía de Diseño

### Principios Fundamentales
- **Glassmorphism**: Uso de backdrop-blur y transparencias para un look moderno
- **Sofisticación Elegante**: Diseño limpio pero con detalles visuales sutiles
- **Interactividad Fluida**: Animaciones suaves que mejoran la experiencia
- **Jerarquía Clara**: Uso de tamaños, colores y sombras para guiar la atención
- **Responsive First**: Todo debe funcionar perfecto en móvil y desktop

### Valores Clave
- ✨ **Moderno**: Uso de efectos glassmorphism y gradientes vibrantes
- 🎭 **Elegante**: Detalles sutiles sin sobrecargar
- 🚀 **Funcional**: Belleza que no sacrifica usabilidad
- 💫 **Dinámico**: Micro-interacciones que dan vida a la interfaz

---

## 🎨 Paleta de Colores

### Colores Principales

#### Indigo/Purple/Pink (Principal)
```css
/* Gradiente Hero */
from-indigo-600 via-purple-600 to-pink-600

/* Componentes destacados */
from-indigo-500 via-purple-500 to-pink-500

/* Backgrounds sutiles */
from-indigo-50 via-purple-50 to-pink-50
```

#### Verde/Emerald/Teal (Éxito, Finanzas)
```css
/* Positivo, crecimiento */
from-emerald-500 via-teal-500 to-cyan-500

/* Backgrounds */
from-emerald-50 to-teal-50
```

#### Orange/Red/Pink (Alertas, Urgencia)
```css
/* Alertas importantes */
from-orange-500 via-red-500 to-pink-500

/* Backgrounds */
from-orange-50 to-red-50
```

#### Blue/Indigo (Información)
```css
/* Informativo */
from-blue-500 via-indigo-500 to-purple-500

/* Backgrounds */
from-blue-50 to-indigo-50
```

### Colores de Estado

```css
/* Success */
text-green-600, bg-green-50, border-green-500

/* Info */
text-blue-600, bg-blue-50, border-blue-500

/* Warning */
text-orange-600, bg-orange-50, border-orange-500

/* Error */
text-red-600, bg-red-50, border-red-500
```

### Neutrales
```css
/* Backgrounds */
bg-slate-50, bg-gray-50, bg-white/80

/* Textos */
text-gray-900 (principal)
text-gray-700 (secundario)
text-gray-600 (terciario)
text-gray-500 (disabled)
```

---

## 📝 Tipografía

### Tamaños de Texto

```css
/* Headers */
text-6xl (Hero principal - 60px)
text-5xl (H1 - 48px)
text-4xl (H2 - 36px)
text-3xl (H3 - 30px)
text-2xl (H4 - 24px)
text-xl (H5 - 20px)
text-lg (H6 - 18px)

/* Body */
text-base (16px) - Default
text-sm (14px) - Secundario
text-xs (12px) - Pequeño/Metadata
```

### Pesos de Fuente
```css
font-bold (700) - Títulos importantes
font-semibold (600) - Subtítulos
font-medium (500) - Énfasis moderado
font-normal (400) - Texto regular
```

### Estilos Especiales
```css
/* Texto con gradiente */
bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400

/* Uppercase pequeño */
text-xs font-bold uppercase tracking-wider
```

---

## 📐 Espaciado y Layout

### Border Radius (Redondeado)

```css
/* Cards y contenedores principales */
rounded-3xl (24px) - PREFERIDO

/* Contenedores secundarios */
rounded-2xl (16px)

/* Elementos pequeños (botones, badges) */
rounded-xl (12px)
rounded-lg (8px)
rounded-full (círculo/pill completo)
```

### Padding

```css
/* Cards grandes */
p-8, p-6

/* Cards medianos */
p-6, p-4

/* Cards pequeños */
p-4, p-3

/* Muy compacto */
p-2, p-1.5
```

### Gap (Espaciado entre elementos)

```css
/* Secciones principales */
gap-8

/* Cards grid */
gap-6

/* Elementos relacionados */
gap-4, gap-3

/* Elementos muy cercanos */
gap-2, gap-1
```

---

## 🧩 Componentes Base

### 1. Cards (Tarjetas)

#### Card Estándar
```jsx
<div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
  {/* Decoración de fondo opcional */}
  <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

  <div className="relative z-10">
    {/* Contenido */}
  </div>
</div>
```

#### Card con Header Gradiente
```jsx
<div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
  {/* Header */}
  <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
    {/* Pattern de fondo */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}></div>
    </div>

    <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
      <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
        <Icon className="w-6 h-6" />
      </div>
      Título
    </h3>
  </div>

  {/* Body */}
  <div className="p-6">
    {/* Contenido */}
  </div>
</div>
```

### 2. Botones

#### Botón Gradiente (Call to Action)
```jsx
<button className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20">
  {/* Efecto hover */}
  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

  {/* Decoración */}
  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

  <div className="relative z-10">
    {/* Contenido */}
  </div>
</button>
```

#### Botón Ghost/Outline
```jsx
<button className="px-4 py-2 border-2 border-indigo-500 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors duration-300">
  Texto
</button>
```

### 3. Badges/Pills

```jsx
{/* Badge con gradiente de fondo */}
<div className="px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full">
  Badge
</div>

{/* Badge sutil */}
<div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
  <span className="text-sm font-bold text-purple-700">Badge</span>
</div>

{/* Badge con backdrop blur */}
<div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
  <span className="text-sm font-semibold text-white">Badge</span>
</div>
```

### 4. Progress Bars (Barras de Progreso)

```jsx
<div className="w-full bg-purple-200 rounded-full h-4 overflow-hidden shadow-inner">
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: '75%' }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 rounded-full relative"
  >
    {/* Efecto de pulso interno */}
    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
  </motion.div>
</div>
```

### 5. Inputs

```jsx
<input
  type="text"
  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
  placeholder="Escribe aquí..."
/>
```

---

## ✨ Efectos Visuales

### 1. Glassmorphism (Efecto Vidrio)

```css
/* Base */
bg-white/80 backdrop-blur-xl

/* Con border */
bg-white/80 backdrop-blur-xl border border-white/50

/* Variante oscura */
bg-gray-900/80 backdrop-blur-xl border border-white/10
```

### 2. Sombras

```css
/* Sombra estándar */
shadow-xl

/* Hover */
hover:shadow-2xl

/* Sombra de color (para botones gradiente) */
shadow-xl shadow-purple-500/50
```

### 3. Decoraciones de Fondo (Blur Orbs)

```jsx
{/* Decoración grande */}
<div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

{/* Decoración mediana */}
<div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>
```

### 4. Patrones de Fondo

```jsx
{/* Grid pattern */}
<div className="absolute inset-0 opacity-5">
  <div className="absolute inset-0" style={{
    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
    backgroundSize: '50px 50px'
  }}></div>
</div>

{/* Dots pattern */}
<div className="absolute inset-0 opacity-20">
  <div className="absolute inset-0" style={{
    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
    backgroundSize: '20px 20px'
  }}></div>
</div>
```

### 5. Efecto Shimmer (Brillo en Hover)

```jsx
<div className="relative overflow-hidden group">
  {/* Shimmer effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

  {/* Contenido */}
</div>
```

---

## 🎬 Animaciones

### 1. Framer Motion - Entrada de Elementos

```jsx
import { motion } from 'framer-motion';

{/* Fade in + Move up */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Contenido
</motion.div>

{/* Fade in + Move from left */}
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2, duration: 0.6 }}
>
  Contenido
</motion.div>

{/* Scale in */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.1, duration: 0.4 }}
>
  Contenido
</motion.div>
```

### 2. Hover Animations

```jsx
{/* Scale + Lift */}
<motion.div
  whileHover={{ scale: 1.03, y: -8 }}
  transition={{ duration: 0.3 }}
  className="..."
>
  Contenido
</motion.div>

{/* Tap feedback */}
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Botón
</motion.button>
```

### 3. Animaciones CSS (Tailwind)

```css
/* Pulse suave */
animate-pulse

/* Uso personalizado en inline style */
style={{ animationDelay: '1s' }}
```

### 4. Transiciones Suaves

```css
/* Standard */
transition-all duration-300

/* Específicas */
transition-colors duration-300
transition-transform duration-300
transition-shadow duration-300
transition-opacity duration-300
```

---

## 📚 Patrones de Uso

### Hero Section (Banner Principal)

```jsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
>
  {/* Efectos de fondo animados */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
  </div>

  {/* Grid pattern */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
      backgroundSize: '50px 50px'
    }}></div>
  </div>

  <div className="relative z-10">
    {/* Título con icono animado */}
    <div className="flex items-center gap-3 mb-4">
      <div className="relative">
        <IconComponent className="w-10 h-10 text-yellow-300 animate-pulse" />
        <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
        Título <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Destacado</span>
      </h1>
    </div>

    {/* Descripción */}
    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
      Texto con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">palabras destacadas</span>
    </p>

    {/* Indicadores pills */}
    <div className="mt-8 flex flex-wrap gap-4">
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
        <Icon className="w-5 h-5 text-green-300" />
        <span className="text-sm font-semibold text-white">Métrica</span>
      </div>
    </div>
  </div>
</motion.div>
```

### Grid de Estadísticas

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {stats.map((stat, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Icono */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8" />
        </div>

        {/* Título */}
        <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
          {stat.title}
        </p>

        {/* Valor */}
        <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
          {stat.value}
        </p>

        {/* Cambio */}
        <div className="flex items-center gap-2">
          <div className="p-1 bg-green-50 rounded-lg">
            <ArrowUpRight className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
          <span className="text-xs text-gray-500 font-medium">vs anterior</span>
        </div>

        {/* Barra decorativa */}
        <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stat.progress}%` }}
            transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  ))}
</div>
```

### Lista con Timeline

```jsx
<div className="space-y-4">
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-100 hover:shadow-md group"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-blue-400 to-indigo-600">
        <span className="text-lg">{item.avatar}</span>
      </div>

      {/* Línea vertical */}
      {index < items.length - 1 && (
        <div className="absolute left-[53px] w-0.5 h-full bg-gradient-to-b from-gray-200 to-transparent mt-12"></div>
      )}

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 leading-relaxed">
          <span className="font-bold">{item.title}</span>
          {' '}<span className="text-gray-700">{item.description}</span>
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className="p-1 rounded-lg bg-blue-50 text-blue-600">
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-xs text-gray-500 font-medium">{item.time}</span>
        </div>
      </div>
    </motion.div>
  ))}
</div>
```

---

## 🎯 Ejemplos de Código Completo

### Página de Dashboard Completa

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, TrendingUp, DollarSign, Activity,
  Sparkles, ArrowUpRight, CheckCircle
} from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Dashboard <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Moderno</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Bienvenido a tu panel de control
          </p>
        </div>
      </motion.div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-xl">
              <Users className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Total Usuarios
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              1,234
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="p-1 bg-green-50 rounded-lg">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">+12.5%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
```

---

## 📝 Checklist de Implementación

Al crear una nueva página o componente, asegúrate de:

- [ ] Usar `rounded-3xl` para cards principales
- [ ] Aplicar `bg-white/80 backdrop-blur-xl` para glassmorphism
- [ ] Agregar `border border-white/50` para definir bordes sutiles
- [ ] Incluir decoraciones de blur en backgrounds importantes
- [ ] Usar gradientes de 3 colores en headers (`from-X via-Y to-Z`)
- [ ] Agregar patrones sutiles en headers (dots o grid)
- [ ] Implementar animaciones de entrada con framer-motion
- [ ] Incluir `whileHover` para interactividad
- [ ] Usar `shadow-xl` y `hover:shadow-2xl` para profundidad
- [ ] Agregar efectos shimmer en hover para cards interactivos
- [ ] Incluir iconos en contenedores con backdrop blur
- [ ] Usar pills/badges con `rounded-full` para indicadores
- [ ] Implementar progress bars con gradientes y animación
- [ ] Agregar tooltips en elementos interactivos
- [ ] Usar `text-transparent bg-clip-text` para textos con gradiente

---

## 🚀 Tips y Mejores Prácticas

### Performance
- Usar `backdrop-blur-xl` con moderación (puede impactar performance en móviles)
- Limitar animaciones complejas simultáneas
- Usar `will-change` CSS para animaciones frecuentes

### Accesibilidad
- Mantener contraste suficiente en textos (mínimo 4.5:1)
- Agregar `aria-labels` a iconos sin texto
- Asegurar que todos los elementos interactivos sean accesibles por teclado
- Proveer feedback visual claro en estados (hover, focus, active)

### Responsive
- Siempre testear en móvil primero
- Usar `md:` y `lg:` breakpoints apropiadamente
- Ajustar `padding` y `text-size` en móvil

### Consistencia
- Usar siempre los mismos gradientes para el mismo tipo de contenido
- Mantener espaciado consistente (gap-6 entre cards, gap-4 entre elementos)
- Respetar la jerarquía de colores establecida

---

## 🎨 Recursos Adicionales

### Herramientas Útiles
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Coolors - Generador de Paletas](https://coolors.co/)

### Inspiración
- [Dribbble - UI Design](https://dribbble.com/tags/dashboard)
- [Behance - Web Design](https://www.behance.net/)

---

**Última actualización:** Diciembre 2024
**Versión:** 1.0
**Autor:** Sistema de Diseño Moderno

---

💡 **Nota**: Esta guía es un documento vivo. Actualízala conforme evolucione el diseño de la aplicación.

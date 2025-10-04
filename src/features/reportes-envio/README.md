# 📊 Reportes de Envío - Email Marketing Analytics

Módulo completo de analytics y reportes para campañas de email marketing con dashboard interactivo, gráficos de rendimiento y exportación de datos.

## 🎨 Diseño

**Gradiente:** `from-green-600 via-teal-600 to-cyan-600`

## ✨ Características

### 📈 Dashboard de Analytics
- Métricas principales en tiempo real
- Indicadores de rendimiento (KPIs)
- Tasas de apertura, clicks, entregas y rebotes
- Comparativas con promedios de industria

### 📊 Gráficos de Rendimiento
- **Tendencia Diaria**: Visualización de envíos, aperturas y clicks
- **Top Campañas**: Ranking de mejores campañas por rendimiento
- **Distribución por Dispositivos**: Mobile, Desktop, Tablet
- **Análisis Geográfico**: Estadísticas por país

### 💾 Exportación de Reportes
- **CSV**: Datos tabulares para análisis en Excel
- **PDF**: Reporte visual completo para presentaciones
- **JSON**: Datos estructurados para integración

### 💡 Insights Automáticos
- Recomendaciones basadas en datos
- Alertas de rendimiento
- Sugerencias de optimización

## 📁 Estructura

```
reportes-envio/
├── components/
│   ├── ReportesEnvio.tsx      # Componente principal
│   ├── EmailMetrics.tsx       # Tarjetas de métricas
│   └── EmailCharts.tsx        # Gráficos y visualizaciones
├── hooks/
│   └── useEmailAnalytics.ts   # Hook para datos de analytics
├── utils/
│   └── exportReports.ts       # Utilidades de exportación
├── index.ts                   # Exportaciones públicas
└── README.md                  # Documentación
```

## 🚀 Uso

### Importación Básica

```typescript
import { ReportesEnvio } from '@/features/reportes-envio';

function App() {
  return <ReportesEnvio />;
}
```

### Uso del Hook de Analytics

```typescript
import { useEmailAnalytics } from '@/features/reportes-envio';

function MiComponente() {
  const { analytics, loading, error } = useEmailAnalytics({
    start: new Date('2024-01-01'),
    end: new Date()
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Total Enviados: {analytics.metrics.totalSent}</h2>
      <h3>Tasa de Apertura: {analytics.metrics.openRate}%</h3>
    </div>
  );
}
```

### Exportación de Reportes

```typescript
import { exportToCSV, exportToPDF, exportToJSON } from '@/features/reportes-envio';

// Exportar a CSV
exportToCSV(analytics, 'reporte-mensual');

// Exportar a PDF
exportToPDF(analytics, 'reporte-mensual');

// Exportar a JSON
exportToJSON(analytics, 'reporte-mensual');
```

### Componentes Individuales

```typescript
import { EmailMetrics, EmailCharts } from '@/features/reportes-envio';

function Dashboard() {
  const { analytics } = useEmailAnalytics(dateRange);

  return (
    <div>
      <EmailMetrics metrics={analytics.metrics} />
      <EmailCharts analytics={analytics} />
    </div>
  );
}
```

## 📊 Tipos de Datos

### EmailMetrics

```typescript
interface EmailMetrics {
  totalSent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
}
```

### EmailAnalytics

```typescript
interface EmailAnalytics {
  metrics: EmailMetrics;
  dailyStats: Array<{
    date: string;
    sent: number;
    opened: number;
    clicked: number;
  }>;
  topCampaigns: Array<{
    name: string;
    sent: number;
    openRate: number;
    clickRate: number;
  }>;
  deviceStats: Array<{
    device: string;
    count: number;
    percentage: number;
  }>;
  geographicStats: Array<{
    country: string;
    count: number;
    percentage: number;
  }>;
}
```

## 🎯 Métricas Incluidas

### Métricas Principales
- **Total Enviados**: Cantidad total de emails enviados
- **Entregados**: Emails que llegaron exitosamente
- **Abiertos**: Emails que fueron abiertos
- **Clicks**: Interacciones con enlaces
- **Rebotes**: Emails que no pudieron ser entregados
- **Desuscritos**: Bajas de la lista

### Tasas de Rendimiento
- **Tasa de Entrega**: % de emails entregados exitosamente
- **Tasa de Apertura**: % de emails abiertos
- **Tasa de Clicks**: % de clicks sobre abiertos
- **Tasa de Rebote**: % de emails rebotados

## 🎨 Características Visuales

### Tarjetas de Métricas
- Iconos representativos para cada métrica
- Códigos de color por categoría
- Indicadores de tendencia (↑ positiva, ↓ negativa)
- Animaciones suaves en hover

### Gráficos
- Barras de progreso animadas
- Gradientes de color coordinados
- Tooltips informativos
- Responsive en todos los dispositivos

### Exportación
- Descarga directa de archivos
- Nombres de archivo con fecha
- Formatos múltiples (CSV, PDF, JSON)
- PDF con diseño profesional

## 📱 Responsive

El módulo está completamente optimizado para:
- 📱 **Mobile**: Diseño en columna única
- 💻 **Tablet**: Grid de 2 columnas
- 🖥️ **Desktop**: Grid de 3 columnas

## 🌙 Modo Oscuro

Soporte completo para tema oscuro con:
- Colores adaptados automáticamente
- Contraste optimizado
- Gradientes ajustados
- Bordes y sombras coherentes

## 🔧 Personalización

### Cambiar Rango de Fechas

```typescript
const [dateRange, setDateRange] = useState({
  start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Últimos 7 días
  end: new Date(),
});
```

### Personalizar Exportación

```typescript
// Cambiar nombre de archivo
exportToCSV(analytics, 'mi-reporte-personalizado');

// Añadir más datos al CSV
// Modificar exportReports.ts según necesidades
```

## 🚀 Próximas Mejoras

- [ ] Filtros avanzados por campaña
- [ ] Comparación entre períodos
- [ ] Gráficos de línea para tendencias
- [ ] Integración con APIs de email marketing
- [ ] Reportes programados automáticos
- [ ] Exportación a Excel con formato
- [ ] Dashboard en tiempo real con WebSocket
- [ ] Análisis predictivo con ML

## 📝 Notas

- Los datos actuales son simulados para demostración
- Para producción, conectar con API real de analytics
- Las tasas se calculan automáticamente
- Las exportaciones son locales (sin servidor)

## 🤝 Integración

Este módulo se integra perfectamente con:
- Sistemas de email marketing (Mailchimp, SendGrid, etc.)
- CRM y plataformas de automatización
- Herramientas de BI y analytics
- APIs REST para datos en tiempo real

---

**Desarrollado con React, TypeScript y Tailwind CSS**

# 📊 Test Results Module

Dashboard completo de resultados A/B con análisis estadístico y recomendaciones de implementación.

## Características Principales

### 📈 Dashboard de Resultados
- Vista general del test con métricas clave
- Estado del test (ganador, significativo, inconcluso, en progreso)
- Información de duración y volumen de tráfico
- Identificación automática del ganador

### 📊 Análisis Estadístico
- Cálculo de significancia estadística
- P-values y Z-scores
- Intervalos de confianza
- Tamaño de muestra mínimo
- Poder estadístico
- Progreso hacia significancia

### 🔍 Comparación de Variantes
- Comparación detallada de cada variante vs control
- Visualización de mejoras porcentuales
- Desglose de métricas (visitantes, conversiones, ingresos)
- Indicadores de significancia estadística
- Barras de progreso de tamaño de muestra

### 💡 Sistema de Recomendaciones
- Recomendaciones automáticas basadas en resultados
- Priorización por impacto y confianza
- Acciones específicas a tomar
- Resultados esperados
- Tipos de recomendaciones:
  - Implementar ganador
  - Continuar test
  - Detener test
  - Aumentar tráfico
  - Documentar aprendizajes

### 🎯 Panel de Insights
- Insights automáticos de rendimiento
- Análisis de patrones estadísticos
- Observaciones de comportamiento
- Alertas técnicas
- Categorías:
  - Performance
  - Statistical
  - Behavioral
  - Technical

## Gradiente

**Green-Emerald-Teal**: `from-green-500 via-emerald-500 to-teal-500`

## Componentes

### ResultsDashboard
Dashboard principal que orquesta todos los componentes de resultados.

```tsx
import { ResultsDashboard } from '@/features/agente-marketing/components/test-results';

<ResultsDashboard
  testResult={testResult}
  onImplementWinner={(variantId) => console.log('Implement:', variantId)}
  onContinueTest={() => console.log('Continue test')}
  onStopTest={() => console.log('Stop test')}
/>
```

### StatisticsCard
Tarjeta de estadística con gradiente personalizado.

```tsx
<StatisticsCard
  title="Total Conversions"
  value={1234}
  icon={<Target />}
  gradient="from-green-500 to-emerald-500"
  trend={{ value: 12.5, isPositive: true }}
/>
```

### VariantComparison
Comparación expandible de variante vs control.

```tsx
<VariantComparison
  comparison={comparison}
  isSelected={isSelected}
  onSelect={() => setSelected(!isSelected)}
/>
```

### RecommendationsPanel
Panel de recomendaciones automáticas.

```tsx
<RecommendationsPanel
  testResult={testResult}
  winner={winner}
/>
```

### InsightsPanel
Panel de insights y observaciones clave.

```tsx
<InsightsPanel testResult={testResult} />
```

## Utilidades Estadísticas

### Cálculo de Z-Score
```typescript
import { calculateZScore } from './statisticalUtils';

const zScore = calculateZScore(
  conversions1,
  visitors1,
  conversions2,
  visitors2
);
```

### Cálculo de P-Value
```typescript
import { calculatePValue } from './statisticalUtils';

const pValue = calculatePValue(zScore);
```

### Intervalo de Confianza
```typescript
import { calculateConfidenceInterval } from './statisticalUtils';

const [lower, upper] = calculateConfidenceInterval(
  conversions1,
  visitors1,
  conversions2,
  visitors2,
  0.95 // 95% confidence
);
```

### Significancia Estadística
```typescript
import { calculateStatisticalSignificance } from './statisticalUtils';

const significance = calculateStatisticalSignificance(
  variantMetrics,
  controlMetrics,
  0.95
);

console.log(significance.isSignificant); // true/false
console.log(significance.pValue); // 0.0234
console.log(significance.zScore); // 2.15
```

### Tamaño de Muestra Mínimo
```typescript
import { calculateMinSampleSize } from './statisticalUtils';

const minSampleSize = calculateMinSampleSize(
  0.05, // baseline conversion rate (5%)
  0.10, // minimum detectable effect (10% relative improvement)
  0.05, // alpha (5%)
  0.80  // power (80%)
);
```

### Mejora Porcentual
```typescript
import { calculateImprovement } from './statisticalUtils';

const improvement = calculateImprovement(
  variantConversionRate,
  controlConversionRate
);
```

### Verificar Tamaño de Muestra
```typescript
import { isSampleSizeSufficient } from './statisticalUtils';

const isSufficient = isSampleSizeSufficient(
  actualSampleSize,
  requiredSampleSize
);
```

### Tiempo Estimado a Significancia
```typescript
import { calculateExpectedTimeToSignificance } from './statisticalUtils';

const daysRemaining = calculateExpectedTimeToSignificance(
  currentVisitors,
  requiredVisitors,
  dailyVisitors
);
```

### Poder Estadístico
```typescript
import { calculateStatisticalPower } from './statisticalUtils';

const power = calculateStatisticalPower(
  conversions1,
  visitors1,
  conversions2,
  visitors2
);
```

## Tipos de Datos

### TestResult
```typescript
interface TestResult {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'paused';
  startDate: Date;
  endDate?: Date;
  duration: number;
  variants: VariantResult[];
  winner?: string;
  comparisons: TestComparison[];
  totalVisitors: number;
  totalConversions: number;
}
```

### VariantResult
```typescript
interface VariantResult {
  id: string;
  name: string;
  metrics: TestMetrics;
  isControl: boolean;
}
```

### TestComparison
```typescript
interface TestComparison {
  variant: VariantResult;
  control: VariantResult;
  improvement: number;
  improvementRange: [number, number];
  significance: StatisticalSignificance;
  sampleSizeReached: boolean;
  minSampleSize: number;
}
```

### Recommendation
```typescript
interface Recommendation {
  id: string;
  type: 'implement' | 'continue_testing' | 'stop_test' | 'increase_traffic';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionItems: string[];
  expectedOutcome?: string;
}
```

## Ejemplo de Uso Completo

```typescript
import { ResultsDashboard, calculateStatisticalSignificance } from './test-results';

// Datos del test
const testResult = {
  id: 'test-1',
  name: 'Homepage CTA Test',
  status: 'completed',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-01-14'),
  duration: 14 * 24 * 60 * 60 * 1000,
  totalVisitors: 10000,
  totalConversions: 450,
  variants: [
    {
      id: 'control',
      name: 'Original',
      isControl: true,
      metrics: {
        visitors: 5000,
        conversions: 200,
        conversionRate: 4.0,
        revenue: 20000
      }
    },
    {
      id: 'variant-a',
      name: 'Green Button',
      isControl: false,
      metrics: {
        visitors: 5000,
        conversions: 250,
        conversionRate: 5.0,
        revenue: 25000
      }
    }
  ],
  comparisons: [
    {
      variant: variants[1],
      control: variants[0],
      improvement: 25.0,
      improvementRange: [15.2, 34.8],
      significance: {
        pValue: 0.023,
        isSignificant: true,
        confidenceLevel: 95,
        zScore: 2.28
      },
      sampleSizeReached: true,
      minSampleSize: 4000
    }
  ]
};

// Renderizar dashboard
<ResultsDashboard
  testResult={testResult}
  onImplementWinner={(variantId) => {
    console.log('Implementing winner:', variantId);
    // Lógica para implementar el ganador
  }}
  onContinueTest={() => {
    console.log('Continuing test');
  }}
  onStopTest={() => {
    console.log('Stopping test');
  }}
/>
```

## Metodología Estadística

### Hipótesis Nula
La hipótesis nula es que no hay diferencia entre las tasas de conversión de las variantes.

### Nivel de Confianza
Por defecto se usa 95% de confianza (α = 0.05).

### Prueba de Dos Colas
Se usa una prueba de dos colas para detectar diferencias en cualquier dirección.

### Tamaño de Muestra
El tamaño de muestra mínimo se calcula para detectar un efecto mínimo del 10% con 80% de poder estadístico.

### Distribución del Tráfico
Se asume distribución equitativa del tráfico entre variantes. Se alerta si hay desequilibrios significativos.

### Duración Mínima
Se recomienda un mínimo de 7-14 días para capturar patrones semanales.

## Mejores Prácticas

1. **No Parar Tests Prematuramente**: Espera a alcanzar el tamaño de muestra mínimo
2. **Duración Adecuada**: Ejecuta tests por al menos una semana completa
3. **Conversiones Suficientes**: Apunta a 100+ conversiones por variante
4. **Distribución Equitativa**: Asegura distribución pareja del tráfico
5. **Documentar Aprendizajes**: Registra insights para futuros tests
6. **Validar Implementación**: Verifica que el test funciona correctamente antes de sacar conclusiones

## Integraciones

Este módulo se integra con:
- Sistema de A/B Testing
- Analytics
- Sistema de Implementación
- Dashboard Principal del Agente de Marketing

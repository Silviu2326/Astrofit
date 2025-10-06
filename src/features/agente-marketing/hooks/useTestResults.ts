import { useState, useCallback } from 'react';
import { TestResults, StatisticalSignificance, Recommendation, MetricComparison } from '../types/testResults';

export function useTestResults() {
  const [loading, setLoading] = useState(false);

  // Cálculo de significancia estadística usando z-test para proporciones
  const calculateSignificance = useCallback((
    controlConversions: number,
    controlSample: number,
    variantConversions: number,
    variantSample: number,
    confidenceLevel: number = 0.95
  ): StatisticalSignificance => {
    const p1 = controlConversions / controlSample;
    const p2 = variantConversions / variantSample;

    // Pooled proportion
    const pPool = (controlConversions + variantConversions) / (controlSample + variantSample);

    // Standard error
    const se = Math.sqrt(pPool * (1 - pPool) * (1/controlSample + 1/variantSample));

    // Z-score
    const z = (p2 - p1) / se;

    // P-value (two-tailed test)
    const pValue = 2 * (1 - normalCDF(Math.abs(z)));

    // Confidence interval
    const alpha = 1 - confidenceLevel;
    const isSignificant = pValue < alpha;

    // Minimum detectable effect (MDE)
    const zAlpha = inverseNormalCDF(1 - alpha/2);
    const zBeta = inverseNormalCDF(0.8); // 80% power
    const mde = (zAlpha + zBeta) * se / p1;

    // Days to significance (estimate)
    let daysToSignificance: number | undefined;
    if (!isSignificant) {
      const currentDays = 7; // Assume average test duration
      const requiredSample = Math.ceil(
        (controlSample + variantSample) * (1 / (1 - pValue / alpha))
      );
      daysToSignificance = Math.ceil(
        (requiredSample / (controlSample + variantSample)) * currentDays
      );
    }

    return {
      isSignificant,
      pValue,
      confidenceLevel,
      sampleSize: controlSample + variantSample,
      minimumDetectableEffect: mde,
      daysToSignificance
    };
  }, []);

  // Normal CDF approximation
  const normalCDF = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - p : p;
  };

  // Inverse normal CDF approximation
  const inverseNormalCDF = (p: number): number => {
    const a1 = -39.6968302866538;
    const a2 = 220.946098424521;
    const a3 = -275.928510446969;
    const a4 = 138.357751867269;
    const a5 = -30.6647980661472;
    const a6 = 2.50662827745924;

    const b1 = -54.4760987982241;
    const b2 = 161.585836858041;
    const b3 = -155.698979859887;
    const b4 = 66.8013118877197;
    const b5 = -13.2806815528857;

    const c1 = -0.00778489400243029;
    const c2 = -0.322396458041136;
    const c3 = -2.40075827716184;
    const c4 = -2.54973253934373;
    const c5 = 4.37466414146497;
    const c6 = 2.93816398269878;

    const d1 = 0.00778469570904146;
    const d2 = 0.32246712907004;
    const d3 = 2.445134137143;
    const d4 = 3.75440866190742;

    const pLow = 0.02425;
    const pHigh = 1 - pLow;

    if (p < pLow) {
      const q = Math.sqrt(-2 * Math.log(p));
      return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
             ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    } else if (p <= pHigh) {
      const q = p - 0.5;
      const r = q * q;
      return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
             (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    } else {
      const q = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
              ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
  };

  // Generar recomendaciones basadas en resultados
  const generateRecommendations = useCallback((results: TestResults): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    const { significance, improvement, variants, control } = results;

    if (significance.isSignificant && improvement > 0) {
      recommendations.push({
        type: 'implement',
        title: 'Implementar variante ganadora',
        description: `La variante ha demostrado una mejora del ${improvement.toFixed(1)}% con significancia estadística (p=${significance.pValue.toFixed(4)}).`,
        priority: 'high',
        impact: Math.min(improvement / 10, 10),
        effort: 3,
        actions: [
          'Revisar la implementación técnica de la variante',
          'Preparar plan de rollout gradual',
          'Establecer métricas de monitoreo post-implementación',
          'Documentar learnings y best practices'
        ]
      });
    } else if (!significance.isSignificant && significance.daysToSignificance) {
      recommendations.push({
        type: 'continue',
        title: 'Continuar test para alcanzar significancia',
        description: `El test requiere aproximadamente ${significance.daysToSignificance} días más para alcanzar significancia estadística.`,
        priority: 'medium',
        impact: 6,
        effort: 2,
        actions: [
          `Continuar test por ${significance.daysToSignificance} días adicionales`,
          'Monitorear métricas diariamente',
          'Verificar que no haya cambios externos que afecten resultados',
          'Revisar si el tamaño de muestra es suficiente'
        ]
      });
    } else if (improvement < 0) {
      recommendations.push({
        type: 'stop',
        title: 'Detener test y mantener control',
        description: `La variante muestra una disminución del ${Math.abs(improvement).toFixed(1)}% en performance. Se recomienda mantener la versión actual.`,
        priority: 'high',
        impact: 8,
        effort: 1,
        actions: [
          'Detener el test inmediatamente',
          'Analizar por qué la variante tuvo peor performance',
          'Documentar learnings para futuras iteraciones',
          'Considerar nuevas hipótesis basadas en los resultados'
        ]
      });
    }

    // Analizar métricas específicas
    variants.forEach(variant => {
      if (variant.ctr > control.ctr * 1.1) {
        recommendations.push({
          type: 'iterate',
          title: 'Optimizar tasa de conversión',
          description: `El CTR mejoró ${((variant.ctr / control.ctr - 1) * 100).toFixed(1)}%, pero la tasa de conversión no siguió la misma tendencia.`,
          priority: 'medium',
          impact: 7,
          effort: 5,
          actions: [
            'Analizar el embudo de conversión completo',
            'Identificar puntos de fricción post-click',
            'Optimizar landing page para mantener consistencia',
            'Realizar tests adicionales en pasos posteriores'
          ]
        });
      }

      if (variant.avgOrderValue > control.avgOrderValue * 1.15) {
        recommendations.push({
          type: 'implement',
          title: 'Aprovechar aumento en valor promedio de orden',
          description: `El AOV aumentó ${((variant.avgOrderValue / control.avgOrderValue - 1) * 100).toFixed(1)}%. Gran oportunidad de incrementar ingresos.`,
          priority: 'high',
          impact: 9,
          effort: 4,
          actions: [
            'Implementar elementos que incrementaron AOV',
            'Aplicar learnings a otros productos/categorías',
            'Considerar estrategias de upsell/cross-sell',
            'Monitorear impacto en customer lifetime value'
          ]
        });
      }
    });

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, []);

  // Comparar métricas entre variantes
  const compareMetrics = useCallback((
    control: any,
    variant: any,
    metric: string
  ): MetricComparison => {
    const controlValue = control[metric];
    const variantValue = variant[metric];
    const improvement = ((variantValue - controlValue) / controlValue) * 100;

    // Simplified confidence interval calculation
    const se = Math.sqrt((controlValue * (1 - controlValue)) / control.impressions);
    const margin = 1.96 * se; // 95% confidence

    return {
      metric,
      control: controlValue,
      variant: variantValue,
      improvement,
      isSignificant: Math.abs(improvement) > margin * 100,
      confidenceInterval: {
        lower: variantValue - margin,
        upper: variantValue + margin
      }
    };
  }, []);

  // Mock data generator (replace with real API call)
  const fetchTestResults = useCallback(async (testId: string): Promise<TestResults> => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const control = {
      id: 'control',
      name: 'Control',
      description: 'Versión actual',
      impressions: 15420,
      clicks: 1234,
      conversions: 185,
      revenue: 27750,
      ctr: 8.0,
      conversionRate: 15.0,
      avgOrderValue: 150,
      revenuePerVisitor: 1.80
    };

    const variant = {
      id: 'variant-a',
      name: 'Variante A',
      description: 'Nueva propuesta de diseño',
      impressions: 15680,
      clicks: 1568,
      conversions: 251,
      revenue: 40160,
      ctr: 10.0,
      conversionRate: 16.0,
      avgOrderValue: 160,
      revenuePerVisitor: 2.56
    };

    const significance = calculateSignificance(
      control.conversions,
      control.impressions,
      variant.conversions,
      variant.impressions
    );

    const improvement = ((variant.revenuePerVisitor - control.revenuePerVisitor) / control.revenuePerVisitor) * 100;
    const estimatedRevenueLift = (variant.revenuePerVisitor - control.revenuePerVisitor) * variant.impressions;

    const results: TestResults = {
      id: testId,
      name: 'Test Homepage Redesign',
      status: 'completed',
      startDate: '2025-09-15',
      endDate: '2025-09-29',
      variants: [variant],
      control,
      winner: variant,
      confidence: (1 - significance.pValue) * 100,
      significance,
      improvement,
      estimatedRevenueLift,
      recommendations: []
    };

    results.recommendations = generateRecommendations(results);

    setLoading(false);
    return results;
  }, [calculateSignificance, generateRecommendations]);

  return {
    fetchTestResults,
    calculateSignificance,
    generateRecommendations,
    compareMetrics,
    loading
  };
}

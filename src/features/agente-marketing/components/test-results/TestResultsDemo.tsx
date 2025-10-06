import React, { useState } from 'react';
import { ResultsDashboard } from './ResultsDashboard';
import type { TestResult, VariantResult, TestComparison } from './types';
import {
  calculateStatisticalSignificance,
  calculateConfidenceInterval,
  calculateMinSampleSize,
  calculateImprovement
} from './statisticalUtils';

/**
 * Demo component showing Test Results Dashboard with sample data
 */
export const TestResultsDemo: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string>('winning-test');

  // Sample data for different test scenarios
  const sampleTests: Record<string, TestResult> = {
    'winning-test': (() => {
      const control: VariantResult = {
        id: 'control',
        name: 'Original Version',
        isControl: true,
        metrics: {
          visitors: 5247,
          conversions: 262,
          conversionRate: 4.99,
          revenue: 26200,
          averageOrderValue: 100
        }
      };

      const variant: VariantResult = {
        id: 'variant-a',
        name: 'Green CTA Button',
        isControl: false,
        metrics: {
          visitors: 5198,
          conversions: 338,
          conversionRate: 6.50,
          revenue: 33800,
          averageOrderValue: 100
        }
      };

      const significance = calculateStatisticalSignificance(
        variant.metrics,
        control.metrics,
        0.95
      );

      const improvement = calculateImprovement(
        variant.metrics.conversionRate,
        control.metrics.conversionRate
      );

      const improvementRange = calculateConfidenceInterval(
        variant.metrics.conversions,
        variant.metrics.visitors,
        control.metrics.conversions,
        control.metrics.visitors,
        0.95
      );

      const minSampleSize = calculateMinSampleSize(
        control.metrics.conversionRate / 100,
        0.10,
        0.05,
        0.80
      );

      const comparison: TestComparison = {
        variant,
        control,
        improvement,
        improvementRange,
        significance,
        sampleSizeReached: true,
        minSampleSize
      };

      return {
        id: 'winning-test',
        name: 'Homepage CTA Button Color Test',
        status: 'completed' as const,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-14'),
        duration: 14 * 24 * 60 * 60 * 1000,
        variants: [control, variant],
        winner: variant.id,
        comparisons: [comparison],
        totalVisitors: 10445,
        totalConversions: 600
      };
    })(),

    'running-test': (() => {
      const control: VariantResult = {
        id: 'control',
        name: 'Current Pricing',
        isControl: true,
        metrics: {
          visitors: 1500,
          conversions: 75,
          conversionRate: 5.0,
          revenue: 7500
        }
      };

      const variantA: VariantResult = {
        id: 'variant-a',
        name: 'Discounted Pricing',
        isControl: false,
        metrics: {
          visitors: 1480,
          conversions: 82,
          conversionRate: 5.54,
          revenue: 8200
        }
      };

      const variantB: VariantResult = {
        id: 'variant-b',
        name: 'Premium Pricing',
        isControl: false,
        metrics: {
          visitors: 1510,
          conversions: 70,
          conversionRate: 4.64,
          revenue: 8400
        }
      };

      const minSampleSize = calculateMinSampleSize(0.05, 0.10, 0.05, 0.80);

      const comparisonA: TestComparison = {
        variant: variantA,
        control,
        improvement: calculateImprovement(variantA.metrics.conversionRate, control.metrics.conversionRate),
        improvementRange: calculateConfidenceInterval(
          variantA.metrics.conversions,
          variantA.metrics.visitors,
          control.metrics.conversions,
          control.metrics.visitors,
          0.95
        ),
        significance: calculateStatisticalSignificance(variantA.metrics, control.metrics, 0.95),
        sampleSizeReached: false,
        minSampleSize
      };

      const comparisonB: TestComparison = {
        variant: variantB,
        control,
        improvement: calculateImprovement(variantB.metrics.conversionRate, control.metrics.conversionRate),
        improvementRange: calculateConfidenceInterval(
          variantB.metrics.conversions,
          variantB.metrics.visitors,
          control.metrics.conversions,
          control.metrics.visitors,
          0.95
        ),
        significance: calculateStatisticalSignificance(variantB.metrics, control.metrics, 0.95),
        sampleSizeReached: false,
        minSampleSize
      };

      return {
        id: 'running-test',
        name: 'Pricing Page Optimization',
        status: 'running' as const,
        startDate: new Date('2024-01-20'),
        duration: 5 * 24 * 60 * 60 * 1000,
        variants: [control, variantA, variantB],
        comparisons: [comparisonA, comparisonB],
        totalVisitors: 4490,
        totalConversions: 227
      };
    })(),

    'inconclusive-test': (() => {
      const control: VariantResult = {
        id: 'control',
        name: 'Original Copy',
        isControl: true,
        metrics: {
          visitors: 5000,
          conversions: 250,
          conversionRate: 5.0
        }
      };

      const variant: VariantResult = {
        id: 'variant-a',
        name: 'Alternative Copy',
        isControl: false,
        metrics: {
          visitors: 5000,
          conversions: 255,
          conversionRate: 5.1
        }
      };

      const minSampleSize = calculateMinSampleSize(0.05, 0.10, 0.05, 0.80);

      const comparison: TestComparison = {
        variant,
        control,
        improvement: calculateImprovement(variant.metrics.conversionRate, control.metrics.conversionRate),
        improvementRange: calculateConfidenceInterval(
          variant.metrics.conversions,
          variant.metrics.visitors,
          control.metrics.conversions,
          control.metrics.visitors,
          0.95
        ),
        significance: calculateStatisticalSignificance(variant.metrics, control.metrics, 0.95),
        sampleSizeReached: true,
        minSampleSize
      };

      return {
        id: 'inconclusive-test',
        name: 'Product Description Copy Test',
        status: 'completed' as const,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-21'),
        duration: 21 * 24 * 60 * 60 * 1000,
        variants: [control, variant],
        comparisons: [comparison],
        totalVisitors: 10000,
        totalConversions: 505
      };
    })()
  };

  const currentTest = sampleTests[selectedTest];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 Test Results Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Análisis estadístico completo de resultados A/B con recomendaciones de implementación
          </p>

          {/* Test Selector */}
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedTest('winning-test')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedTest === 'winning-test'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              🏆 Clear Winner
            </button>

            <button
              onClick={() => setSelectedTest('running-test')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedTest === 'running-test'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              ⏳ In Progress
            </button>

            <button
              onClick={() => setSelectedTest('inconclusive-test')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedTest === 'inconclusive-test'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              ❓ Inconclusive
            </button>
          </div>
        </div>

        {/* Dashboard */}
        <ResultsDashboard
          testResult={currentTest}
          onImplementWinner={(variantId) => {
            console.log('Implementing winner:', variantId);
            alert(`Implementing variant: ${variantId}`);
          }}
          onContinueTest={() => {
            console.log('Continuing test');
            alert('Test will continue running');
          }}
          onStopTest={() => {
            console.log('Stopping test');
            alert('Test stopped');
          }}
        />

        {/* Features Overview */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Características del Dashboard
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                📊 Análisis Estadístico
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Cálculo de significancia estadística</li>
                <li>• P-values y Z-scores</li>
                <li>• Intervalos de confianza al 95%</li>
                <li>• Tamaño de muestra mínimo</li>
                <li>• Poder estadístico</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                🔍 Comparación de Variantes
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Comparación detallada vs control</li>
                <li>• Visualización de mejoras</li>
                <li>• Métricas de conversión y revenue</li>
                <li>• Indicadores de significancia</li>
                <li>• Progreso de tamaño de muestra</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                💡 Recomendaciones Automáticas
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Implementar ganador</li>
                <li>• Continuar test</li>
                <li>• Detener test</li>
                <li>• Aumentar tráfico</li>
                <li>• Acciones específicas</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                🎯 Panel de Insights
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Insights de rendimiento</li>
                <li>• Análisis estadístico</li>
                <li>• Patrones de comportamiento</li>
                <li>• Alertas técnicas</li>
                <li>• Recomendaciones contextuales</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

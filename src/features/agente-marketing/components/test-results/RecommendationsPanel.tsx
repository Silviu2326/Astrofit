import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  TrendingUp,
  PlayCircle,
  StopCircle,
  Users,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Target,
  Zap
} from 'lucide-react';
import { TestResult, VariantResult, Recommendation } from './types';

interface RecommendationsPanelProps {
  testResult: TestResult;
  winner?: VariantResult | null;
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({
  testResult,
  winner
}) => {
  const recommendations = useMemo(() => {
    const recs: Recommendation[] = [];

    // Check if we have a clear winner
    if (winner) {
      const winningComparison = testResult.comparisons.find(
        c => c.variant.id === winner.id
      );

      if (winningComparison && winningComparison.significance.isSignificant) {
        recs.push({
          id: 'implement-winner',
          type: 'implement',
          title: 'Implement Winning Variant',
          description: `${winner.name} has achieved statistical significance with a ${winningComparison.improvement.toFixed(1)}% improvement. This change can significantly boost your conversion rate.`,
          priority: 'high',
          confidence: winningComparison.significance.confidenceLevel,
          impact: winningComparison.improvement > 10 ? 'high' : winningComparison.improvement > 5 ? 'medium' : 'low',
          actionItems: [
            'Deploy the winning variant to 100% of traffic',
            'Monitor performance for 7-14 days after implementation',
            'Document the learnings from this test',
            'Plan follow-up tests to optimize further'
          ],
          expectedOutcome: `Expected increase in conversions: ${(testResult.totalConversions * (winningComparison.improvement / 100)).toFixed(0)} per period`
        });
      }
    }

    // Check if test needs more data
    const needsMoreData = testResult.comparisons.some(
      c => !c.sampleSizeReached
    );

    if (needsMoreData && !winner) {
      const avgProgress = testResult.comparisons.reduce(
        (sum, c) => sum + (c.variant.metrics.visitors / c.minSampleSize), 0
      ) / testResult.comparisons.length;

      recs.push({
        id: 'continue-testing',
        type: 'continue_testing',
        title: 'Continue Test to Reach Significance',
        description: `The test is ${(avgProgress * 100).toFixed(0)}% complete. Continue running to gather enough data for statistically significant results.`,
        priority: 'high',
        confidence: 95,
        impact: 'high',
        actionItems: [
          `Wait for ${(100 - avgProgress * 100).toFixed(0)}% more traffic`,
          'Ensure test implementation is stable',
          'Monitor for any technical issues',
          'Check back in 3-5 days'
        ],
        expectedOutcome: 'Achieve statistical significance to make confident decision'
      });
    }

    // Check for inconclusive results
    const hasInconclusive = testResult.comparisons.every(
      c => c.sampleSizeReached && !c.significance.isSignificant
    );

    if (hasInconclusive && !winner) {
      recs.push({
        id: 'stop-inconclusive',
        type: 'stop_test',
        title: 'No Significant Difference Detected',
        description: 'All variants have reached minimum sample size, but no significant difference was found. The variations tested may not have meaningful impact.',
        priority: 'medium',
        confidence: 90,
        impact: 'low',
        actionItems: [
          'Stop the test to save resources',
          'Analyze why variations didn\'t perform differently',
          'Consider testing more dramatic changes',
          'Review user research and feedback'
        ],
        expectedOutcome: 'Free up resources for more impactful tests'
      });
    }

    // Check if traffic is too low
    const avgDailyVisitors = testResult.totalVisitors / (testResult.duration / (1000 * 60 * 60 * 24));

    if (avgDailyVisitors < 100 && needsMoreData) {
      recs.push({
        id: 'increase-traffic',
        type: 'increase_traffic',
        title: 'Consider Increasing Traffic Allocation',
        description: `Current daily traffic (${avgDailyVisitors.toFixed(0)} visitors/day) is low. Increasing traffic allocation could help reach significance faster.`,
        priority: 'medium',
        confidence: 80,
        impact: 'medium',
        actionItems: [
          'Increase traffic allocation to this test',
          'Promote the test page through campaigns',
          'Consider running test on higher-traffic pages',
          'Evaluate if test is worth the wait time'
        ],
        expectedOutcome: 'Reach statistical significance faster'
      });
    }

    // Add optimization recommendations based on results
    if (testResult.comparisons.length > 0) {
      const bestNonSignificant = testResult.comparisons
        .filter(c => !c.significance.isSignificant && c.improvement > 0)
        .sort((a, b) => b.improvement - a.improvement)[0];

      if (bestNonSignificant && bestNonSignificant.improvement > 3) {
        recs.push({
          id: 'test-promising-variant',
          type: 'continue_testing',
          title: 'Promising Variant Detected',
          description: `${bestNonSignificant.variant.name} shows a ${bestNonSignificant.improvement.toFixed(1)}% improvement, though not yet significant. Consider running a focused test.`,
          priority: 'low',
          confidence: 70,
          impact: 'medium',
          actionItems: [
            'Create a new focused test with this variant',
            'Allocate more traffic to speed up results',
            'Combine with other winning elements',
            'Gather qualitative feedback'
          ],
          expectedOutcome: 'Validate potential improvement with higher confidence'
        });
      }
    }

    // General best practices
    recs.push({
      id: 'document-learnings',
      type: 'implement',
      title: 'Document Test Learnings',
      description: 'Capture insights from this test to inform future optimization efforts and build institutional knowledge.',
      priority: 'low',
      confidence: 100,
      impact: 'medium',
      actionItems: [
        'Document what was tested and why',
        'Record the results and statistical analysis',
        'Note any unexpected findings or behaviors',
        'Share learnings with the team'
      ],
      expectedOutcome: 'Build knowledge base for better future tests'
    });

    return recs;
  }, [testResult, winner]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Lightbulb className="w-4 h-4" />;
      case 'low': return <Target className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'implement': return <CheckCircle className="w-5 h-5" />;
      case 'continue_testing': return <PlayCircle className="w-5 h-5" />;
      case 'stop_test': return <StopCircle className="w-5 h-5" />;
      case 'increase_traffic': return <Users className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      high: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-gray-100 text-gray-700'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[impact as keyof typeof colors]}`}>
        {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Recommendations
        </h3>
        <span className="text-sm text-gray-500">
          {recommendations.length} insights
        </span>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-lg">
                {getTypeIcon(rec.type)}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {rec.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {rec.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {getImpactBadge(rec.impact)}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                      {getPriorityIcon(rec.priority)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Action Items
                  </div>
                  <ul className="space-y-1">
                    {rec.actionItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <ArrowRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {rec.expectedOutcome && (
                  <div className="mt-4 flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <Zap className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">
                        Expected Outcome
                      </div>
                      <div className="text-sm text-green-700">
                        {rec.expectedOutcome}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>Confidence:</span>
                    <span className="font-semibold text-gray-700">
                      {rec.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

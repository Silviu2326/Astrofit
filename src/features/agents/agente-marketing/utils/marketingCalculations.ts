
import { Campaign, CampaignType } from '../types/campaign';
import { CampaignAnalytics, MetricType, AnalyticsDataPoint } from '../types/analytics';
import { SocialMediaPost } from '../types/socialMedia';

/**
 * Calculates the Return on Investment (ROI) for a given campaign.
 * ROI = ((Revenue - Cost) / Cost) * 100
 * @param campaignId The ID of the campaign.
 * @param analyticsData All available analytics data.
 * @returns The ROI as a percentage, or null if data is insufficient.
 */
export function calculateROI(campaignId: string, analyticsData: CampaignAnalytics[]): number | null {
  const spendData = analyticsData.find(a => a.campaignId === campaignId && a.metric === MetricType.Spend);
  const salesData = analyticsData.find(a => a.campaignId === campaignId && a.metric === MetricType.Sales);
  const conversionsData = analyticsData.find(a => a.campaignId === campaignId && a.metric === MetricType.Conversions);

  if (!spendData || (!salesData && !conversionsData)) {
    return null; // Not enough data to calculate ROI
  }

  const totalSpend = spendData.data.reduce((sum, dp) => sum + dp.value, 0);
  let totalRevenue = 0;

  // For simplicity, let's assume each conversion has an average value or sales directly represent revenue.
  // In a real scenario, conversion value would be explicitly tracked.
  if (salesData) {
    totalRevenue = salesData.data.reduce((sum, dp) => sum + dp.value, 0);
  } else if (conversionsData) {
    // Assuming an average revenue per conversion if sales data is not direct
    const averageRevenuePerConversion = 50; // Example value for fitness challenge sign-ups
    totalRevenue = conversionsData.data.reduce((sum, dp) => sum + dp.value, 0) * averageRevenuePerConversion;
  }

  if (totalSpend === 0) {
    return totalRevenue > 0 ? Infinity : 0; // If no cost, and revenue > 0, ROI is infinite. If no cost and no revenue, ROI is 0.
  }

  return ((totalRevenue - totalSpend) / totalSpend) * 100;
}

/**
 * Calculates the Engagement Rate for a social media post or a campaign.
 * Engagement Rate = ((Likes + Comments + Shares) / Reach) * 100
 * Or for a campaign, sum of engagements / sum of reach.
 * @param posts Social media posts relevant to the calculation.
 * @param reach Total reach for the posts/campaign.
 * @returns The engagement rate as a percentage, or null if reach is zero.
 */
export function calculateEngagementRate(posts: SocialMediaPost[], reach: number): number | null {
  if (reach === 0) {
    return null;
  }

  const totalEngagements = posts.reduce((sum, post) => {
    const likes = post.likes || 0;
    const comments = post.comments || 0;
    const shares = post.shares || 0;
    return sum + likes + comments + shares;
  }, 0);

  return (totalEngagements / reach) * 100;
}

/**
 * Calculates the Conversion Rate for a campaign.
 * Conversion Rate = (Conversions / Clicks or Impressions) * 100
 * @param campaignId The ID of the campaign.
 * @param analyticsData All available analytics data.
 * @param baseMetric The base metric to use for conversion rate (Clicks or Impressions).
 * @returns The conversion rate as a percentage, or null if base metric data is insufficient.
 */
export function calculateConversionRate(
  campaignId: string,
  analyticsData: CampaignAnalytics[],
  baseMetric: MetricType.Clicks | MetricType.Impressions
): number | null {
  const conversionsData = analyticsData.find(a => a.campaignId === campaignId && a.metric === MetricType.Conversions);
  const baseMetricData = analyticsData.find(a => a.campaignId === campaignId && a.metric === baseMetric);

  if (!conversionsData || !baseMetricData) {
    return null; // Not enough data
  }

  const totalConversions = conversionsData.data.reduce((sum, dp) => sum + dp.value, 0);
  const totalBaseMetric = baseMetricData.data.reduce((sum, dp) => sum + dp.value, 0);

  if (totalBaseMetric === 0) {
    return totalConversions > 0 ? Infinity : 0; // If no base metric, and conversions > 0, rate is infinite. If no base metric and no conversions, rate is 0.
  }

  return (totalConversions / totalBaseMetric) * 100;
}

/**
 * Aggregates a specific metric for a campaign over a period.
 * @param campaignId The ID of the campaign.
 * @param metric The metric type to aggregate.
 * @param analyticsData All available analytics data.
 * @returns The total aggregated value for the metric.
 */
export function getAggregatedMetric(campaignId: string, metric: MetricType, analyticsData: CampaignAnalytics[]): number {
  const data = analyticsData.find(a => a.campaignId === campaignId && a.metric === metric);
  return data ? data.data.reduce((sum, dp) => sum + dp.value, 0) : 0;
}


import { Campaign, mockCampaigns } from '../types/campaign';
import { CampaignAnalytics, mockAnalytics, MetricType } from '../types/analytics';
import { SocialMediaPost, mockSocialMediaPosts } from '../types/socialMedia';
import { calculateROI, calculateEngagementRate, calculateConversionRate, getAggregatedMetric } from './marketingCalculations';

export interface CampaignReport {
  campaign: Campaign;
  summary: {
    totalSpend: number;
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    totalSales: number;
    roi: number | null;
    conversionRateClicks: number | null;
    conversionRateImpressions: number | null;
    engagementRate: number | null;
  };
  detailedAnalytics: CampaignAnalytics[];
  relatedPosts: SocialMediaPost[];
}

/**
 * Generates a comprehensive marketing report for a given campaign.
 * @param campaignId The ID of the campaign to generate the report for.
 * @param campaigns All available campaign data.
 * @param analyticsData All available analytics data.
 * @param socialMediaPosts All available social media post data.
 * @returns A detailed CampaignReport object, or null if the campaign is not found.
 */
export function generateCampaignReport(
  campaignId: string,
  campaigns: Campaign[],
  analyticsData: CampaignAnalytics[],
  socialMediaPosts: SocialMediaPost[]
): CampaignReport | null {
  const campaign = campaigns.find(c => c.id === campaignId);
  if (!campaign) {
    return null;
  }

  const campaignAnalytics = analyticsData.filter(a => a.campaignId === campaignId);
  const relatedPosts = socialMediaPosts.filter(p => p.campaignId === campaignId);

  const totalSpend = getAggregatedMetric(campaignId, MetricType.Spend, analyticsData);
  const totalImpressions = getAggregatedMetric(campaignId, MetricType.Impressions, analyticsData);
  const totalClicks = getAggregatedMetric(campaignId, MetricType.Clicks, analyticsData);
  const totalConversions = getAggregatedMetric(campaignId, MetricType.Conversions, analyticsData);
  const totalSales = getAggregatedMetric(campaignId, MetricType.Sales, analyticsData);

  const roi = calculateROI(campaignId, analyticsData);
  const conversionRateClicks = calculateConversionRate(campaignId, analyticsData, MetricType.Clicks);
  const conversionRateImpressions = calculateConversionRate(campaignId, analyticsData, MetricType.Impressions);
  const engagementRate = calculateEngagementRate(relatedPosts, totalImpressions); // Using impressions as reach proxy

  return {
    campaign,
    summary: {
      totalSpend,
      totalImpressions,
      totalClicks,
      totalConversions,
      totalSales,
      roi,
      conversionRateClicks,
      conversionRateImpressions,
      engagementRate,
    },
    detailedAnalytics: campaignAnalytics,
    relatedPosts,
  };
}

/**
 * Exports a campaign report to a JSON string.
 * @param report The CampaignReport object to export.
 * @returns A JSON string representation of the report.
 */
export function exportReportToJson(report: CampaignReport): string {
  return JSON.stringify(report, null, 2);
}

/**
 * Exports a campaign report to a basic Markdown string.
 * @param report The CampaignReport object to export.
 * @returns A Markdown string representation of the report.
 */
export function exportReportToMarkdown(report: CampaignReport): string {
  let markdown = `# Informe de Campaña: ${report.campaign.name}\n\n`;
  markdown += `## Resumen de la Campaña\n`;
  markdown += `- **ID de Campaña:** ${report.campaign.id}\n`;
  markdown += `- **Tipo:** ${report.campaign.type}\n`;
  markdown += `- **Estado:** ${report.campaign.status}\n`;
  markdown += `- **Fechas:** ${report.campaign.startDate.toLocaleDateString()} - ${report.campaign.endDate.toLocaleDateString()}\n`;
  markdown += `- **Presupuesto:** $${report.campaign.budget.toFixed(2)}\n`;
  markdown += `- **Audiencia Objetivo:** ${report.campaign.targetAudience}\n`;
  markdown += `- **Objetivos:** ${report.campaign.goals.join(', ')}\n\n`;

  markdown += `## Métricas Clave\n`;
  markdown += `- **Gasto Total:** $${report.summary.totalSpend.toFixed(2)}\n`;
  markdown += `- **Impresiones Totales:** ${report.summary.totalImpressions.toLocaleString()}\n`;
  markdown += `- **Clics Totales:** ${report.summary.totalClicks.toLocaleString()}\n`;
  markdown += `- **Conversiones Totales:** ${report.summary.totalConversions.toLocaleString()}\n`;
  markdown += `- **Ventas Totales:** $${report.summary.totalSales.toFixed(2)}\n`;
  markdown += `- **ROI:** ${report.summary.roi !== null ? report.summary.roi.toFixed(2) + '%' : 'N/A'}\n`;
  markdown += `- **Tasa de Conversión (Clics):** ${report.summary.conversionRateClicks !== null ? report.summary.conversionRateClicks.toFixed(2) + '%' : 'N/A'}\n`;
  markdown += `- **Tasa de Conversión (Impresiones):** ${report.summary.conversionRateImpressions !== null ? report.summary.conversionRateImpressions.toFixed(2) + '%' : 'N/A'}\n`;
  markdown += `- **Tasa de Engagement:** ${report.summary.engagementRate !== null ? report.summary.engagementRate.toFixed(2) + '%' : 'N/A'}\n\n`;

  if (report.relatedPosts.length > 0) {
    markdown += `## Publicaciones en Redes Sociales Relacionadas\n`;
    report.relatedPosts.forEach(post => {
      markdown += `### ${post.platform} Post (ID: ${post.id})\n`;
      markdown += `- **Tipo:** ${post.type}\n`;
      markdown += `- **Contenido:** ${post.content.substring(0, 50)}...\n`;
      markdown += `- **Caption:** ${post.caption.substring(0, 100)}...\n`;
      markdown += `- **Likes:** ${post.likes || 0}, **Comentarios:** ${post.comments || 0}, **Compartidos:** ${post.shares || 0}\n\n`;
    });
  }

  markdown += `## Análisis Detallado de Métricas\n`;
  report.detailedAnalytics.forEach(analytic => {
    markdown += `### Métrica: ${analytic.metric}\n`;
    analytic.data.forEach(dp => {
      markdown += `- ${dp.date.toLocaleDateString()}: ${dp.value.toLocaleString()}\n`;
    });
    markdown += '\n';
  });

  return markdown;
}

// Example usage (for demonstration/testing)
export function generateAndExportExampleReport(): string | null {
  const exampleCampaignId = 'camp-001';
  const report = generateCampaignReport(exampleCampaignId, mockCampaigns, mockAnalytics, mockSocialMediaPosts);
  if (report) {
    return exportReportToMarkdown(report);
  }
  return null;
}

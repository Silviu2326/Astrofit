
export enum MetricType {
  Impressions = 'Impressions',
  Reach = 'Reach',
  Clicks = 'Clicks',
  Conversions = 'Conversions',
  Spend = 'Spend',
  ROI = 'ROI',
  EngagementRate = 'EngagementRate',
  ConversionRate = 'ConversionRate',
  Leads = 'Leads',
  Sales = 'Sales',
}

export interface AnalyticsDataPoint {
  date: Date;
  value: number;
}

export interface CampaignAnalytics {
  campaignId: string;
  metric: MetricType;
  data: AnalyticsDataPoint[];
}

export const mockAnalytics: CampaignAnalytics[] = [
  {
    campaignId: 'camp-001',
    metric: MetricType.Impressions,
    data: [
      { date: new Date('2025-10-01'), value: 10000 },
      { date: new Date('2025-10-02'), value: 12000 },
      { date: new Date('2025-10-03'), value: 15000 },
      { date: new Date('2025-10-04'), value: 18000 },
      { date: new Date('2025-10-05'), value: 20000 },
    ],
  },
  {
    campaignId: 'camp-001',
    metric: MetricType.Clicks,
    data: [
      { date: new Date('2025-10-01'), value: 150 },
      { date: new Date('2025-10-02'), value: 200 },
      { date: new Date('2025-10-03'), value: 280 },
      { date: new Date('2025-10-04'), value: 350 },
      { date: new Date('2025-10-05'), value: 420 },
    ],
  },
  {
    campaignId: 'camp-001',
    metric: MetricType.Conversions,
    data: [
      { date: new Date('2025-10-01'), value: 5 },
      { date: new Date('2025-10-02'), value: 8 },
      { date: new Date('2025-10-03'), value: 12 },
      { date: new Date('2025-10-04'), value: 15 },
      { date: new Date('2025-10-05'), value: 18 },
    ],
  },
  {
    campaignId: 'camp-001',
    metric: MetricType.Spend,
    data: [
      { date: new Date('2025-10-01'), value: 50 },
      { date: new Date('2025-10-02'), value: 60 },
      { date: new Date('2025-10-03'), value: 75 },
      { date: new Date('2025-10-04'), value: 80 },
      { date: new Date('2025-10-05'), value: 90 },
    ],
  },
  {
    campaignId: 'camp-002',
    metric: MetricType.Sales,
    data: [
      { date: new Date('2025-09-15'), value: 10 },
      { date: new Date('2025-09-16'), value: 12 },
      { date: new Date('2025-09-17'), value: 8 },
    ],
  },
  {
    campaignId: 'camp-002',
    metric: MetricType.Spend,
    data: [
      { date: new Date('2025-09-15'), value: 100 },
      { date: new Date('2025-09-16'), value: 120 },
      { date: new Date('2025-09-17'), value: 80 },
    ],
  },
];

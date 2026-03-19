// ── MOCK DATA ─────────────────────────────────────────────────────────────────
// Backend integration point: replace all exports with API calls to your
// content analytics service (e.g. GET /api/analytics/dashboard?filters=...)

export const CHANNELS = ['Blog', 'Social Media', 'Email', 'Video', 'Podcast', 'Press'];
export const PLATFORMS = ['WordPress', 'HubSpot', 'LinkedIn', 'YouTube', 'Mailchimp', 'Spotify'];
export const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Portuguese'];
export const OUTPUT_TYPES = ['Article', 'Infographic', 'Video Script', 'Newsletter', 'Short-form', 'Press Release'];
export const INPUT_TYPES = ['Brief', 'Research Request', 'Repurpose', 'Campaign Brief', 'Ad Hoc'];
export const USERS = ['Mara Okonkwo', 'Theo Vasquez', 'Priya Nair', 'James Holloway', 'Selin Arslan', 'Dmitri Volkov', 'Camille Dubois', 'Ravi Shankar'];
export const PUBLISHED_STATUSES = ['Published', 'Unpublished'];

export type FilterState = {
  dateRange: string;
  channel: string;
  platform: string;
  language: string;
  user: string;
  outputType: string;
  publishedStatus: string;
};

export type DrilldownTarget = {
  dimension: string;
  value: string;
} | null;

// ── KPI DATA ─────────────────────────────────────────────────────────────────
export type KPIData = {
  publishRate: number;
  publishRateDelta: number;
  avgPublishingDeclaration: number; // days
  avgPublishingDeclarationDelta: number;
  avgCreationDeclaration: number; // days
  avgCreationDeclarationDelta: number;
  efficiencyRatio: number; // creation_time / publishing_time
  efficiencyRatioDelta: number;
  totalInput: number;
  totalOutput: number;
  totalPublished: number;
  totalUnpublished: number;
};

export const BASE_KPI: KPIData = {
  publishRate: 74.8,
  publishRateDelta: 4.2,
  avgPublishingDeclaration: 3.4,
  avgPublishingDeclarationDelta: -0.6,
  avgCreationDeclaration: 5.1,
  avgCreationDeclarationDelta: -1.1,
  efficiencyRatio: 0.67,
  efficiencyRatioDelta: 0.08,
  totalInput: 1284,
  totalOutput: 960,
  totalPublished: 718,
  totalUnpublished: 242,
};

// Per-segment KPI overrides (when clicking chart segments)
export const SEGMENT_KPI_OVERRIDES: Record<string, Partial<KPIData>> = {
  'Blog': { publishRate: 82.3, publishRateDelta: 6.1, avgPublishingDeclaration: 2.8, avgCreationDeclaration: 4.2, totalInput: 312, totalOutput: 257, totalPublished: 211, totalUnpublished: 46 },
  'Social Media': { publishRate: 91.5, publishRateDelta: 2.3, avgPublishingDeclaration: 1.2, avgCreationDeclaration: 2.1, totalInput: 408, totalOutput: 373, totalPublished: 341, totalUnpublished: 32 },
  'Email': { publishRate: 68.4, publishRateDelta: -3.2, avgPublishingDeclaration: 4.1, avgCreationDeclaration: 6.3, totalInput: 187, totalOutput: 128, totalPublished: 88, totalUnpublished: 40 },
  'Video': { publishRate: 54.7, publishRateDelta: -8.4, avgPublishingDeclaration: 7.2, avgCreationDeclaration: 12.4, totalInput: 203, totalOutput: 111, totalPublished: 61, totalUnpublished: 50 },
  'Podcast': { publishRate: 71.2, publishRateDelta: 1.8, avgPublishingDeclaration: 3.9, avgCreationDeclaration: 5.8, totalInput: 124, totalOutput: 88, totalPublished: 63, totalUnpublished: 25 },
  'Press': { publishRate: 60.1, publishRateDelta: -2.1, avgPublishingDeclaration: 5.6, avgCreationDeclaration: 8.2, totalInput: 50, totalOutput: 30, totalPublished: 18, totalUnpublished: 12 },
  'WordPress': { publishRate: 79.4, publishRateDelta: 5.2, avgPublishingDeclaration: 2.6, avgCreationDeclaration: 4.4, totalInput: 445, totalOutput: 353, totalPublished: 280, totalUnpublished: 73 },
  'HubSpot': { publishRate: 72.1, publishRateDelta: 3.1, avgPublishingDeclaration: 3.8, avgCreationDeclaration: 5.6, totalInput: 198, totalOutput: 143, totalPublished: 103, totalUnpublished: 40 },
  'Article': { publishRate: 83.2, publishRateDelta: 7.4, avgPublishingDeclaration: 2.4, avgCreationDeclaration: 3.9, totalInput: 289, totalOutput: 241, totalPublished: 200, totalUnpublished: 41 },
  'Video Script': { publishRate: 51.3, publishRateDelta: -9.2, avgPublishingDeclaration: 8.1, avgCreationDeclaration: 14.2, totalInput: 156, totalOutput: 80, totalPublished: 41, totalUnpublished: 39 },
};

// ── INPUT DISTRIBUTION ────────────────────────────────────────────────────────
export const inputByChannel = [
  { name: 'Social Media', count: 408, color: '#0f766e' },
  { name: 'Blog', count: 312, color: '#0d9488' },
  { name: 'Video', count: 203, color: '#14b8a6' },
  { name: 'Email', count: 187, color: '#2dd4bf' },
  { name: 'Podcast', count: 124, color: '#5eead4' },
  { name: 'Press', count: 50, color: '#99f6e4' },
];

export const inputByType = [
  { name: 'Campaign Brief', count: 387, color: '#0f766e' },
  { name: 'Brief', count: 341, color: '#0d9488' },
  { name: 'Repurpose', count: 289, color: '#14b8a6' },
  { name: 'Research Request', count: 198, color: '#2dd4bf' },
  { name: 'Ad Hoc', count: 69, color: '#5eead4' },
];

export const inputByPlatform = [
  { name: 'WordPress', count: 445, color: '#0f766e' },
  { name: 'LinkedIn', count: 312, color: '#0d9488' },
  { name: 'YouTube', count: 198, color: '#14b8a6' },
  { name: 'Mailchimp', count: 187, color: '#2dd4bf' },
  { name: 'HubSpot', count: 98, color: '#5eead4' },
  { name: 'Spotify', count: 44, color: '#99f6e4' },
];

// ── OUTPUT DISTRIBUTION ───────────────────────────────────────────────────────
export const outputByChannel = [
  { name: 'Social Media', published: 341, unpublished: 32, total: 373, color: '#0f766e' },
  { name: 'Blog', published: 211, unpublished: 46, total: 257, color: '#7c3aed' },
  { name: 'Email', published: 88, unpublished: 40, total: 128, color: '#dc2626' },
  { name: 'Video', published: 61, unpublished: 50, total: 111, color: '#d97706' },
  { name: 'Podcast', published: 63, unpublished: 25, total: 88, color: '#0891b2' },
  { name: 'Press', published: 18, unpublished: 12, total: 30, color: '#be185d' },
];

export const outputByType = [
  { name: 'Short-form', published: 298, unpublished: 28, total: 326, color: '#0f766e' },
  { name: 'Article', published: 200, unpublished: 41, total: 241, color: '#7c3aed' },
  { name: 'Newsletter', published: 103, unpublished: 38, total: 141, color: '#0891b2' },
  { name: 'Video Script', published: 41, unpublished: 39, total: 80, color: '#dc2626' },
  { name: 'Infographic', published: 52, unpublished: 24, total: 76, color: '#d97706' },
  { name: 'Press Release', published: 24, unpublished: 72, total: 96, color: '#be185d' },
];

export const outputByPlatform = [
  { name: 'WordPress', published: 280, unpublished: 73, total: 353, color: '#0f766e' },
  { name: 'LinkedIn', published: 241, unpublished: 31, total: 272, color: '#7c3aed' },
  { name: 'Mailchimp', published: 88, unpublished: 40, total: 128, color: '#0891b2' },
  { name: 'YouTube', published: 61, unpublished: 50, total: 111, color: '#dc2626' },
  { name: 'HubSpot', published: 24, unpublished: 22, total: 46, color: '#d97706' },
  { name: 'Spotify', published: 24, unpublished: 26, total: 50, color: '#be185d' },
];

// ── TREND DATA ────────────────────────────────────────────────────────────────
export type TrendPoint = {
  date: string;
  input: number;
  output: number;
  published: number;
  publishRate: number;
};

export const generateTrendData = (weeks = 13): TrendPoint[] => {
  const baseInput = [98, 112, 87, 134, 119, 145, 128, 156, 141, 167, 143, 178, 162];
  const baseOutput = [71, 84, 63, 98, 88, 112, 97, 124, 108, 138, 112, 149, 131];
  const basePublished = [52, 63, 44, 74, 66, 87, 73, 96, 82, 108, 86, 119, 102];

  const now = new Date('2026-03-13');
  return Array.from({ length: weeks }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (weeks - 1 - i) * 7);
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return {
      date: label,
      input: baseInput[i] ?? 100,
      output: baseOutput[i] ?? 75,
      published: basePublished[i] ?? 58,
      publishRate: Math.round(((basePublished[i] ?? 58) / (baseOutput[i] ?? 75)) * 1000) / 10,
    };
  });
};

export const TREND_DATA = generateTrendData();

// Drill-down trend per segment
export const getDrilldownTrend = (segment: string): TrendPoint[] => {
  const multipliers: Record<string, number> = {
    'Blog': 0.28, 'Social Media': 0.36, 'Email': 0.15, 'Video': 0.17, 'Podcast': 0.10, 'Press': 0.04,
    'WordPress': 0.40, 'LinkedIn': 0.28, 'YouTube': 0.17, 'Mailchimp': 0.15, 'HubSpot': 0.09, 'Spotify': 0.04,
    'Article': 0.26, 'Short-form': 0.34, 'Newsletter': 0.14, 'Video Script': 0.09, 'Infographic': 0.08, 'Press Release': 0.09,
  };
  const m = multipliers[segment] ?? 0.15;
  return TREND_DATA.map(d => ({
    ...d,
    input: Math.round(d.input * m),
    output: Math.round(d.output * m),
    published: Math.round(d.published * m),
    publishRate: d.publishRate + (Math.random() * 6 - 3),
  }));
};

// ── 2D INTERACTION DATA ────────────────────────────────────────────────────────
export type HeatmapCell = {
  dim1: string;
  dim2: string;
  value: number;
  publishRate?: number;
};

export const get2DData = (dim1: string, dim2: string): HeatmapCell[] => {
  const dim1Values: Record<string, string[]> = {
    'Channel': CHANNELS,
    'Language': LANGUAGES,
    'User': USERS.slice(0, 6),
    'Output Type': OUTPUT_TYPES,
    'Platform': PLATFORMS,
    'Published Status': PUBLISHED_STATUSES,
  };
  const dim2Values = dim1Values;

  const d1 = dim1Values[dim1] ?? CHANNELS;
  const d2 = dim2Values[dim2] ?? PLATFORMS;

  const seed = dim1.charCodeAt(0) + dim2.charCodeAt(0);
  return d1.flatMap((v1, i) =>
    d2.map((v2, j) => {
      const base = ((seed + i * 7 + j * 13) % 80) + 20;
      return {
        dim1: v1,
        dim2: v2,
        value: base,
        publishRate: Math.min(98, Math.max(35, base + (i - j) * 4)),
      };
    })
  );
};

// ── DRILL-DOWN DATA ───────────────────────────────────────────────────────────
export type TopUser = {
  name: string;
  output: number;
  published: number;
  publishRate: number;
  avatar: string;
};

export const getDrilldownUsers = (segment: string): TopUser[] => {
  const baseUsers: TopUser[] = [
    { name: 'Mara Okonkwo', output: 87, published: 74, publishRate: 85.1, avatar: 'MO' },
    { name: 'Priya Nair', output: 72, published: 58, publishRate: 80.6, avatar: 'PN' },
    { name: 'Theo Vasquez', output: 68, published: 49, publishRate: 72.1, avatar: 'TV' },
    { name: 'Camille Dubois', output: 61, published: 41, publishRate: 67.2, avatar: 'CD' },
    { name: 'Ravi Shankar', output: 54, published: 34, publishRate: 63.0, avatar: 'RS' },
  ];
  const segHash = segment.length;
  return baseUsers.map((u, i) => ({
    ...u,
    output: Math.round(u.output * (0.15 + ((segHash + i) % 5) * 0.04)),
    published: Math.round(u.published * (0.15 + ((segHash + i) % 5) * 0.04)),
  }));
};

export const getDrilldownOutputTypes = (segment: string) => {
  const segHash = segment.length % 3;
  return OUTPUT_TYPES.map((t, i) => ({
    name: t,
    value: Math.max(5, 40 - i * 5 + ((segHash + i) % 4) * 8),
    color: ['#0f766e', '#7c3aed', '#0891b2', '#dc2626', '#d97706', '#be185d'][i],
  }));
};
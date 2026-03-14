'use client';

import { useState, useCallback } from 'react';
import DashboardTopbar from './DashboardTopbar';
import FiltersPanel from './FiltersPanel';
import KPICards from './KPICards';
import InputDistribution from './InputDistribution';
import OutputDistribution from './OutputDistribution';
import TrendAnalysis from './TrendAnalysis';
import TwoDimensionAnalysis from './TwoDimensionalAnalysis';
import DrilldownPanel from './DrilldownPanel';
import {
  BASE_KPI,
  SEGMENT_KPI_OVERRIDES,
  type FilterState,
  type KPIData,
  type DrilldownTarget,
} from './mockData';
import { Toaster } from 'sonner';

const DEFAULT_FILTERS: FilterState = {
  dateRange: 'last_90d',
  channel: 'all',
  platform: 'all',
  language: 'all',
  user: 'all',
  outputType: 'all',
  publishedStatus: 'all',
};

export default function DashboardShell() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activeKPI, setActiveKPI] = useState<KPIData>(BASE_KPI);
  const [drilldown, setDrilldown] = useState<DrilldownTarget>(null);
  const [highlightSegment, setHighlightSegment] = useState<string | null>(null);

  const handleFilterChange = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Reset drilldown when filters change
    setDrilldown(null);
    setHighlightSegment(null);
    // Backend integration point: re-fetch dashboard data with new filters
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setActiveKPI(BASE_KPI);
    setDrilldown(null);
    setHighlightSegment(null);
  }, []);

  const handleSegmentClick = useCallback((dimension: string, value: string) => {
    // Merge override KPIs with base KPIs for the selected segment
    const override = SEGMENT_KPI_OVERRIDES[value] ?? {};
    setActiveKPI({ ...BASE_KPI, ...override });
    setDrilldown({ dimension, value });
    setHighlightSegment(value);
    // Backend integration point: fetch segment-specific analytics
  }, []);

  const handleCloseDrilldown = useCallback(() => {
    setDrilldown(null);
    setHighlightSegment(null);
    setActiveKPI(BASE_KPI);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="bottom-right" richColors />
      <DashboardTopbar filters={filters} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />

      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-14 py-5 space-y-5">
        {/* Filters Panel */}
        <FiltersPanel filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} />

        {/* KPI Cards */}
        <KPICards kpi={activeKPI} highlightSegment={highlightSegment} />

        {/* Input + Output Distribution side by side */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <InputDistribution
            filters={filters}
            activeSegment={highlightSegment}
            onSegmentClick={handleSegmentClick}
          />
          <OutputDistribution
            filters={filters}
            activeSegment={highlightSegment}
            onSegmentClick={handleSegmentClick}
          />
        </div>

        {/* Trend Analysis */}
        <TrendAnalysis filters={filters} drilldown={drilldown} />

        {/* 2D Interaction Analysis */}
        <TwoDimensionAnalysis onSegmentClick={handleSegmentClick} />

        {/* Drill-down Panel */}
        {drilldown && (
          <DrilldownPanel
            target={drilldown}
            onClose={handleCloseDrilldown}
          />
        )}
      </main>
    </div>
  );
}
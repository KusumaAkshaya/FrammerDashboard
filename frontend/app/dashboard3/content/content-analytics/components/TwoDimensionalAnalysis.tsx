'use client';

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,  } from 'recharts';
import Icon from '../../../components/ui/AppIcon';
import { get2DData } from './mockData';

type Props = {
  onSegmentClick: (dimension: string, value: string) => void;
};

type VizMode = 'heatmap' | 'stacked' | 'grouped';

const DIMENSIONS = ['Channel', 'Language', 'User', 'Output Type', 'Platform', 'Published Status'];

const HEATMAP_COLORS = [
  '#f0fdf4', '#bbf7d0', '#86efac', '#4ade80', '#22c55e',
  '#16a34a', '#15803d', '#166534', '#14532d', '#0f3d22',
];

function getHeatmapColor(value: number, min: number, max: number): string {
  const pct = (value - min) / (max - min);
  const idx = Math.min(Math.floor(pct * HEATMAP_COLORS.length), HEATMAP_COLORS.length - 1);
  return HEATMAP_COLORS[idx];
}

function getTextColor(value: number, min: number, max: number): string {
  const pct = (value - min) / (max - min);
  return pct > 0.55 ? '#ffffff' : '#1a2e1a';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2.5 text-xs min-w-[140px]">
      <div className="font-semibold text-gray-800 mb-2">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-3 mb-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: p.fill ?? p.color }} />
            <span className="text-gray-500">{p.name}</span>
          </div>
          <span className="font-mono font-bold text-gray-800">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// Pastel color palette for stacked/grouped bars
const BAR_COLORS = ['#0f766e', '#7c3aed', '#0891b2', '#d97706', '#be185d', '#059669', '#dc2626', '#4f46e5'];

export default function TwoDimensionAnalysis({ onSegmentClick }: Props) {
  const [dim1, setDim1] = useState('Channel');
  const [dim2, setDim2] = useState('Platform');
  const [vizMode, setVizMode] = useState<VizMode>('heatmap');
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [metric, setMetric] = useState<'value' | 'publishRate'>('value');

  const rawData = useMemo(() => get2DData(dim1, dim2), [dim1, dim2]);

  // Get unique dim1 and dim2 values
  const dim1Values = useMemo(() => [...new Set(rawData.map(d => d.dim1))], [rawData]);
  const dim2Values = useMemo(() => [...new Set(rawData.map(d => d.dim2))], [rawData]);

  const cellValue = (d: typeof rawData[0]) => metric === 'publishRate' ? (d.publishRate ?? d.value) : d.value;

  const allValues = rawData.map(cellValue);
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);

  // For stacked/grouped: transform to per-dim1 rows with dim2 as keys
  const barData = useMemo(() => {
    return dim1Values.map(d1 => {
      const row: Record<string, any> = { name: d1 };
      dim2Values.forEach(d2 => {
        const cell = rawData.find(d => d.dim1 === d1 && d.dim2 === d2);
        row[d2] = cell ? cellValue(cell) : 0;
      });
      return row;
    });
  }, [dim1Values, dim2Values, rawData, metric]);

  const handleCellClick = (d1: string, d2: string) => {
    onSegmentClick(dim1, d1);
  };

  const handleBarClick = (data: any) => {
    if (data?.activePayload?.[0]) {
      onSegmentClick(dim1, data.activeLabel);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-sm font-semibold text-gray-800">2-Dimension Interaction Analysis</div>
          <div className="text-xs text-gray-400 mt-0.5">Explore cross-dimensional patterns · click any cell to drill down</div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Metric toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setMetric('value')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 ${metric === 'value' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Content Volume
            </button>
            <button
              onClick={() => setMetric('publishRate')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 ${metric === 'publishRate' ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Publish Rate
            </button>
          </div>

          {/* Viz mode */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
            {(['heatmap', 'stacked', 'grouped'] as VizMode[]).map(v => (
              <button
                key={v}
                onClick={() => setVizMode(v)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 capitalize ${
                  vizMode === v ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {v === 'heatmap' ? 'Heatmap' : v === 'stacked' ? 'Stacked' : 'Grouped'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dimension selectors */}
      <div className="px-5 py-3 border-b border-gray-50 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dim 1 (Rows)</span>
          <div className="relative">
            <select
              value={dim1}
              onChange={e => { setDim1(e.target.value); }}
              className="h-7 text-xs border border-gray-200 rounded-lg bg-white text-teal-700 font-medium px-2.5 pr-7 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            >
              {DIMENSIONS.filter(d => d !== dim2).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <Icon name="ChevronDownIcon" size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <Icon name="XMarkIcon" size={14} className="text-gray-300" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dim 2 (Cols)</span>
          <div className="relative">
            <select
              value={dim2}
              onChange={e => { setDim2(e.target.value); }}
              className="h-7 text-xs border border-gray-200 rounded-lg bg-white text-purple-700 font-medium px-2.5 pr-7 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            >
              {DIMENSIONS.filter(d => d !== dim1).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <Icon name="ChevronDownIcon" size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="ml-auto text-xs text-gray-400">
          <span className="font-mono font-medium text-gray-600">{dim1Values.length} × {dim2Values.length}</span> matrix
          {metric === 'publishRate' && <span className="ml-2 text-amber-500">showing publish rate %</span>}
        </div>
      </div>

      {/* Visualization */}
      <div className="p-5 overflow-x-auto scrollbar-thin">
        {vizMode === 'heatmap' && (
          <div>
            {/* Heatmap grid */}
            <div className="min-w-max">
              {/* Column headers */}
              <div className="flex gap-1 mb-1 ml-28">
                {dim2Values.map(d2 => (
                  <div key={d2} className="w-16 text-center text-[10px] text-gray-500 font-medium truncate px-1">
                    {d2.length > 8 ? d2.slice(0, 7) + '…' : d2}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {dim1Values.map(d1 => (
                <div key={d1} className="flex gap-1 mb-1 items-center">
                  <div className="w-28 text-xs text-gray-600 font-medium pr-2 truncate text-right shrink-0">
                    {d1}
                  </div>
                  {dim2Values.map(d2 => {
                    const cell = rawData.find(d => d.dim1 === d1 && d.dim2 === d2);
                    const val = cell ? cellValue(cell) : 0;
                    const bg = getHeatmapColor(val, minVal, maxVal);
                    const textCol = getTextColor(val, minVal, maxVal);
                    const cellKey = `${d1}-${d2}`;
                    const isHovered = hoveredCell === cellKey;
                    return (
                      <div
                        key={d2}
                        className="w-16 h-10 rounded-md flex items-center justify-center cursor-pointer transition-all duration-150 relative group"
                        style={{
                          backgroundColor: bg,
                          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                          boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                          zIndex: isHovered ? 10 : 1,
                        }}
                        onMouseEnter={() => setHoveredCell(cellKey)}
                        onMouseLeave={() => setHoveredCell(null)}
                        onClick={() => handleCellClick(d1, d2)}
                        title={`${d1} × ${d2}: ${val}${metric === 'publishRate' ? '%' : ''}`}
                      >
                        <span className="font-mono text-[11px] font-semibold" style={{ color: textCol }}>
                          {metric === 'publishRate' ? `${val}%` : val}
                        </span>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-20 pointer-events-none">
                          <div className="bg-gray-900 text-white text-[10px] font-medium rounded-md px-2 py-1 whitespace-nowrap shadow-lg">
                            {d1} × {d2}
                            <div className="text-gray-300 font-normal">{val}{metric === 'publishRate' ? '%' : ' items'}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Color scale legend */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3">
              <span className="text-xs text-gray-400">Low</span>
              <div className="flex gap-0.5">
                {HEATMAP_COLORS.map((c, i) => (
                  <div key={i} className="w-5 h-3 rounded-sm" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-xs text-gray-400">High</span>
              <span className="text-xs text-gray-400 ml-4">
                Range: <span className="font-mono font-medium text-gray-600">{minVal}</span>
                {' – '}
                <span className="font-mono font-medium text-gray-600">{maxVal}</span>
                {metric === 'publishRate' ? '%' : ' items'}
              </span>
            </div>
          </div>
        )}

        {(vizMode === 'stacked' || vizMode === 'grouped') && (
          <div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={barData}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                onClick={handleBarClick}
                style={{ cursor: 'pointer' }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#6b7280', fontFamily: 'DM Sans' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6b7280', fontFamily: 'JetBrains Mono' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => metric === 'publishRate' ? `${v}%` : v}
                />
                <Tooltip content={<CustomTooltip />} />
                {dim2Values.map((d2, i) => (
                  <Bar
                    key={d2}
                    dataKey={d2}
                    stackId={vizMode === 'stacked' ? 'a' : undefined}
                    fill={BAR_COLORS[i % BAR_COLORS.length]}
                    radius={vizMode === 'grouped' ? [2, 2, 0, 0] : undefined}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-gray-100">
              {dim2Values.map((d2, i) => (
                <div key={d2} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }} />
                  {d2}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Insights strip */}
      <div className="px-5 pb-4">
        <div className="bg-gray-50 rounded-lg px-4 py-2.5 flex flex-wrap gap-x-6 gap-y-1.5">
          <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
            <Icon name="LightBulbIcon" size={13} className="text-amber-500" />
            Insights
          </span>
          {dim1 === 'Channel' && dim2 === 'Platform' && (
            <>
              <span className="text-xs text-gray-500">Social Media × LinkedIn shows highest volume</span>
              <span className="text-xs text-gray-500">Press × Spotify has near-zero output</span>
              <span className="text-xs text-gray-500">Video × YouTube has lowest publish rate</span>
            </>
          )}
          {dim1 === 'User' && dim2 === 'Published Status' && (
            <>
              <span className="text-xs text-gray-500">Mara Okonkwo leads in Published content</span>
              <span className="text-xs text-gray-500">Dmitri Volkov has high Unpublished ratio</span>
            </>
          )}
          {dim1 !== 'Channel' && dim1 !== 'User' && (
            <span className="text-xs text-gray-500">Select <strong>Channel × Platform</strong> or <strong>User × Published Status</strong> for curated insights</span>
          )}
        </div>
      </div>
    </div>
  );
}
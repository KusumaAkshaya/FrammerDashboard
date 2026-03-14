'use client';

import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, ReferenceLine,
} from 'recharts';
import Icon from '../../../components/ui/AppIcon';
import { TREND_DATA, getDrilldownTrend, type DrilldownTarget } from './mockData';

type Props = {
  filters: any;
  drilldown: DrilldownTarget;
};

type ViewMode = 'volume' | 'rate';
type ChartType = 'area' | 'line';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2.5 text-xs min-w-[160px]">
      <div className="font-semibold text-gray-700 mb-2">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.color }} />
            <span className="text-gray-500 capitalize">{p.name}</span>
          </div>
          <span className="font-mono font-bold" style={{ color: p.color }}>
            {p.dataKey === 'publishRate' ? `${p.value.toFixed(1)}%` : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function TrendAnalysis({ drilldown }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('volume');
  const [chartType, setChartType] = useState<ChartType>('area');

  const data = drilldown ? getDrilldownTrend(drilldown.value) : TREND_DATA;

  // Compute summary stats
  const latest = data[data.length - 1];
  const prev = data[data.length - 2];
  const inputGrowth = prev ? (((latest.input - prev.input) / prev.input) * 100).toFixed(1) : '0';
  const outputGrowth = prev ? (((latest.output - prev.output) / prev.output) * 100).toFixed(1) : '0';
  const avgPublishRate = (data.reduce((s, d) => s + d.publishRate, 0) / data.length).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">Trend Analysis</span>
            {drilldown && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-100">
                <Icon name="FunnelIcon" size={11} />
                {drilldown.dimension}: {drilldown.value}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Input vs Output growth over 13 weeks · weekly cadence</div>
        </div>

        <div className="flex items-center gap-2">
          {/* Summary pills */}
          <div className="hidden sm:flex items-center gap-3 mr-2">
            <div className="flex items-center gap-1.5 text-xs">
              <span className={`font-mono font-semibold ${parseFloat(inputGrowth) >= 0 ? 'text-teal-600' : 'text-red-500'}`}>
                {parseFloat(inputGrowth) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(inputGrowth))}%
              </span>
              <span className="text-gray-400">input w/w</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className={`font-mono font-semibold ${parseFloat(outputGrowth) >= 0 ? 'text-purple-600' : 'text-red-500'}`}>
                {parseFloat(outputGrowth) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(outputGrowth))}%
              </span>
              <span className="text-gray-400">output w/w</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-mono font-semibold text-amber-600">{avgPublishRate}%</span>
              <span className="text-gray-400">avg pub rate</span>
            </div>
          </div>

          {/* View mode */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setViewMode('volume')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 ${viewMode === 'volume' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Volume
            </button>
            <button
              onClick={() => setViewMode('rate')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 ${viewMode === 'rate' ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Publish Rate
            </button>
          </div>

          {/* Chart type */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setChartType('area')}
              className={`p-1.5 rounded-md transition-all duration-150 ${chartType === 'area' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-400 hover:text-gray-600'}`}
              title="Area chart"
            >
              <Icon name="ChartBarSquareIcon" size={14} />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded-md transition-all duration-150 ${chartType === 'line' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-400 hover:text-gray-600'}`}
              title="Line chart"
            >
              <Icon name="PresentationChartLineIcon" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-5">
        {viewMode === 'volume' ? (
          chartType === 'area' ? (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="inputGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f766e" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#0f766e" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="outputGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="publishedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.14} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#9ca3af', fontFamily: 'DM Sans' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9ca3af', fontFamily: 'JetBrains Mono' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="input" name="Input" stroke="#0f766e" strokeWidth={2} fill="url(#inputGrad)" dot={false} activeDot={{ r: 4, fill: '#0f766e' }} />
                <Area type="monotone" dataKey="output" name="Output" stroke="#7c3aed" strokeWidth={2} fill="url(#outputGrad)" dot={false} activeDot={{ r: 4, fill: '#7c3aed' }} />
                <Area type="monotone" dataKey="published" name="Published" stroke="#059669" strokeWidth={1.5} strokeDasharray="4 3" fill="url(#publishedGrad)" dot={false} activeDot={{ r: 3, fill: '#059669' }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af', fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="input" name="Input" stroke="#0f766e" strokeWidth={2} dot={{ r: 3, fill: '#0f766e' }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="output" name="Output" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3, fill: '#7c3aed' }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="published" name="Published" stroke="#059669" strokeWidth={1.5} strokeDasharray="4 3" dot={{ r: 2, fill: '#059669' }} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          )
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af', fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
              <YAxis
                domain={[40, 100]}
                tick={{ fontSize: 11, fill: '#9ca3af', fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={70} stroke="#dc2626" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: '70% target', fontSize: 10, fill: '#dc2626', position: 'insideTopRight' }} />
              <Area type="monotone" dataKey="publishRate" name="Publish Rate" stroke="#f59e0b" strokeWidth={2.5} fill="url(#rateGrad)" dot={false} activeDot={{ r: 4, fill: '#f59e0b' }} />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {/* Legend */}
        {viewMode === 'volume' && (
          <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-5 h-0.5 bg-teal-600 inline-block rounded" />
              Input
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-5 h-0.5 bg-purple-600 inline-block rounded" />
              Output (Created)
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-5 h-px border-t-2 border-dashed border-green-600 inline-block" />
              Published
            </div>
          </div>
        )}
        {viewMode === 'rate' && (
          <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-5 h-0.5 bg-amber-500 inline-block rounded" />
              Weekly Publish Rate
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-5 h-px border-t-2 border-dashed border-red-500 inline-block" />
              70% Target
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
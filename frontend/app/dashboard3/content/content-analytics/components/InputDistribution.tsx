'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import Icon from '../../../components/ui/AppIcon';
import { inputByChannel, inputByType, inputByPlatform, type FilterState } from './mockData';

type Props = {
  filters: FilterState;
  activeSegment: string | null;
  onSegmentClick: (dimension: string, value: string) => void;
};

type DimTab = 'channel' | 'type' | 'platform';
type ChartTab = 'bar' | 'pie';

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2.5 text-xs">
      <div className="font-semibold text-gray-800 mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
        <span className="text-gray-600">Input count:</span>
        <span className="font-mono font-bold text-teal-700">{payload[0].value.toLocaleString()}</span>
      </div>
    </div>
  );
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2.5 text-xs">
      <div className="font-semibold text-gray-800 mb-1">{payload[0].name}</div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: payload[0].payload.color }} />
        <span className="text-gray-600">Count:</span>
        <span className="font-mono font-bold" style={{ color: payload[0].payload.color }}>{payload[0].value.toLocaleString()}</span>
        <span className="text-gray-400">({payload[0].payload.pct}%)</span>
      </div>
    </div>
  );
};

export default function InputDistribution({ filters, activeSegment, onSegmentClick }: Props) {
  const [dimTab, setDimTab] = useState<DimTab>('channel');
  const [chartTab, setChartTab] = useState<ChartTab>('bar');

  const dataMap: Record<DimTab, typeof inputByChannel> = {
    channel: inputByChannel,
    type: inputByType,
    platform: inputByPlatform,
  };

  const rawData = dataMap[dimTab];
  const total = rawData.reduce((s, d) => s + d.count, 0);
  const data = rawData.map(d => ({ ...d, pct: ((d.count / total) * 100).toFixed(1) }));

  const handleBarClick = (data: any) => {
    if (data?.activePayload?.[0]) {
      const name = data.activePayload[0].payload.name;
      onSegmentClick(dimTab, name);
    }
  };

  const handlePieClick = (entry: any) => {
    onSegmentClick(dimTab, entry.name);
  };

  const dimLabels: Record<DimTab, string> = { channel: 'Channel', type: 'Input Type', platform: 'Platform' };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-sm font-semibold text-gray-800">Input Distribution</div>
          <div className="text-xs text-gray-400 mt-0.5">
            <span className="font-mono font-semibold text-teal-700">{total.toLocaleString()}</span> total inputs · click segment to filter
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Dimension tabs */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
            {(['channel', 'type', 'platform'] as DimTab[]).map(d => (
              <button
                key={d}
                onClick={() => setDimTab(d)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 ${
                  dimTab === d ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {dimLabels[d]}
              </button>
            ))}
          </div>
          {/* Chart type tabs */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setChartTab('bar')}
              className={`p-1.5 rounded-md transition-all duration-150 ${chartTab === 'bar' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-400 hover:text-gray-600'}`}
              title="Bar chart"
            >
              <Icon name="ChartBarIcon" size={14} />
            </button>
            <button
              onClick={() => setChartTab('pie')}
              className={`p-1.5 rounded-md transition-all duration-150 ${chartTab === 'pie' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-400 hover:text-gray-600'}`}
              title="Pie chart"
            >
              <Icon name="ChartPieIcon" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 p-5">
        {chartTab === 'bar' ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={data}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
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
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#f0fdf4', radius: 4 }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={activeSegment === entry.name ? '#0f766e' : entry.color}
                    opacity={activeSegment && activeSegment !== entry.name ? 0.4 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  onClick={handlePieClick}
                  style={{ cursor: 'pointer' }}
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                      opacity={activeSegment && activeSegment !== entry.name ? 0.35 : 1}
                      stroke={activeSegment === entry.name ? '#0f766e' : 'transparent'}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-1">
              {data.map(d => (
                <button
                  key={d.name}
                  onClick={() => handlePieClick(d)}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  {d.name}
                  <span className="font-mono text-gray-400">{d.pct}%</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Summary row */}
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-3">
          {data.slice(0, 3).map(d => (
            <button
              key={d.name}
              onClick={() => onSegmentClick(dimTab, d.name)}
              className={`text-left rounded-lg px-3 py-2 transition-all duration-150 hover:bg-gray-50 ${
                activeSegment === d.name ? 'bg-teal-50 border border-teal-100' : 'border border-transparent'
              }`}
            >
              <div className="font-mono text-sm font-bold text-gray-800 tabular-nums">{d.count.toLocaleString()}</div>
              <div className="text-xs text-gray-400 truncate">{d.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
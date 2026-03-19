'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import Icon from '../../../components/ui/AppIcon';
import { outputByChannel, outputByType, outputByPlatform, type FilterState } from './mockData';

type Props = {
  filters: FilterState;
  activeSegment: string | null;
  onSegmentClick: (dimension: string, value: string) => void;
};

type DimTab = 'channel' | 'type' | 'platform';
type ChartTab = 'bar' | 'pie';
type MetricTab = 'total' | 'published' | 'unpublished';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2.5 text-xs min-w-[140px]">
      <div className="font-semibold text-gray-800 mb-2">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-3 mb-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.fill }} />
            <span className="text-gray-500 capitalize">{p.dataKey}</span>
          </div>
          <span className="font-mono font-bold" style={{ color: p.fill }}>{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function OutputDistribution({ filters, activeSegment, onSegmentClick }: Props) {
  const [dimTab, setDimTab] = useState<DimTab>('channel');
  const [chartTab, setChartTab] = useState<ChartTab>('bar');
  const [metricTab, setMetricTab] = useState<MetricTab>('total');

  const dataMap = { channel: outputByChannel, type: outputByType, platform: outputByPlatform };
  const rawData = dataMap[dimTab];
  const totalPublished = rawData.reduce((s, d) => s + d.published, 0);
  const totalUnpublished = rawData.reduce((s, d) => s + d.unpublished, 0);
  const totalAll = rawData.reduce((s, d) => s + d.total, 0);

  const pieData = rawData.map(d => ({
    name: d.name,
    value: metricTab === 'published' ? d.published : metricTab === 'unpublished' ? d.unpublished : d.total,
    color: d.color,
    pct: (((metricTab === 'published' ? d.published : metricTab === 'unpublished' ? d.unpublished : d.total) / totalAll) * 100).toFixed(1),
  }));

  const dimLabels: Record<DimTab, string> = { channel: 'Channel', type: 'Output Type', platform: 'Platform' };

  const handleBarClick = (data: any) => {
    if (data?.activePayload?.[0]) {
      const name = data.activePayload[0].payload.name;
      onSegmentClick(dimTab, name);
    }
  };

  // Find worst publish rate item
  const worstItem = rawData.reduce((worst, d) =>
    (d.published / d.total) < (worst.published / worst.total) ? d : worst
  );
  const worstRate = ((worstItem.published / worstItem.total) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-sm font-semibold text-gray-800">Output Distribution</div>
          <div className="text-xs text-gray-400 mt-0.5">
            <span className="font-mono font-semibold text-purple-600">{totalAll.toLocaleString()}</span> total outputs ·
            <span className="font-mono font-semibold text-green-600 ml-1">{totalPublished.toLocaleString()}</span> published ·
            <span className="font-mono font-semibold text-red-500 ml-1">{totalUnpublished.toLocaleString()}</span> unpublished
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
            {(['channel', 'type', 'platform'] as DimTab[]).map(d => (
              <button
                key={d}
                onClick={() => setDimTab(d)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 ${
                  dimTab === d ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {dimLabels[d]}
              </button>
            ))}
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setChartTab('bar')}
              className={`p-1.5 rounded-md transition-all duration-150 ${chartTab === 'bar' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Icon name="ChartBarIcon" size={14} />
            </button>
            <button
              onClick={() => setChartTab('pie')}
              className={`p-1.5 rounded-md transition-all duration-150 ${chartTab === 'pie' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Icon name="ChartPieIcon" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Metric selector for pie */}
      {chartTab === 'pie' && (
        <div className="px-5 pt-3 flex items-center gap-2">
          {(['total', 'published', 'unpublished'] as MetricTab[]).map(m => (
            <button
              key={m}
              onClick={() => setMetricTab(m)}
              className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-all duration-150 capitalize ${
                metricTab === m
                  ? m === 'published' ? 'bg-green-50 border-green-200 text-green-700'
                    : m === 'unpublished'? 'bg-red-50 border-red-200 text-red-600' :'bg-purple-50 border-purple-200 text-purple-700' :'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className="flex-1 p-5">
        {chartTab === 'bar' ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={rawData}
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
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#faf5ff', radius: 4 }} />
              <Bar dataKey="published" stackId="a" radius={[0, 0, 0, 0]}>
                {rawData.map((entry) => (
                  <Cell
                    key={`pub-${entry.name}`}
                    fill="#0f766e"
                    opacity={activeSegment && activeSegment !== entry.name ? 0.3 : 0.85}
                  />
                ))}
              </Bar>
              <Bar dataKey="unpublished" stackId="a" radius={[4, 4, 0, 0]}>
                {rawData.map((entry) => (
                  <Cell
                    key={`unpub-${entry.name}`}
                    fill="#fca5a5"
                    opacity={activeSegment && activeSegment !== entry.name ? 0.3 : 0.9}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center">
            {/* <ResponsiveContainer width="100%" height={220}> */}
              {/* <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  onClick={(entry) => onSegmentClick(dimTab, entry.name)}
                  style={{ cursor: 'pointer' }}
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                      opacity={activeSegment && activeSegment !== entry.name ? 0.35 : 1}
                      stroke={activeSegment === entry.name ? '#7c3aed' : 'transparent'}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
              </PieChart> */}
            {/* </ResponsiveContainer> */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-1">
              {pieData.map(d => (
                <button
                  key={d.name}
                  onClick={() => onSegmentClick(dimTab, d.name)}
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

        {/* Bar chart legend */}
        {chartTab === 'bar' && (
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-3 h-3 rounded-sm bg-teal-600 inline-block opacity-85" />
              Published
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-3 h-3 rounded-sm bg-red-300 inline-block" />
              Unpublished
            </div>
            {/* Low publish rate alert */}
            <div className="ml-auto flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1">
              <Icon name="ExclamationTriangleIcon" size={12} />
              <span>Lowest: <strong>{worstItem.name}</strong> at {worstRate}% publish rate</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
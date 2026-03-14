'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import Icon from '../../../components/ui/AppIcon';
import {
  getDrilldownTrend, getDrilldownUsers, getDrilldownOutputTypes,
  type DrilldownTarget,
} from './mockData';

type Props = {
  target: DrilldownTarget;
  onClose: () => void;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2.5 text-xs min-w-[140px]">
      <div className="font-semibold text-gray-700 mb-1.5">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 mb-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.color }} />
            <span className="text-gray-500">{p.name}</span>
          </div>
          <span className="font-mono font-bold" style={{ color: p.color }}>
            {p.dataKey === 'publishRate' ? `${p.value.toFixed(1)}%` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function DrilldownPanel({ target, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [target]);

  if (!target) return null;

  const trendData = getDrilldownTrend(target.value);
  const users = getDrilldownUsers(target.value);
  const outputTypes = getDrilldownOutputTypes(target.value);

  const totalOutput = users.reduce((s, u) => s + u.output, 0);
  const totalPublished = users.reduce((s, u) => s + u.published, 0);
  const overallPublishRate = totalOutput > 0 ? ((totalPublished / totalOutput) * 100).toFixed(1) : '0';

  const latestTrend = trendData[trendData.length - 1];
  const prevTrend = trendData[trendData.length - 2];
  const trendDelta = prevTrend ? (((latestTrend.input - prevTrend.input) / prevTrend.input) * 100).toFixed(1) : '0';

  return (
    <div className={`bg-white rounded-xl border border-teal-100 shadow-md overflow-hidden transition-all duration-300 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
      {/* Panel Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Icon name="MagnifyingGlassIcon" size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Drill-down: {target.value}</div>
            <div className="text-teal-200 text-xs mt-0.5">{target.dimension} segment analysis · last 13 weeks</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <Icon name="XMarkIcon" size={16} className="text-white" />
        </button>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-b border-gray-100">
        {[
          { label: 'Total Output', value: totalOutput.toString(), icon: 'DocumentTextIcon', color: 'text-teal-700' },
          { label: 'Published', value: totalPublished.toString(), icon: 'CheckCircleIcon', color: 'text-green-600' },
          { label: 'Publish Rate', value: `${overallPublishRate}%`, icon: 'ChartBarIcon', color: parseFloat(overallPublishRate) >= 70 ? 'text-green-600' : 'text-red-600' },
          { label: 'Input Trend', value: `${parseFloat(trendDelta) >= 0 ? '↑' : '↓'} ${Math.abs(parseFloat(trendDelta))}%`, icon: 'ArrowTrendingUpIcon', color: parseFloat(trendDelta) >= 0 ? 'text-teal-600' : 'text-red-500' },
        ].map((s, i) => (
          <div key={s.label} className={`px-5 py-3 flex items-center gap-3 ${i < 3 ? 'border-r border-gray-100' : ''}`}>
            <Icon name={s.icon as any} size={18} className={`${s.color} shrink-0`} />
            <div>
              <div className={`font-mono text-lg font-bold tabular-nums ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-400 font-medium">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
        {/* Left: Input vs Output trend + Publish rate trend */}
        <div className="lg:col-span-2 p-5 space-y-5">
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Icon name="PresentationChartLineIcon" size={14} className="text-teal-600" />
              Input vs Output Trend
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="ddInputGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f766e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ddOutputGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} interval={2} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="input" name="Input" stroke="#0f766e" strokeWidth={1.5} fill="url(#ddInputGrad)" dot={false} />
                <Area type="monotone" dataKey="output" name="Output" stroke="#7c3aed" strokeWidth={1.5} fill="url(#ddOutputGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Icon name="ChartBarIcon" size={14} className="text-amber-500" />
              Publish Rate Trend
            </div>
            <ResponsiveContainer width="100%" height={130}>
              <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="ddRateGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} interval={2} />
                <YAxis
                  domain={[30, 100]}
                  tick={{ fontSize: 10, fill: '#9ca3af', fontFamily: 'JetBrains Mono' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `${v}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="publishRate" name="Publish Rate" stroke="#f59e0b" strokeWidth={2} fill="url(#ddRateGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Top users + Output type breakdown */}
        <div className="p-5 space-y-5">
          {/* Top contributing users */}
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Icon name="UsersIcon" size={14} className="text-teal-600" />
              Top Contributing Users
            </div>
            <div className="space-y-2">
              {users.map((user, i) => (
                <div key={user.name} className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    i === 0 ? 'bg-teal-100 text-teal-700' :
                    i === 1 ? 'bg-purple-100 text-purple-700' :
                    i === 2 ? 'bg-blue-100 text-blue-700': 'bg-gray-100 text-gray-500'
                  }`}>
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-medium text-gray-700 truncate">{user.name}</span>
                      <span className={`text-[10px] font-mono font-semibold shrink-0 ${
                        user.publishRate >= 75 ? 'text-green-600' : user.publishRate >= 60 ? 'text-amber-600' : 'text-red-500'
                      }`}>
                        {user.publishRate.toFixed(0)}%
                      </span>
                    </div>
                    <div className="mt-0.5 w-full bg-gray-100 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-500 ${
                          user.publishRate >= 75 ? 'bg-green-500' : user.publishRate >= 60 ? 'bg-amber-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${user.publishRate}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {user.published}/{user.output} published
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Output type distribution */}
          <div className="pt-4 border-t border-gray-100">
            <div className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Icon name="DocumentDuplicateIcon" size={14} className="text-purple-600" />
              Output Type Breakdown
            </div>
            <div className="flex gap-3 items-center">
              <ResponsiveContainer width={90} height={90}>
                <PieChart>
                  <Pie
                    data={outputTypes}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={28}
                    outerRadius={42}
                    paddingAngle={2}
                  >
                    {outputTypes.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-1.5">
                {outputTypes.map(t => (
                  <div key={t.name} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                      <span className="text-[10px] text-gray-600 truncate">{t.name}</span>
                    </div>
                    <span className="font-mono text-[10px] font-semibold text-gray-700 shrink-0">{t.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
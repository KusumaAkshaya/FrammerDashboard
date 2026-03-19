'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import { type KPIData } from './mockData';

type Props = {
  kpi: KPIData;
  highlightSegment: string | null;
};

function useAnimatedValue(target: number, decimals = 1) {
  const [value, setValue] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    if (prevRef.current === target) return;
    const start = prevRef.current;
    const duration = 600;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((start + (target - start) * eased).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    prevRef.current = target;
  }, [target, decimals]);

  return value;
}

function DeltaBadge({ delta, unit = '', inverse = false }: { delta: number; unit?: string; inverse?: boolean }) {
  const positive = inverse ? delta < 0 : delta > 0;
  const neutral = delta === 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full ${
      neutral ? 'bg-gray-100 text-gray-500' : positive ?'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
    }`}>
      {!neutral && (
        <Icon name={positive ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'} size={11} />
      )}
      {delta > 0 ? '+' : ''}{delta}{unit}
    </span>
  );
}

type CardProps = {
  label: string;
  value: string;
  delta: number;
  deltaUnit?: string;
  inverseDelta?: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
  subtext?: string;
  alert?: boolean;
  highlight?: boolean;
};

function KPICard({ label, value, delta, deltaUnit, inverseDelta, icon, iconBg, iconColor, subtext, alert, highlight }: CardProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (highlight) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 1000);
      return () => clearTimeout(t);
    }
  }, [highlight, value]);

  return (
    <div className={`relative bg-white rounded-xl border shadow-sm p-4 flex flex-col gap-3 transition-all duration-300 ${
      alert ? 'border-red-200 bg-red-50/30' : 'border-gray-100'
    } ${pulse ? 'animate-highlight' : ''}`}>
      {alert && (
        <div className="absolute top-3 right-3">
          <span className="w-2 h-2 rounded-full bg-red-500 block animate-pulse" />
        </div>
      )}
      <div className="flex items-start justify-between">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon name={icon} size={16} className={iconColor} />
        </div>
        <DeltaBadge delta={delta} unit={deltaUnit ?? '%'} inverse={inverseDelta} />
      </div>
      <div>
        <div className={`font-mono text-2xl font-bold tracking-tight tabular-nums ${alert ? 'text-red-700' : 'text-gray-900'}`}>
          {value}
        </div>
        <div className="text-xs font-semibold text-gray-500 mt-0.5 uppercase tracking-wide">{label}</div>
        {subtext && <div className="text-xs text-gray-400 mt-1">{subtext}</div>}
      </div>
    </div>
  );
}

export default function KPICards({ kpi, highlightSegment }: Props) {
  const publishRate = useAnimatedValue(kpi.publishRate, 1);
  const avgPublish = useAnimatedValue(kpi.avgPublishingDeclaration, 1);
  const avgCreate = useAnimatedValue(kpi.avgCreationDeclaration, 1);
  const effRatio = useAnimatedValue(kpi.efficiencyRatio, 2);

  const isPublishRateAlert = kpi.publishRate < 65;
  const isVideoAlert = kpi.avgPublishingDeclaration > 6;

  return (
    <div>
      {highlightSegment && (
        <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-teal-50 border border-teal-100 rounded-lg text-xs text-teal-700 font-medium animate-slide-up">
          <Icon name="AdjustmentsHorizontalIcon" size={14} />
          KPIs recalculated for segment: <strong>{highlightSegment}</strong>
          <span className="text-teal-500 ml-1">— click any chart segment to update</span>
        </div>
      )}

      {/* 5 cards: grid-cols-5 on xl, 3+2 on lg, 2+3 on md, 1 on sm */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
        {/* Card 1: Publish Rate — Hero */}
        <div className={`col-span-2 md:col-span-1 bg-white rounded-xl border shadow-sm p-4 flex flex-col gap-3 transition-all duration-300 ${
          isPublishRateAlert ? 'border-red-200 bg-red-50/40' : 'border-teal-100 bg-teal-50/20'
        } ${highlightSegment ? 'animate-highlight' : ''}`}>
          {isPublishRateAlert && (
            <div className="absolute top-3 right-3">
              <span className="w-2 h-2 rounded-full bg-red-500 block animate-pulse" />
            </div>
          )}
          <div className="flex items-start justify-between">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isPublishRateAlert ? 'bg-red-100' : 'bg-teal-100'}`}>
              <Icon name="CheckCircleIcon" size={18} className={isPublishRateAlert ? 'text-red-600' : 'text-teal-700'} />
            </div>
            <DeltaBadge delta={kpi.publishRateDelta} unit="%" inverse={false} />
          </div>
          <div>
            {/* Gauge-style bar */}
            <div className="flex items-end gap-1 mb-2">
              <span className={`font-mono text-3xl font-bold tabular-nums ${isPublishRateAlert ? 'text-red-700' : 'text-teal-700'}`}>
                {publishRate.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
              <div
                className={`h-1.5 rounded-full transition-all duration-700 ${isPublishRateAlert ? 'bg-red-500' : 'bg-teal-500'}`}
                style={{ width: `${Math.min(publishRate, 100)}%` }}
              />
            </div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Publish Rate</div>
            <div className="text-xs text-gray-400 mt-0.5">{kpi.totalPublished} of {kpi.totalOutput} created</div>
          </div>
        </div>

        {/* Card 2: Avg Publishing Declaration */}
        <KPICard
          label="Avg Publish Declaration"
          value={`${avgPublish.toFixed(1)}d`}
          delta={kpi.avgPublishingDeclarationDelta}
          deltaUnit="d"
          inverseDelta={true}
          icon="ClockIcon"
          iconBg={isVideoAlert ? 'bg-amber-100' : 'bg-blue-50'}
          iconColor={isVideoAlert ? 'text-amber-600' : 'text-blue-600'}
          subtext="Created → Published"
          alert={isVideoAlert}
          highlight={!!highlightSegment}
        />

        {/* Card 3: Avg Creation Declaration */}
        <KPICard
          label="Avg Creation Declaration"
          value={`${avgCreate.toFixed(1)}d`}
          delta={kpi.avgCreationDeclarationDelta}
          deltaUnit="d"
          inverseDelta={true}
          icon="PencilSquareIcon"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtext="Requested → Created"
          highlight={!!highlightSegment}
        />

        {/* Card 4: Efficiency Ratio */}
        <KPICard
          label="Efficiency Ratio"
          value={effRatio.toFixed(2)}
          delta={kpi.efficiencyRatioDelta}
          deltaUnit=""
          icon="BoltIcon"
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          subtext="Creation ÷ Publishing time"
          highlight={!!highlightSegment}
        />

        {/* Card 5: Improvement Indicator (composite) */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-50">
              <Icon name="ArrowTrendingUpIcon" size={16} className="text-green-600" />
            </div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">vs prev. period</span>
          </div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Improvement</div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Publish Rate</span>
              <span className={`text-xs font-semibold font-mono ${kpi.publishRateDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.publishRateDelta > 0 ? '↑' : '↓'} {Math.abs(kpi.publishRateDelta)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Creation Time</span>
              <span className={`text-xs font-semibold font-mono ${kpi.avgCreationDeclarationDelta <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.avgCreationDeclarationDelta <= 0 ? '↓' : '↑'} {Math.abs(kpi.avgCreationDeclarationDelta)}d
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Publish Time</span>
              <span className={`text-xs font-semibold font-mono ${kpi.avgPublishingDeclarationDelta <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.avgPublishingDeclarationDelta <= 0 ? '↓' : '↑'} {Math.abs(kpi.avgPublishingDeclarationDelta)}d
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary metric strip */}
      <div className="mt-3 grid grid-cols-3 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-lg border border-gray-100 px-4 py-2.5 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Total Input</span>
          <span className="font-mono text-sm font-bold text-gray-800 tabular-nums">{kpi.totalInput.toLocaleString()}</span>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 px-4 py-2.5 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Total Output</span>
          <span className="font-mono text-sm font-bold text-gray-800 tabular-nums">{kpi.totalOutput.toLocaleString()}</span>
        </div>
        <div className={`rounded-lg border px-4 py-2.5 flex items-center justify-between ${
          kpi.totalUnpublished > 200 ? 'bg-amber-50 border-amber-100' : 'bg-white border-gray-100'
        }`}>
          <span className="text-xs text-gray-500 font-medium">Unpublished Backlog</span>
          <span className={`font-mono text-sm font-bold tabular-nums ${kpi.totalUnpublished > 200 ? 'text-amber-700' : 'text-gray-800'}`}>
            {kpi.totalUnpublished.toLocaleString()}
            {kpi.totalUnpublished > 200 && <Icon name="ExclamationTriangleIcon" size={12} className="inline ml-1 text-amber-500" />}
          </span>
        </div>
      </div>
    </div>
  );
}
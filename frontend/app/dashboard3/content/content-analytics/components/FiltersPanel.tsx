'use client';

import { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import {
  CHANNELS, PLATFORMS, LANGUAGES, USERS, OUTPUT_TYPES, PUBLISHED_STATUSES,
  type FilterState,
} from './mockData';

type Props = {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
};

export default function FiltersPanel({ filters, onFilterChange, onReset }: Props) {
  const [expanded, setExpanded] = useState(true);

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => k !== 'dateRange' && v !== 'all').length;

  const selectClass = "h-8 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 px-2.5 pr-7 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all";

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <Icon name="FunnelIcon" size={16} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-800">Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {activeFilterCount > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); onReset(); }}
              className="text-xs text-teal-600 hover:text-teal-800 font-medium flex items-center gap-1 transition-colors"
            >
              <Icon name="XMarkIcon" size={12} />
              Clear all
            </button>
          )}
          <Icon
            name={expanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
            size={16}
            className="text-gray-400"
          />
        </div>
      </div>

      {/* Filter controls */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-50 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Channel */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Channel</label>
              <div className="relative">
                <select
                  value={filters.channel}
                  onChange={e => onFilterChange('channel', e.target.value)}
                  className={selectClass}
                  style={{ width: '100%' }}
                >
                  <option value="all">All Channels</option>
                  {CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <Icon name="ChevronDownIcon" size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Platform */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Platform</label>
              <div className="relative">
                <select
                  value={filters.platform}
                  onChange={e => onFilterChange('platform', e.target.value)}
                  className={selectClass}
                  style={{ width: '100%' }}
                >
                  <option value="all">All Platforms</option>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <Icon name="ChevronDownIcon" size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Language */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Language</label>
              <div className="relative">
                <select
                  value={filters.language}
                  onChange={e => onFilterChange('language', e.target.value)}
                  className={selectClass}
                  style={{ width: '100%' }}
                >
                  <option value="all">All Languages</option>
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <Icon name="ChevronDownIcon" size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* User */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">User</label>
              <div className="relative">
                <select
                  value={filters.user}
                  onChange={e => onFilterChange('user', e.target.value)}
                  className={selectClass}
                  style={{ width: '100%' }}
                >
                  <option value="all">All Users</option>
                  {USERS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                <Icon name="ChevronDownIcon" size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Output Type */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Output Type</label>
              <div className="relative">
                <select
                  value={filters.outputType}
                  onChange={e => onFilterChange('outputType', e.target.value)}
                  className={selectClass}
                  style={{ width: '100%' }}
                >
                  <option value="all">All Types</option>
                  {OUTPUT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <Icon name="ChevronDownIcon" size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Published Status */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Status</label>
              <div className="relative">
                <select
                  value={filters.publishedStatus}
                  onChange={e => onFilterChange('publishedStatus', e.target.value)}
                  className={selectClass}
                  style={{ width: '100%' }}
                >
                  <option value="all">All Statuses</option>
                  {PUBLISHED_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <Icon name="ChevronDownIcon" size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
              {Object.entries(filters).map(([key, value]) => {
                if (key === 'dateRange' || value === 'all') return null;
                const labels: Record<string, string> = {
                  channel: 'Channel', platform: 'Platform', language: 'Language',
                  user: 'User', outputType: 'Output Type', publishedStatus: 'Status',
                };
                return (
                  <span key={key} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-100">
                    <span className="text-teal-500 font-normal">{labels[key]}:</span>
                    {value}
                    <button
                      onClick={() => onFilterChange(key as keyof FilterState, 'all')}
                      className="hover:text-teal-900 transition-colors"
                    >
                      <Icon name="XMarkIcon" size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';
import AppLogo from '../../../components/ui/AppLogo';
import Icon from '../../../components/ui/AppIcon';
import { type FilterState } from './mockData';

type Props = {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
};

export default function DashboardTopbar({ filters, onFilterChange, onResetFilters }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const dateOptions = [
    { value: 'last_7d', label: 'Last 7 days' },
    { value: 'last_30d', label: 'Last 30 days' },
    { value: 'last_90d', label: 'Last 90 days' },
    { value: 'last_6m', label: 'Last 6 months' },
    { value: 'last_12m', label: 'Last 12 months' },
    { value: 'ytd', label: 'Year to date' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-14 h-14 flex items-center justify-between gap-4">
        {/* Left: Logo + App name */}
        <div className="flex items-center gap-2.5 shrink-0">
          <AppLogo size={28} />
          <span className="font-semibold text-gray-900 text-base tracking-tight hidden sm:block">ContentFlow</span>
          <span className="hidden md:flex items-center gap-1 ml-1 px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-100">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse inline-block" />
            Live
          </span>
        </div>

        {/* Center: Quick date range */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {dateOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => onFilterChange('dateRange', opt.value)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-150 ${
                filters.dateRange === opt.value
                  ? 'bg-white text-teal-700 shadow-sm font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetFilters}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-150"
          >
            <Icon name="ArrowPathIcon" size={14} />
            Reset
          </button>
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-all duration-150 active:scale-95">
            <Icon name="ArrowDownTrayIcon" size={14} />
            Export
          </button>
          {/* Last updated */}
          <span className="hidden lg:block text-xs text-gray-400 font-mono pl-2 border-l border-gray-200">
            Updated 2 min ago
          </span>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile date range picker */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-wrap gap-2">
          {dateOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onFilterChange('dateRange', opt.value); setMobileOpen(false); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                filters.dateRange === opt.value
                  ? 'bg-teal-700 text-white' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
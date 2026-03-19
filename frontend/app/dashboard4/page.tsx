"use client"

import OutputTypeDistribution from "./components4/OutputTypeDistribution"
import OutputTrend from "./components4/OutputTrend"
import OutputFunnel from "./components4/OutputFunnel"
import OutputMixCounts from "./components4/OutputMixCounts"
import OutputMixTable from "./components4/OutputMixTable"
import InputOutputMatrix from "./components4/InputOutputMatrix"

<div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
  <h2 className="font-semibold mb-2 text-white">Insights</h2>
  <ul className="text-sm space-y-1 text-gray-300">
    <li>• Key Moments have highest creation volume</li>
    <li>• Summary has lowest publish rate</li>
    <li>• Chapters show high drop-off</li>
  </ul>
</div>

export default function Page() {

  return (
    <div className="p-6 space-y-8">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-white">
        Output Mix & Publishing
      </h1>

      {/* ================= TOP ROW ================= */}
      <div className="grid grid-cols-2 gap-6">

        <OutputTypeDistribution />
        <OutputMixCounts />

      </div>

      {/* ================= TREND ================= */}
      <OutputTrend />

     
    </div>
  )
}
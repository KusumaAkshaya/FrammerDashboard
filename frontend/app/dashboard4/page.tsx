"use client"

import OutputTypeDistribution from "./components4/OutputTypeDistribution"
import OutputTrend from "./components4/OutputTrend"
import OutputFunnel from "./components4/OutputFunnel"
import OutputMixCounts from "./components4/OutputMixCounts"
import OutputMixTable from "./components4/OutputMixTable"
import InputOutputMatrix from "./components4/InputOutputMatrix"


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
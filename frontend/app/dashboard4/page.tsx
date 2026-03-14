export default function Dashboard4Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard 4</h1>
        <p className="text-slate-400 mt-2">
          User, language, channel, and platform comparison.
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Dimension Comparison</h2>
        <p className="text-slate-300">
          Add filters here so users can pick any two dimensions like user,
          language, platform, output type, or channel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-xl p-6 shadow min-h-[260px]">
          <h2 className="text-xl font-semibold mb-4">Dimension 1 vs Dimension 2</h2>
          <p className="text-slate-300">
            This area can show a heatmap, grouped bar chart, or stacked chart.
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 shadow min-h-[260px]">
          <h2 className="text-xl font-semibold mb-4">Detailed Breakdown</h2>
          <p className="text-slate-300">
            Show drilldown insights for the selected pair of dimensions.
          </p>
        </div>
      </div>
    </div>
  );
}
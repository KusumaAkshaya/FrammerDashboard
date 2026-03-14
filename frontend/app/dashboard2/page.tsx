export default function Dashboard2Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard 2</h1>
        <p className="text-slate-400 mt-2">
          Input and output distribution analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Input Distribution</h2>
          <p className="text-slate-300">
            Add charts for channel, input type, and platform-based input
            distribution here.
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Output Distribution</h2>
          <p className="text-slate-300">
            Add charts for channel, output type, and platform-based output
            distribution here.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-slate-900 rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-3">Interaction View</h2>
        <p className="text-slate-300">
          Use this section to show two-dimensional interactions like Channel ×
          Platform or Language × User.
        </p>
      </div>
    </div>
  );
}
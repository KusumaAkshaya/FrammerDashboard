export default function Dashboard5Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard 5</h1>
        <p className="text-slate-400 mt-2">
          Detailed content explorer and record-level insights.
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <p className="text-slate-300">
          Add filters for channel, language, platform, user, published status,
          output type, and date range.
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Content Table</h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400">
              <th className="py-3 pr-4">Title</th>
              <th className="py-3 pr-4">Channel</th>
              <th className="py-3 pr-4">Platform</th>
              <th className="py-3 pr-4">Language</th>
              <th className="py-3 pr-4">Published</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800">
              <td className="py-3 pr-4">Sample Content A</td>
              <td className="py-3 pr-4">Blog</td>
              <td className="py-3 pr-4">WordPress</td>
              <td className="py-3 pr-4">English</td>
              <td className="py-3 pr-4">Yes</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-3 pr-4">Sample Content B</td>
              <td className="py-3 pr-4">Video</td>
              <td className="py-3 pr-4">YouTube</td>
              <td className="py-3 pr-4">Spanish</td>
              <td className="py-3 pr-4">No</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
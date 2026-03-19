"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { fetchInputOutputMatrix } from "@/services/api4"

export default function InputTypeFunnel() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchInputOutputMatrix().then(res => {
      setData(res.data)
    })
  }, [])

  return (
    <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800">
      <h2 className="text-lg font-semibold mb-2 text-white">Input Funnel</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" stroke="#ccc" />
          <YAxis dataKey="input_type" type="category" stroke="#ccc" />
          <Tooltip />
          <Legend />

          <Bar dataKey="created_count" name="Processed" />
          <Bar dataKey="published_count" name="Published" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
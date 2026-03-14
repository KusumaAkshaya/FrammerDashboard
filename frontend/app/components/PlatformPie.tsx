"use client"

import { useState,useEffect } from "react"

import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer
} from "recharts"

const COLORS=[
"#ff4d4f",
"#ec4899",
"#8b5cf6",
"#3b82f6",
"#06b6d4",
"#64748b"
]

export default function PlatformPie({data,onSelect}:any){

const [isDonut,setIsDonut] = useState(true)

useEffect(()=>{

if(data && data.length>0){

const maxPlatform = data.reduce((prev:any,current:any)=>
prev.value>current.value?prev:current)

onSelect(maxPlatform.platform)

}

},[data])

return(

<div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800">

<h2 className="text-white text-lg font-semibold mb-4">
Platform Distribution
</h2>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={data}
dataKey="value"
nameKey="platform"
innerRadius={isDonut?70:0}
outerRadius={110}
paddingAngle={3}
onClick={(d:any)=>onSelect(d.platform)}
>

{data.map((entry:any,index:number)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]} />
))}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

<div className="text-center mt-3">

<button
onClick={()=>setIsDonut(!isDonut)}
className="text-xs text-indigo-400 hover:text-indigo-300"
>
Toggle Pie / Donut
</button>

</div>

</div>

)
}
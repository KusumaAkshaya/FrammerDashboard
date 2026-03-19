"use client"

import { useEffect,useState } from "react"
import { fetchOutputDistribution } from "@/services/api4"


export default function InputOutputMatrix(){

 const [data,setData] = useState([])

useEffect(() => {
  fetchOutputDistribution().then(res => {
    setData(res.data)
  })
}, [])


 return(

 <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800">

 <h2 className="text-lg font-semibold mb-4 text-white">
 Input vs Output Matrix
 </h2>

 <table className="w-full text-sm border border-slate-700">

 <thead className="bg-slate-800">
 <tr>
 <th className="p-2 text-white">Input Type</th>
 <th className="p-2 text-white">Reels</th>
 <th className="p-2 text-white">Shorts</th>
 <th className="p-2 text-white">Chapters</th>
 <th className="p-2 text-white">Summary</th>
 </tr>
 </thead>

 <tbody>


 {data.map((row,i)=>(
   <tr key={i} className="text-center border-t border-slate-700 hover:bg-slate-800/50">

   <td className="p-2 text-gray-300">{row["Output Type"]}</td>
   <td className="p-2 text-gray-300">{row["Uploaded Count"]}</td>
   <td className="p-2 text-gray-300">{row["Created Count"]}</td>
   <td className="p-2 text-gray-300">{row["Published"]}</td>


   </tr>
 ))}

 </tbody>

 </table>

 </div>
 )
}
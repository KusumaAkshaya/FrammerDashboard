"use client"

import { useEffect, useState } from "react"
import { fetchOutputDistribution } from "@/services/api4"

export default function OutputMixTable(){

 const [data,setData] = useState([])

 useEffect(()=>{
   fetchOutputDistribution().then(res=>{
     setData(res.data)
   })
 },[])

 return(

 <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800">

 <h2 className="text-lg font-semibold mb-3 text-white">
 Output Dataset
 </h2>

 <table className="w-full text-sm border border-slate-700">

 <thead className="bg-slate-800">

 <tr>
 <th className="text-white p-2">Output Type</th>
 <th className="text-white p-2">Uploaded</th>
 <th className="text-white p-2">Created</th>
 <th className="text-white p-2">Published</th>
 <th className="text-white p-2">Uploaded Duration</th>
 <th className="text-white p-2">Created Duration</th>
 <th className="text-white p-2">Published Duration</th>
 </tr>

 </thead>

 <tbody>


 {data.map((row,i)=>(
   <tr key={i} className="text-center border-t border-slate-700 hover:bg-slate-800/50">
    <td className="text-gray-300 p-2">{row["Output Type"]}</td>
   <td className="text-gray-300 p-2">{row["Uploaded Count"]}</td>
   <td className="text-gray-300 p-2">{row["Created Count"]}</td>
   <td className="text-gray-300 p-2">{row["Published Count"]}</td>
   <td className="text-gray-300 p-2">{row["Uploaded Duration (hh:mm:ss)"]}</td>
   <td className="text-gray-300 p-2">{row["Created Duration (hh:mm:ss)"]}</td>
   <td className="text-gray-300 p-2">{row["Published Duration (hh:mm:ss)"]}</td>
   </tr>
 ))}

 </tbody>

 </table>

 </div>

 )
}
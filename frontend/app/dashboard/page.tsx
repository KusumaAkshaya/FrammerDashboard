"use client"
import {useEffect, useState} from "react"

type KPI = {
  total_uploaded: number
  total_published: number
  total_created: number
  published_rate: number
}

export default function Dashboard()
{
    const [kpis, setKpis] = useState<KPI | null>(null)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/kpis")
        .then(res => res.json())
        .then(data=>setKpis(data))
    }, [])

    return(
        <div className="">
            <h1>Dashboard</h1>
            <div className="flex flex-row justify-around p-3 bg-slate-900 " >
                 <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md" >
                    <p className="text-gray-400 text-sm" >Uploaded</p>
                    <h2 className="text-3xl font-bold mt-2" >{kpis ? kpis.total_uploaded: 'Loading..'}</h2>
                 </div>
                 <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md" >
                    <p className="text-gray-400 text-sm" >Created</p>
                    <h2 className="text-3xl font-bold mt-2" >{kpis ? kpis.total_created: 'Loading..'}</h2>
                 </div>
                 <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md" >
                    <p className="text-gray-400 text-sm" >Published</p>
                    <h2 className="text-3xl font-bold mt-2" >{kpis ? kpis.total_published: 'Loading..'}</h2>
                 </div>
                 <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md" >
                    <p className="text-gray-400 text-sm" >Published Rate</p>
                    <h2 className="text-3xl font-bold mt-2" >{kpis ? kpis.published_rate: 'Loading..'}</h2>
                 </div>
            </div>
        </div>
    )
}
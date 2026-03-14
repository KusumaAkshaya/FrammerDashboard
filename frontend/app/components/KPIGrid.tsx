import KPIcard from "./KPIcard"

function formatTitle(key: string) {

  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())

}

export default function KPIGrid({ data }: any) {

  if (!data) {
    return (
      <div className="text-white text-lg">
        Loading KPIs...
      </div>
    )
  }

  return (

    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">

      {Object.entries(data).map(([key, value]) => (

        <KPIcard
          key={key}
          title={formatTitle(key)}
          value={value}
        />

      ))}

    </div>

  )

}
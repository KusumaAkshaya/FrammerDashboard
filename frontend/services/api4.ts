import axios from "axios"

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
})

/* OUTPUT TYPE DISTRIBUTION */

export const fetchOutputDistribution = () =>
  API.get("/output/distribution")

/* OUTPUT TREND */

export const fetchOutputTrend = () =>
  API.get("/output/trend")


/* INPUT VS OUTPUT MATRIX */

export const fetchInputOutputMatrix = () =>
  API.get("/output/input-output")


/* OUTPUT PUBLISH FUNNEL */

export const fetchOutputPublishFunnel = () =>
  API.get("/output/publish-funnel")


/* CHANNEL OUTPUT BREAKDOWN */

export const fetchChannelOutputBreakdown = () =>
  API.get("/output/channel-breakdown")


/* OUTPUT DURATION ANALYTICS */

export const fetchOutputDurationStats = () =>
  API.get("/output/duration-stats")

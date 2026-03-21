import axios from "axios";


const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

/* OUTPUT TYPE DISTRIBUTION */
export const fetchOutputDistribution = async () => {
  const res = await API.get("/output/distribution");
  return res.data;
};

/* OUTPUT TREND */
export const fetchOutputTrend = async () => {
  const res = await API.get("/output/trend");
  return res.data;
};

/* INPUT VS OUTPUT MATRIX */
export const fetchInputOutputMatrix = async () => {
  const res = await API.get("/output/input-output");
  return res.data;
};

/* OUTPUT PUBLISH FUNNEL */
export const fetchOutputPublishFunnel = async () => {
  const res = await API.get("/output/publish-funnel");
  return res.data;
};

/* CHANNEL OUTPUT BREAKDOWN */
export const fetchChannelOutputBreakdown = async () => {
  const res = await API.get("/output/channel-breakdown");
  return res.data;
};

/* OUTPUT DURATION ANALYTICS */
export const fetchOutputDurationStats = async () => {
  const res = await API.get("/output/duration-stats");
  return res.data;
};
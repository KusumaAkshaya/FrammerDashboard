"use client";

import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});


API.interceptors.request.use((config) => {
  console.log("API CALL:", `${config.baseURL}${config.url}`);
  return config;
});

// ===================== API CALLS ===================== //

export const fetchKPIs = () => API.get("/dashboard/kpi");

export const fetchMonthlyTrend = () =>
  API.get("/dashboard/monthly-trend");

export const fetchPlatforms = () =>
  API.get("/dashboard/platforms");

export const fetchChannels = (platform: string) =>
  API.get(`/dashboard/channels`, {
    params: { platform },
  });

export const fetchAlerts = () =>
  API.get("/dashboard/alerts");

export const fetchMonthDuration = () =>
  API.get("/dashboard/monthly-duration-trend");

// ✅ FIXED TYPE (no any)
export const fetchVideoDetails = (
  params: Record<string, string | number>
) =>
  API.get("/dashboard/video-details", { params });
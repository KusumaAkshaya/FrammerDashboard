"use client";

import DistributionPanel from "./DistributionPanel";
import InteractionAnalysis from "./InteractionAnalysis";

export default function DashboardShell() {
  return (
    <div className="space-y-6 bg-[#020617]">
      <DistributionPanel />
      <InteractionAnalysis />
    </div>
  );
}
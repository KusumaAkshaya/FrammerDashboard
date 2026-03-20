"use client";

import { useState } from "react";
import Chatbot from "./Chatbot";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
      
      {/* DASHBOARD */}
      <div
        style={{
          width: open ? "70%" : "100%",
          transition: "width 0.3s ease-in-out",
          overflow: "auto",
        }}
      >
        {children}
      </div>

      {/* CHAT PANEL */}
      <div
        style={{
          width: open ? "30%" : "0%",
          transition: "width 0.6s ease-in-out",
          willChange: "width",
          overflow: "hidden",
          borderLeft: open ? "1px solid #334155" : "none",
          background: "#edecec",
        }}
      >
        <Chatbot open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
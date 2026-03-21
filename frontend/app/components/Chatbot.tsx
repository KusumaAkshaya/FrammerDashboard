"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";

export default function Chatbot({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string; data?: any; sql?: string; columns?: string[]; rowCount?: number }[]
  >([]);
  const [animation, setAnimation] = useState<any>(null);

  const chatRef = useRef<HTMLDivElement>(null);

  // Load animation
  useEffect(() => {
    fetch("/chatbot.json")
      .then((res) => res.json())
      .then(setAnimation);
  }, []);

  // Auto scroll
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        message: userMsg,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.reply,
          data: res.data.data,
          sql: res.data.sql,
          columns: res.data.columns,
          rowCount: res.data.row_count
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server error" },
      ]);
    }
  };

  return (
    <>
      {/* CHAT PANEL */}
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#edecec",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "10px",
            background: "#0B132B",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          AI Assistant
          <span
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer" }}
          >
            ✖
          </span>
        </div>

        {/* Messages */}
        <div
          ref={chatRef}
          style={{
            flex: 1,
            padding: "10px",
            overflowY: "auto",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  background:
                    msg.sender === "user" ? "#7B61FF" : "#1C2541",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  display: "inline-block",
                  fontWeight: 400,
                  fontSize: "14px",
                  maxWidth: "80%",
                }}
              >
                <div style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>

                {/* Display SQL query if available */}
                {msg.sql && (
                  <div style={{
                    marginTop: "8px",
                    padding: "4px 8px",
                    background: "#2a3441",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontFamily: "monospace"
                  }}>
                    <strong>SQL:</strong> {msg.sql}
                  </div>
                )}

                {/* Display data table if available */}
                {msg.data && msg.data.length > 0 && msg.columns && (
                  <div style={{
                    marginTop: "8px",
                    maxHeight: "200px",
                    overflowY: "auto",
                    border: "1px solid #4a5568",
                    borderRadius: "4px"
                  }}>
                    <table style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "12px"
                    }}>
                      <thead>
                        <tr style={{ background: "#2d3748" }}>
                          {msg.columns.map((col, idx) => (
                            <th key={idx} style={{
                              padding: "4px 8px",
                              textAlign: "left",
                              borderBottom: "1px solid #4a5568",
                              fontWeight: "bold"
                            }}>
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {msg.data.slice(0, 10).map((row: any, rowIdx: number) => (
                          <tr key={rowIdx} style={{
                            background: rowIdx % 2 === 0 ? "#1a202c" : "#2d3748"
                          }}>
                            {msg.columns!.map((col, colIdx) => (
                              <td key={colIdx} style={{
                                padding: "4px 8px",
                                borderBottom: "1px solid #4a5568"
                              }}>
                                {row[col]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {msg.data.length > 10 && (
                      <div style={{
                        padding: "4px 8px",
                        background: "#2d3748",
                        textAlign: "center",
                        fontSize: "11px",
                        color: "#a0aec0"
                      }}>
                        ... and {msg.data.length - 10} more rows
                      </div>
                    )}
                  </div>
                )}

                {/* Display row count if available */}
                {msg.rowCount !== undefined && (
                  <div style={{
                    marginTop: "4px",
                    fontSize: "11px",
                    color: "#a0aec0"
                  }}>
                    Total rows: {msg.rowCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              border: "none",
              padding: "10px",
              outline: "none",
            }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            style={{
              background: "#7b61ff",
              color: "white",
              border: "none",
              padding: "10px 15px",
            }}
          >
            ➤
          </button>
        </div>
      </div>

      {/* FLOATING BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: open ? "32%" : "40px",
          width: "80px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          zIndex: 999,
        }}
      >
        {animation && <Lottie animationData={animation} loop />}
      </div>
    </>
  );
}
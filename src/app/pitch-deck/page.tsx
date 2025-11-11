"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  DollarSign,
  Brain,
  Rocket,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: "Solana Transaction Summarizer",
      subtitle: "AI-Powered Blockchain Transaction Analysis",
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div style={{ fontSize: "120px", marginBottom: "20px" }}>🔍</div>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "700",
              background:
                "linear-gradient(to right, #22d3ee, #3b82f6, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Solana Transaction Summarizer
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#d1d5db",
              maxWidth: "900px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            Making blockchain transactions understandable for everyone
          </p>
          <div style={{ display: "flex", gap: "40px", marginTop: "30px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#22d3ee",
              }}
            >
              <Brain size={36} />
              <span style={{ fontSize: "24px", fontWeight: "600" }}>
                AI-Powered
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#a855f7",
              }}
            >
              <Zap size={36} />
              <span style={{ fontSize: "24px", fontWeight: "600" }}>
                Instant Analysis
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#10b981",
              }}
            >
              <DollarSign size={36} />
              <span style={{ fontSize: "24px", fontWeight: "600" }}>
                Micro-Payments
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "The Problem",
      content: (
        <div style={{ height: "100%" }}>
          <h2
            style={{
              fontSize: "56px",
              fontWeight: "700",
              marginBottom: "40px",
              color: "white",
            }}
          >
            The Problem 🤔
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <div
              style={{
                background:
                  "linear-gradient(to right, rgba(127, 29, 29, 0.4), rgba(153, 27, 27, 0.4))",
                padding: "30px",
                borderRadius: "16px",
                borderLeft: "4px solid #ef4444",
              }}
            >
              <h3
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#fca5a5",
                  marginBottom: "15px",
                }}
              >
                Complex Transaction Data
              </h3>
              <p
                style={{
                  fontSize: "22px",
                  color: "#d1d5db",
                  lineHeight: "1.6",
                }}
              >
                Blockchain transactions contain cryptic technical data that's
                difficult for average users to understand
              </p>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(to right, rgba(124, 45, 18, 0.4), rgba(154, 52, 18, 0.4))",
                padding: "30px",
                borderRadius: "16px",
                borderLeft: "4px solid #f97316",
              }}
            >
              <h3
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#fdba74",
                  marginBottom: "15px",
                }}
              >
                Time-Consuming Analysis
              </h3>
              <p
                style={{
                  fontSize: "22px",
                  color: "#d1d5db",
                  lineHeight: "1.6",
                }}
              >
                Users spend hours trying to decode transaction logs, signers,
                and operations
              </p>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(to right, rgba(113, 63, 18, 0.4), rgba(133, 77, 14, 0.4))",
                padding: "30px",
                borderRadius: "16px",
                borderLeft: "4px solid #eab308",
              }}
            >
              <h3
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#fde047",
                  marginBottom: "15px",
                }}
              >
                Limited Accessibility
              </h3>
              <p
                style={{
                  fontSize: "22px",
                  color: "#d1d5db",
                  lineHeight: "1.6",
                }}
              >
                Non-technical users struggle to audit their own transactions and
                verify operations
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Our Solution",
      content: (
        <div style={{ height: "100%" }}>
          <h2
            style={{
              fontSize: "56px",
              fontWeight: "700",
              marginBottom: "40px",
              color: "white",
            }}
          >
            Our Solution ✨
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(8, 145, 178, 0.5), rgba(30, 58, 138, 0.5))",
                padding: "35px",
                borderRadius: "16px",
                border: "1px solid rgba(34, 211, 238, 0.3)",
                transition: "all 0.3s",
              }}
            >
              <div style={{ fontSize: "60px", marginBottom: "15px" }}>🤖</div>
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#67e8f9",
                  marginBottom: "15px",
                }}
              >
                AI-Powered Analysis
              </h3>
              <p
                style={{
                  fontSize: "20px",
                  color: "#d1d5db",
                  lineHeight: "1.5",
                }}
              >
                Groq's LLM analyzes transaction data and provides human-readable
                summaries with key insights
              </p>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(88, 28, 135, 0.5), rgba(157, 23, 77, 0.5))",
                padding: "35px",
                borderRadius: "16px",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                transition: "all 0.3s",
              }}
            >
              <div style={{ fontSize: "60px", marginBottom: "15px" }}>⚡</div>
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#c084fc",
                  marginBottom: "15px",
                }}
              >
                Instant Results
              </h3>
              <p
                style={{
                  fontSize: "20px",
                  color: "#d1d5db",
                  lineHeight: "1.5",
                }}
              >
                Get comprehensive transaction analysis in seconds, not hours
              </p>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(6, 78, 59, 0.5), rgba(4, 120, 87, 0.5))",
                padding: "35px",
                borderRadius: "16px",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                transition: "all 0.3s",
              }}
            >
              <div style={{ fontSize: "60px", marginBottom: "15px" }}>💰</div>
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#6ee7b7",
                  marginBottom: "15px",
                }}
              >
                Pay-Per-Use Model
              </h3>
              <p
                style={{
                  fontSize: "20px",
                  color: "#d1d5db",
                  lineHeight: "1.5",
                }}
              >
                Only 0.001 USDC per analysis using FareMeter's micro-payment
                infrastructure
              </p>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(30, 58, 138, 0.5), rgba(49, 46, 129, 0.5))",
                padding: "35px",
                borderRadius: "16px",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                transition: "all 0.3s",
              }}
            >
              <div style={{ fontSize: "60px", marginBottom: "15px" }}>📊</div>
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#93c5fd",
                  marginBottom: "15px",
                }}
              >
                Structured Insights
              </h3>
              <p
                style={{
                  fontSize: "20px",
                  color: "#d1d5db",
                  lineHeight: "1.5",
                }}
              >
                View transaction type, status, fees, signers, actions, and
                AI-generated summaries
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "How It Works",
      content: (
        <div style={{ height: "100%" }}>
          <h2
            style={{
              fontSize: "56px",
              fontWeight: "700",
              marginBottom: "40px",
              color: "white",
            }}
          >
            How It Works 🔄
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "25px",
                background:
                  "linear-gradient(to right, rgba(30, 41, 59, 0.5), rgba(51, 65, 85, 0.5))",
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid rgba(71, 85, 105, 0.3)",
                transition: "all 0.3s",
              }}
            >
              <div
                style={{
                  background: "#06b6d4",
                  color: "white",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "700",
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#67e8f9",
                    marginBottom: "10px",
                  }}
                >
                  Connect Phantom Wallet
                </h3>
                <p style={{ fontSize: "20px", color: "#d1d5db" }}>
                  User connects their Phantom wallet on Solana Devnet
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "25px",
                background:
                  "linear-gradient(to right, rgba(30, 41, 59, 0.5), rgba(51, 65, 85, 0.5))",
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid rgba(71, 85, 105, 0.3)",
                transition: "all 0.3s",
              }}
            >
              <div
                style={{
                  background: "#a855f7",
                  color: "white",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "700",
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#c084fc",
                    marginBottom: "10px",
                  }}
                >
                  Enter Transaction Hash
                </h3>
                <p style={{ fontSize: "20px", color: "#d1d5db" }}>
                  User pastes any Solana transaction signature from devnet
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "25px",
                background:
                  "linear-gradient(to right, rgba(30, 41, 59, 0.5), rgba(51, 65, 85, 0.5))",
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid rgba(71, 85, 105, 0.3)",
                transition: "all 0.3s",
              }}
            >
              <div
                style={{
                  background: "#10b981",
                  color: "white",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "700",
                  flexShrink: 0,
                }}
              >
                3
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#6ee7b7",
                    marginBottom: "10px",
                  }}
                >
                  Make Micro-Payment
                </h3>
                <p style={{ fontSize: "20px", color: "#d1d5db" }}>
                  Pay 0.001 USDC via FareMeter's payment middleware
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "25px",
                background:
                  "linear-gradient(to right, rgba(30, 41, 59, 0.5), rgba(51, 65, 85, 0.5))",
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid rgba(71, 85, 105, 0.3)",
                transition: "all 0.3s",
              }}
            >
              <div
                style={{
                  background: "#3b82f6",
                  color: "white",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "700",
                  flexShrink: 0,
                }}
              >
                4
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#93c5fd",
                    marginBottom: "10px",
                  }}
                >
                  AI Analysis
                </h3>
                <p style={{ fontSize: "20px", color: "#d1d5db" }}>
                  Groq LLM analyzes the transaction and generates insights
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "25px",
                background:
                  "linear-gradient(to right, rgba(30, 41, 59, 0.5), rgba(51, 65, 85, 0.5))",
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid rgba(71, 85, 105, 0.3)",
                transition: "all 0.3s",
              }}
            >
              <div
                style={{
                  background: "#ec4899",
                  color: "white",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "700",
                  flexShrink: 0,
                }}
              >
                5
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#f9a8d4",
                    marginBottom: "10px",
                  }}
                >
                  View Results
                </h3>
                <p style={{ fontSize: "20px", color: "#d1d5db" }}>
                  Get comprehensive analysis with structured data and AI summary
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Tech Stack & Future",
      content: (
        <div
          style={{
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "48px",
                fontWeight: "700",
                marginBottom: "30px",
                color: "white",
              }}
            >
              Tech Stack 🛠️
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  background: "rgba(30, 41, 59, 0.5)",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(71, 85, 105, 0.3)",
                }}
              >
                <h4
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#22d3ee",
                    marginBottom: "10px",
                  }}
                >
                  Frontend
                </h4>
                <p style={{ color: "#d1d5db", fontSize: "18px" }}>
                  Next.js 14, React, TypeScript
                </p>
              </div>
              <div
                style={{
                  background: "rgba(30, 41, 59, 0.5)",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(71, 85, 105, 0.3)",
                }}
              >
                <h4
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#a855f7",
                    marginBottom: "10px",
                  }}
                >
                  Blockchain
                </h4>
                <p style={{ color: "#d1d5db", fontSize: "18px" }}>
                  Solana Web3.js, Phantom Wallet
                </p>
              </div>
              <div
                style={{
                  background: "rgba(30, 41, 59, 0.5)",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(71, 85, 105, 0.3)",
                }}
              >
                <h4
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#10b981",
                    marginBottom: "10px",
                  }}
                >
                  Payments
                </h4>
                <p style={{ color: "#d1d5db", fontSize: "18px" }}>
                  FareMeter Middleware, USDC
                </p>
              </div>
              <div
                style={{
                  background: "rgba(30, 41, 59, 0.5)",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(71, 85, 105, 0.3)",
                }}
              >
                <h4
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#3b82f6",
                    marginBottom: "10px",
                  }}
                >
                  AI
                </h4>
                <p style={{ color: "#d1d5db", fontSize: "18px" }}>
                  Groq API (GPT-OSS-20B)
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2
              style={{
                fontSize: "48px",
                fontWeight: "700",
                marginBottom: "30px",
                color: "white",
              }}
            >
              Future Roadmap 🚀
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(to right, rgba(8, 145, 178, 0.3), rgba(6, 182, 212, 0.3))",
                  padding: "20px",
                  borderRadius: "12px",
                  borderLeft: "4px solid #06b6d4",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Rocket size={24} style={{ color: "#22d3ee" }} />
                  <h4
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#67e8f9",
                    }}
                  >
                    Mainnet Launch
                  </h4>
                </div>
                <p style={{ color: "#d1d5db", fontSize: "18px" }}>
                  Deploy to Solana mainnet-beta
                </p>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(to right, rgba(88, 28, 135, 0.3), rgba(126, 34, 206, 0.3))",
                  padding: "20px",
                  borderRadius: "12px",
                  borderLeft: "4px solid #a855f7",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Brain size={24} style={{ color: "#a855f7" }} />
                  <h4
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#c084fc",
                    }}
                  >
                    Advanced AI Models
                  </h4>
                </div>
                <p style={{ color: "#d1d5db", fontSize: "18px" }}>
                  Integrate multiple AI models for deeper analysis
                </p>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(to right, rgba(6, 78, 59, 0.3), rgba(5, 150, 105, 0.3))",
                  padding: "20px",
                  borderRadius: "12px",
                  borderLeft: "4px solid #10b981",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <TrendingUp size={24} style={{ color: "#10b981" }} />
                  <h4
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#6ee7b7",
                    }}
                  >
                    Batch Analysis
                  </h4>
                </div>
                <p style={{ color: "#d1d5db", fontSize: "18px" }}>
                  Analyze multiple transactions at once
                </p>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(to right, rgba(30, 58, 138, 0.3), rgba(37, 99, 235, 0.3))",
                  padding: "20px",
                  borderRadius: "12px",
                  borderLeft: "4px solid #3b82f6",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Zap size={24} style={{ color: "#3b82f6" }} />
                  <h4
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#93c5fd",
                    }}
                  >
                    Real-time Monitoring
                  </h4>
                </div>
                <p style={{ color: "#d1d5db", fontSize: "18px" }}>
                  Watch and analyze transactions in real-time
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (currentSlide < slides.length - 1) {
          nextSlide();
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (currentSlide > 0) {
          prevSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides.length]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Link
        href="/"
        style={{
          position: "absolute",
          top: "25px",
          left: "25px",
          cursor: "pointer",
          padding: "10px",
          borderRadius: "10%",
          background: "rgba(51, 65, 85, 0.5)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "0.3s",
          backdropFilter: "blur(6px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.background = "rgba(71, 85, 105, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "rgba(51, 65, 85, 0.5)";
        }}
      >
        <ChevronLeft size={22} /> <span>Home</span>
      </Link>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1400px" }}>
          <div
            style={{
              background: "rgba(30, 41, 59, 0.4)",
              backdropFilter: "blur(16px)",
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(71, 85, 105, 0.5)",
              padding: "50px",
              minHeight: "600px",
            }}
          >
            {slides[currentSlide].content}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div
        style={{
          paddingBottom: "40px",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            style={{
              background: "rgba(51, 65, 85, 0.5)",
              color: "white",
              padding: "16px",
              borderRadius: "50%",
              border: "none",
              cursor: currentSlide === 0 ? "not-allowed" : "pointer",
              opacity: currentSlide === 0 ? 0.5 : 1,
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              if (currentSlide !== 0) {
                e.currentTarget.style.background = "rgba(71, 85, 105, 0.5)";
                e.currentTarget.style.transform = "scale(1.1)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(51, 65, 85, 0.5)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <div style={{ display: "flex", gap: "12px" }}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  height: "12px",
                  width: index === currentSlide ? "48px" : "12px",
                  borderRadius: "6px",
                  border: "none",
                  background:
                    index === currentSlide
                      ? "linear-gradient(to right, #22d3ee, #3b82f6)"
                      : "#475569",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (index !== currentSlide) {
                    e.currentTarget.style.background = "#64748b";
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentSlide) {
                    e.currentTarget.style.background = "#475569";
                  }
                }}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            style={{
              background: "rgba(51, 65, 85, 0.5)",
              color: "white",
              padding: "16px",
              borderRadius: "50%",
              border: "none",
              cursor:
                currentSlide === slides.length - 1 ? "not-allowed" : "pointer",
              opacity: currentSlide === slides.length - 1 ? 0.5 : 1,
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              if (currentSlide !== slides.length - 1) {
                e.currentTarget.style.background = "rgba(71, 85, 105, 0.5)";
                e.currentTarget.style.transform = "scale(1.1)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(51, 65, 85, 0.5)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </div>
  );
}

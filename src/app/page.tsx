"use client";

import { useEffect, useState } from "react";
import { createFareMeterClient } from "@/lib/faremeter-client";
import { AVAILABLE_TOKENS, SOLANA_API, USDC_MINT_ADDRESS } from "@/types/constant";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FaCopy, FaWallet, FaChartLine } from "react-icons/fa";

export default function Home() {
  const [selectedToken, setSelectedToken] = useState("solana");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [solBalance, setSolBalance] = useState<string>("");
  const [usdcBalance, setUsdcBalance] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const connectWallet = async () => {
    try {
      const provider: any = (window as any).solana;
      if (!provider || !provider.isPhantom) {
        alert("Phantom Wallet is not installed");
        return;
      }
      const resp = await provider.connect();
      setWalletAddress(resp.publicKey.toString());
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError("Failed to connect wallet");
    }
  };

  const fetchBalances = async (address: string) => {
    try {
      const connection = new Connection(SOLANA_API);
      const pubkey = new PublicKey(address);

      const sol = await connection.getBalance(pubkey);
      setSolBalance((sol / LAMPORTS_PER_SOL).toFixed(4));

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubkey, {
        mint: new PublicKey(USDC_MINT_ADDRESS),
      });

      const balance =
        tokenAccounts.value[0]?.account.data.parsed.info.tokenAmount.uiAmount ?? 0;
      setUsdcBalance(balance.toFixed(2));
    } catch (e) {
      console.warn("Balance fetch failed (not critical):", e);
    }
  };

  useEffect(() => {
    if (!walletAddress) return;
    fetchBalances(walletAddress);
    const interval = setInterval(() => {
      fetchBalances(walletAddress);
    }, 60000);
    return () => clearInterval(interval);
  }, [walletAddress]);

  const handleFetchPrice = async () => {
    if (!walletAddress) {
      setError("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    setError("");
    setPrice("");

    try {
      const fetchWithPayment = await createFareMeterClient();

      const res = await fetchWithPayment("/client-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: selectedToken }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

      const data = await res.json();
      if (data?.price) setPrice(data.price);
      else setError("Failed to fetch price from service agent.");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "auto",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)",
        color: "white",
        fontFamily: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "auto",
      }}
    >
      {/* Animated Background Orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite 1s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite 2s",
          }}
        />
      </div>

      <style>{`
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0f172a;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
          border-radius: 10px;
          border: 2px solid #0f172a;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
        }
        
        /* Firefox Scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #06b6d4 #0f172a;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Navbar */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          borderBottom: "1px solid rgba(51, 65, 85, 0.5)",
          background: "rgba(2, 6, 23, 0.8)",
          backdropFilter: "blur(20px)",
          transform: "scale(0.95)",
          transformOrigin: "top center",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(6, 182, 212, 0.3)",
              }}
            >
              <FaChartLine style={{ color: "white" }} size={20} />
            </div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CryptoPricePro
            </h2>
          </div>

          {walletAddress ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(51, 65, 85, 0.5)",
                borderRadius: "12px",
                padding: "10px 16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              <FaWallet style={{ color: "#06b6d4" }} size={16} />
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "14px",
                  color: "#cbd5e1",
                }}
              >
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
              <button
                onClick={handleCopy}
                style={{
                  position: "relative",
                  padding: "6px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "6px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(51, 65, 85, 0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <FaCopy size={14} style={{ color: "#94a3b8" }} />
                {copied && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-40px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#10b981",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
                      animation: "fadeIn 0.3s ease-out",
                    }}
                  >
                    Copied!
                  </div>
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                background: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
                border: "none",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
                color: "white",
                fontSize: "14px",
                boxShadow: "0 4px 16px rgba(6, 182, 212, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(6, 182, 212, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(6, 182, 212, 0.3)";
              }}
            >
              <FaWallet size={16} />
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Main Section */}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "40px 24px",
          transform: "scale(0.95)",
          transformOrigin: "top center",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "700",
              marginBottom: "12px",
              background: "linear-gradient(135deg, #ffffff 0%, #06b6d4 50%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: "1.2",
            }}
          >
            Real-Time Token Prices
          </h1>
          <p style={{ fontSize: "16px", color: "#94a3b8", maxWidth: "600px", margin: "0 auto" }}>
            Pay with Solana USDC to access live cryptocurrency market data instantly
          </p>
        </div>

        {/* Balance Cards */}
        {walletAddress && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.5) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(51, 65, 85, 0.5)",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <p style={{ color: "#94a3b8", fontWeight: 500, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  SOL Balance
                </p>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "rgba(6, 182, 212, 0.2)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#06b6d4", fontSize: "12px", fontWeight: "bold" }}>◎</span>
                </div>
              </div>
              <h3 style={{ color: "#06b6d4", fontSize: "28px", fontWeight: "700", margin: 0 }}>
                {solBalance ? `${solBalance}` : "—"}
              </h3>
              <p style={{ color: "#64748b", fontSize: "12px", marginTop: "4px" }}>Solana Network</p>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.5) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(51, 65, 85, 0.5)",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <p style={{ color: "#94a3b8", fontWeight: 500, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  USDC Balance
                </p>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "rgba(16, 185, 129, 0.2)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#10b981", fontSize: "12px", fontWeight: "bold" }}>$</span>
                </div>
              </div>
              <h3 style={{ color: "#10b981", fontSize: "28px", fontWeight: "700", margin: 0 }}>
                {usdcBalance ? `${usdcBalance}` : "—"}
              </h3>
              <p style={{ color: "#64748b", fontSize: "12px", marginTop: "4px" }}>USD Coin</p>
            </div>
          </div>
        )}

        {/* Main Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.7) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(51, 65, 85, 0.5)",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Token Selection */}
          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="token"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#cbd5e1",
                marginBottom: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Select Cryptocurrency
            </label>
            <div style={{ position: "relative" }}>
              <select
                id="token"
                value={selectedToken}
                onChange={(e) => {
                  setSelectedToken(e.target.value);
                  setPrice("");
                }}
                style={{
                  width: "100%",
                  padding: "16px 40px 16px 16px",
                  borderRadius: "12px",
                  border: "2px solid rgba(51, 65, 85, 0.5)",
                  background: "rgba(2, 6, 23, 0.8)",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  appearance: "none",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(6, 182, 212, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {AVAILABLE_TOKENS.map((token) => (
                  <option key={token} value={token} style={{fontFamily:"'Poppins'"}}>
                    {token.toUpperCase()}
                  </option>
                ))}
              </select>
              <div
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#94a3b8",
                }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Fetch Button */}
          <button
            onClick={handleFetchPrice}
            disabled={loading || !walletAddress}
            style={{
              width: "100%",
              padding: "18px 24px",
              borderRadius: "12px",
              border: "none",
              background:
                loading || !walletAddress
                  ? "rgba(71, 85, 105, 0.5)"
                  : "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading || !walletAddress ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              boxShadow:
                loading || !walletAddress ? "none" : "0 4px 16px rgba(16, 185, 129, 0.3)",
              transition: "all 0.3s ease",
              opacity: loading || !walletAddress ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading && walletAddress) {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && walletAddress) {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(16, 185, 129, 0.3)";
              }
            }}
          >
            {loading ? (
              <>
                <svg
                  style={{ animation: "spin 1s linear infinite" }}
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    style={{ opacity: 0.75 }}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Fetching Price...
              </>
            ) : (
              <>
                <span style={{ fontSize: "24px" }}>💰</span>
                Get Price (USDC Payment)
              </>
            )}
          </button>

          {/* Result */}
          {price && (
            <div
              style={{
                marginTop: "24px",
                padding: "24px",
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
                borderLeft: "4px solid #10b981",
                borderRadius: "12px",
                animation: "fadeIn 0.5s ease-out",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "4px", fontWeight: 500 }}>
                    Current Price
                  </p>
                  <p style={{ fontSize: "28px", fontWeight: "700", color: "#10b981", margin: 0 }}>
                    ${price}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "4px" }}>Token</p>
                  <p style={{ fontSize: "20px", fontWeight: "700", color: "white", margin: 0, textTransform: "uppercase" }}>
                    {selectedToken}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !error.includes("Balance") && (
            <div
              style={{
                marginTop: "24px",
                padding: "16px 20px",
                background: "rgba(127, 29, 29, 0.5)",
                border: "1px solid rgba(153, 27, 27, 0.5)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                animation: "fadeIn 0.3s ease-out",
              }}
            >
              <span style={{ fontSize: "20px" }}>⚠️</span>
              <p style={{ color: "#fecaca", fontWeight: 500, margin: 0 }}>{error}</p>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          <div
            style={{
              background: "rgba(30, 41, 59, 0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(51, 65, 85, 0.5)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>⚡</div>
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0 }}>Lightning Fast</p>
          </div>
          <div
            style={{
              background: "rgba(30, 41, 59, 0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(51, 65, 85, 0.5)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>🔒</div>
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0 }}>Secure Payments</p>
          </div>
          <div
            style={{
              background: "rgba(30, 41, 59, 0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(51, 65, 85, 0.5)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>📊</div>
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0 }}>Real-Time Data</p>
          </div>
        </div>
      </main>
    </div>
  );
}
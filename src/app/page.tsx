"use client";

import { useEffect, useState } from "react";
import { createFareMeterClient } from "@/lib/faremeter-client";
import { AVAILABLE_TOKENS, SOLANA_API, USDC_MINT_ADDRESS } from "@/types/constant";
import { Connection, PublicKey } from "@solana/web3.js";
import { FaCopy } from "react-icons/fa";

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

      // Get SOL balance
      const sol = await connection.getBalance(pubkey);
      setSolBalance((sol / 1e9).toFixed(4));

      // Fetch asset balance from token accounts (USDC)
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

  // Fetch balances on wallet connect + auto-refresh every 20s
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
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid #334155",
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Token Price Viewer</h2>

        {walletAddress ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#1e293b",
              borderRadius: "10px",
              padding: "8px 14px",
              border: "1px solid #334155",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "14px",
                color: "#a5b4fc",
              }}
            >
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            <div style={{ position: "relative", cursor: "pointer" }} onClick={handleCopy}>
              <FaCopy size={14} />
              {copied && (
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#0ea5e9",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Copied!
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            style={{
              padding: "10px 22px",
              background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Connect Wallet
          </button>
        )}
      </nav>

      {/* Main Section */}
      <main
        style={{
          maxWidth: "800px",
          margin: "50px auto",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "700",
            marginBottom: "10px",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          Fetch Real-Time Token Prices
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "40px", color: "#94a3b8" }}>
          Pay with Solana USDC to view real-time crypto prices
        </p>

        {walletAddress && (
          <div
            style={{
              background: "#1e293b",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "30px",
              display: "flex",
              justifyContent: "space-around",
              border: "1px solid #334155",
            }}
          >
            <div>
              <p style={{ color: "#cbd5e1", fontWeight: 500 }}>SOL Balance</p>
              <h3 style={{ color: "#22d3ee", fontSize: "20px" }}>
                {solBalance ? `${solBalance} SOL` : "—"}
              </h3>
            </div>
            <div>
              <p style={{ color: "#cbd5e1", fontWeight: 500 }}>USDC Balance</p>
              <h3 style={{ color: "#facc15", fontSize: "20px" }}>
                {usdcBalance ? `${usdcBalance} USDC` : "—"}
              </h3>
            </div>
          </div>
        )}

        <div
          style={{
            background: "#1e293b",
            borderRadius: "16px",
            padding: "30px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            border: "1px solid #334155",
          }}
        >
          {/* Token Selection */}
          <div style={{ marginBottom: "25px" }}>
            <label htmlFor="token" style={{ fontWeight: 600, fontSize: "16px" }}>
              Select Token
            </label>
            <select
              id="token"
              value={selectedToken}
              onChange={(e) => {
                setSelectedToken(e.target.value);
                setPrice("");
              }}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "2px solid #334155",
                background: "#0f172a",
                color: "white",
                fontSize: "15px",
              }}
            >
              {AVAILABLE_TOKENS.map((token) => (
                <option key={token} value={token}>
                  {token.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Fetch Button */}
          <button
            onClick={handleFetchPrice}
            disabled={loading || !walletAddress}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "8px",
              border: "none",
              background:
                loading || !walletAddress
                  ? "#475569"
                  : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading || !walletAddress ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Fetching Price..." : "💰 Get Price (USDC Payment)"}
          </button>

          {/* Result */}
          {price && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                borderRadius: "12px",
                background: "rgba(16,185,129,0.1)",
                borderLeft: "4px solid #10b981",
                fontSize: "18px",
              }}
            >
              <strong>{selectedToken.toUpperCase()} Price:</strong> ${price}
            </div>
          )}

          {/* Error */}
          {error && !error.includes("Balance") && (
            <div
              style={{
                marginTop: "25px",
                padding: "16px",
                borderRadius: "8px",
                background: "#7f1d1d",
                color: "#fecaca",
                border: "1px solid #991b1b",
              }}
            >
              ⚠️ {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

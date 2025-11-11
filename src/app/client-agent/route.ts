import { NextRequest, NextResponse } from "next/server";
import { common } from "@faremeter/middleware";
import {
  x402Exact,
  type KnownCluster,
  type KnownSPLToken,
} from "@faremeter/info/solana";
import { fetchAllTokenPrices } from "../service-agent/serviceAgent";
import { AVAILABLE_TOKENS, GROQ_API_KEY } from "@/types/constant";


const PAYTO_ADDRESS = process.env.PAYTO_ADDRESS!;
const FACILITATOR_URL =
  process.env.FAREMETER_FACILITATOR_URL || "https://facilitator.corbits.dev";
const NETWORK = process.env.FAREMETER_NETWORK || "devnet";
const ASSET = process.env.ASSET || "USDC";
const AMOUNT = process.env.PAYMENT_AMOUNT || "1000";

const network = NETWORK as KnownCluster;
const asset = ASSET as KnownSPLToken;

const { getPaymentRequiredResponse } =
  common.createPaymentRequiredResponseCache();

export async function POST(req: NextRequest) {
  const headers: Record<string, string> = {};
  req.headers.forEach((v, k) => (headers[k.toLowerCase()] = v));
  const url = new URL(req.url);
  const resource = url.toString();

  let paymentResponse: { status: number; body: any } | undefined;

  const paymentRequirements = x402Exact({
    network,
    asset,
    amount: AMOUNT,
    payTo: PAYTO_ADDRESS,
  });

  const accepts = paymentRequirements.map((req) => ({
    ...req,
    resource,
    description: "Access to token price API via LLM",
    mimeType: "application/json",
  }));

  const middlewareResponse = await common.handleMiddlewareRequest({
    facilitatorURL: FACILITATOR_URL,
    accepts,
    resource,
    getPaymentRequiredResponse,
    getHeader: (key: string) => headers[key.toLowerCase()] || headers[key],
    sendJSONResponse: (status: number, body: any) => {
      paymentResponse = { status, body };
      return body;
    },
  });

  // Require payment first
  if (middlewareResponse || paymentResponse) {
    return NextResponse.json(paymentResponse!.body, {
      status: paymentResponse!.status,
    });
  }

  const body = await req.json();
  const token = body.token?.toLowerCase();

  if (!token || !AVAILABLE_TOKENS.includes(token)) {
    return NextResponse.json(
      { success: false, error: "Invalid or missing token" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Service Agent — fetch all tokens via LLM
    const allTokenPrices = await fetchAllTokenPrices();

    // Step 2: Client Agent LLM extracts specific token price
    const systemPrompt = `
You are a crypto client agent. 
You are given the following token price data:
${JSON.stringify(allTokenPrices, null, 2)}

Find the token "${token}" and return only this JSON:
{"token": "${token}", "price": "<usd_value>"}
If not found, return {"token": "${token}", "price": "N/A"}.
Return only valid JSON.
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [{ role: "system", content: systemPrompt }],
        temperature: 0,
        max_completion_tokens: 512,
        stream: false,
      }),
    });

    const data = await response.json();
    const llmText = data.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      parsed = JSON.parse(llmText);
    } catch {
      parsed = { token, price: "N/A" };
    }

    return NextResponse.json({
      success: true,
      paid: true,
      timestamp: new Date().toISOString(),
      ...parsed,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch token price",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

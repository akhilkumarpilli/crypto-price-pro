// app/api/serviceAgent/serviceAgent.ts
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export async function fetchAllTokenPrices() {
    // Step 1: Fetch data manually from CoinGecko
    const apiUrl =
        "https://api.coingecko.com/api/v3/simple/price?ids=cosmos,osmosis,solana,ethereum,binancecoin,sui,bitcoin&vs_currencies=usd";

    let rawData;
    try {
        const res = await fetch(apiUrl);
        rawData = await res.json();
    } catch (error) {
        console.error("Error fetching CoinGecko data:", error);
        return [];
    }

    // Step 2: Use LLM to reformat CoinGecko response
    const systemPrompt = `
You are a crypto service agent that formats raw API data.
The input is JSON from the CoinGecko API, mapping tokens to { usd: <price> }.
Convert it into this standardized array format:
[
  {"token": "solana", "price": "165.35"},
  {"token": "bitcoin", "price": "69420.00"}
]
Ensure only these two fields exist per object: token, price.
Return pure JSON (no explanation).
`;

    const userPrompt = `
Here is the raw data from CoinGecko:
${JSON.stringify(rawData, null, 2)}
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-20b",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            temperature: 0,
            max_completion_tokens: 1024,
            stream: false,
        }),
    });

    const data = await response.json();

    try {
        return JSON.parse(data.choices[0].message.content);
    } catch (e) {
        console.error("LLM parsing error:", e);
        return [];
    }
}

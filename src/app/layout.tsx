import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Price Viewer | Token Price Viewer using AI and Solana",
  description: "View trending crypto currency price, pay in USDC, and get instant currency price using AI",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
      </head>
      <body style={{ margin: 0, fontFamily: "Poppins, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}

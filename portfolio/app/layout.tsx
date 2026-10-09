import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const siteUrl = "https://www.yuanbopang.pro";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Yuanbo Pang | AI Agents & Robotics",
  description:
    "Yuanbo Pang is a UC Berkeley EECS researcher working on AI agents, evaluation, robot learning, and embodied intelligence.",
  keywords: [
    "Yuanbo Pang",
    "UC Berkeley",
    "BAIR",
    "Agents' Last Exam",
    "ALE",
    "AI agents",
    "agent evaluation",
    "RLVR",
    "robot learning",
    "embodied AI",
    "robotics",
  ],
  authors: [{ name: "Yuanbo Pang" }],
  creator: "Yuanbo Pang",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Yuanbo Pang | AI Agents & Robotics",
    description:
      "UC Berkeley EECS researcher working on long-horizon AI agents, robot learning, and embodied intelligence.",
    url: siteUrl,
    siteName: "Yuanbo Pang",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Yuanbo Pang | AI Agents & Robotics",
    description:
      "UC Berkeley EECS researcher working on long-horizon AI agents, robot learning, and embodied intelligence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

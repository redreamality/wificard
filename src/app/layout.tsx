import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WiFi卡片生成器",
  description: "生成包含WiFi登录信息的可打印卡片",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

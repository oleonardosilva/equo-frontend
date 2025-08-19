import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const font = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Equo",
  description: "Equo é um projeto de TCC do IFSP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${font.className} antialiased`}>
        <div className="page-background">{children}</div>
      </body>
    </html>
  );
}

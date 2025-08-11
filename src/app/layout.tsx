import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar/navbar";


const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], // choose weights you need
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Nexus Website",
  description: "Nexus Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins?.variable}`}>
      <body className="bg-black" suppressHydrationWarning >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";



const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], 
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
        {children}
      </body>
    </html>
  );
}

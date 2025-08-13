import Navbar from "@/components/shared/navbar/navbar";
import { Poppins } from "next/font/google";


const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], 
  subsets: ["latin"],
});

export default function WebPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${poppins?.variable}`}>
            <div>
                <Navbar />
                {children}
            </div>
        </div>
    );
}
import { AppSidebar } from "@/components/app-sidebar";
import SiteHeader from "@/components/ui/side-header";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Poppins } from "next/font/google";


const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], 
  subsets: ["latin"],
});




export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider className={`${poppins?.variable}`}>
            <AppSidebar />
            <div className="w-full rounded mx-4 ">
                <SidebarTrigger />
                <SiteHeader />
                {children}
            </div>
        </SidebarProvider>
    );
}
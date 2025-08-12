import Navbar from "@/components/shared/navbar/navbar";

export default function WebPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div>
                <Navbar />
                {children}
            </div>
        </div>
    );
}
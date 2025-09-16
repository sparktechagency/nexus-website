import { useRouter } from "next/navigation";

interface WebEmptyDataProps {
    customStyle?: string;
    style?: React.CSSProperties;
}


const WebEmptyData: React.FC<WebEmptyDataProps> = ({ customStyle, style }) => {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }
    return (
        <div>
            <div className="h-[250px] md:h-[470px]  rounded-lg flex flex-col justify-center items-center">
                <p className="lg:text-6xl text-2xl font-bold text-gray-200 uppercase text-center">No data found</p>
                <button
                    onClick={handleBack}
                    className={`cursor-pointer flex items-center gap-2 rounded-full px-5 py-2 mt-4 font-bold group ${customStyle || ""}`}
                    style={style}>
                    <svg
                        className="transition-transform duration-300 group-hover:-translate-x-[4px]"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                    GO BACK</button>
            </div>
        </div>
    )
}

export default WebEmptyData





//     < WebEmptyData
// customStyle = {`bg-red-500 text-white `}
// style = {{
//     background: "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
//             }}
//           />

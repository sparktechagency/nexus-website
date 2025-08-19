


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import Image from "next/image"

export default function HomeFooterCurd() {
    return (
        <div className=" bg-black py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Todays Schedule Card */}
                <Card className="col-span-1 bg-[#191829] text-white rounded-2xl border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-xl font-semibold text-white">Todays Schedule</CardTitle>
                        <Clock className="h-6 w-6 text-white" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-end gap-4 bg-[#121421] p-3 rounded-xl">
                            <Image
                                src="/home/photo1.png"
                                alt="Angkara Messi"
                                width={48}
                                height={48}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-xs md:text-base font-medium">Angkara Messi</p>
                                <p className="text-textMediumGray text-sm">10:00 AM - 11:00 AM</p>
                            </div>
                            <span className="bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text text-sm font-semibold">VIP</span>
                        </div>
                        <div className="flex items-end gap-4 bg-[#121421] p-3 rounded-xl">
                            <Image
                                src="/home/photo2.png"
                                alt="Angkara Messi"
                                width={48}
                                height={48}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-xs md:text-base font-medium">Neymar De Junior</p>
                                <p className="text-textMediumGray text-sm">10:00 AM - 11:00 AM</p>
                            </div>
                            <span className="bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text text-sm font-semibold">Bootcamp</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Last Payment Card */}
                <Card className="col-span-1 bg-[#191829] text-white rounded-2xl border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-xl font-semibold text-white">Last Payment</CardTitle>
                        <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.6875 12.125C17.4389 12.125 17.2004 12.2238 17.0246 12.3996C16.8488 12.5754 16.75 12.8139 16.75 13.0625C16.75 13.3111 16.8488 13.5496 17.0246 13.7254C17.2004 13.9012 17.4389 14 17.6875 14H20.8125C21.0611 14 21.2996 13.9012 21.4754 13.7254C21.6512 13.5496 21.75 13.3111 21.75 13.0625C21.75 12.8139 21.6512 12.5754 21.4754 12.3996C21.2996 12.2238 21.0611 12.125 20.8125 12.125H17.6875ZM0.5 4.3125C0.5 3.23506 0.928012 2.20175 1.68988 1.43988C2.45175 0.678012 3.48506 0.25 4.5625 0.25H21.4375C21.971 0.25 22.4993 0.35508 22.9922 0.55924C23.485 0.763399 23.9329 1.06264 24.3101 1.43988C24.6874 1.81712 24.9866 2.26496 25.1908 2.75785C25.3949 3.25073 25.5 3.779 25.5 4.3125V13.6875C25.5 14.221 25.3949 14.7493 25.1908 15.2422C24.9866 15.735 24.6874 16.1829 24.3101 16.5601C23.9329 16.9374 23.485 17.2366 22.9922 17.4408C22.4993 17.6449 21.971 17.75 21.4375 17.75H4.5625C3.48506 17.75 2.45175 17.322 1.68988 16.5601C0.928012 15.7983 0.5 14.7649 0.5 13.6875V4.3125ZM23.625 5.875V4.3125C23.625 3.73234 23.3945 3.17594 22.9843 2.7657C22.5741 2.35547 22.0177 2.125 21.4375 2.125H4.5625C3.98234 2.125 3.42594 2.35547 3.0157 2.7657C2.60547 3.17594 2.375 3.73234 2.375 4.3125V5.875H23.625ZM2.375 7.75V13.6875C2.375 14.895 3.355 15.875 4.5625 15.875H21.4375C22.0177 15.875 22.5741 15.6445 22.9843 15.2343C23.3945 14.8241 23.625 14.2677 23.625 13.6875V7.75H2.375Z" fill="white" />
                        </svg>

                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 bg-[#121421] p-3 rounded-xl">
                            <Image
                                src="/home/photo1.png"
                                alt="Angkara Messi"
                                width={48}
                                height={48}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-xs md:text-base font-medium">Angkara Messi</p>
                                <p className="text-textMediumGray text-sm">$564.00</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-textMediumGray text-sm">12/25/2025</p>
                                <span className="text-purpleAccent text-xs md:text-sm font-semibold">Bootcamp</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-[#121421] p-3 rounded-xl">
                            <Image
                                src="/home/photo1.png"
                                alt="Angkara Messi"
                                width={48}
                                height={48}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-xs md:text-base font-medium">Angkara Messi</p>
                                <p className="text-textMediumGray text-sm">$645.00</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-textMediumGray text-sm">12/25/2025</p>
                                <span className="text-purpleAccent text-xs md:text-sm font-semibold">VIP</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Booking Card */}
                <Card className="col-span-1 bg-[#191829] text-white rounded-2xl border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-xl font-semibold text-white">Upcoming Booking</CardTitle>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21.6212 8.21484C21.1087 8.21484 20.6837 7.78984 20.6837 7.27734V5.74734C19.7162 5.71484 18.58 5.71484 17.2462 5.71484H14.7462C13.4112 5.71484 12.2762 5.71484 11.3087 5.74734V7.27734C11.3087 7.78984 10.8837 8.21484 10.3712 8.21484C9.85872 8.21484 9.43372 7.78984 9.43372 7.27734V5.88234C8.25247 6.03609 7.44122 6.33234 6.87122 6.90234C6.11872 7.65484 5.84372 8.82734 5.74247 10.7148H26.25C26.1487 8.82734 25.8725 7.65484 25.1212 6.90234C24.5512 6.33234 23.74 6.03609 22.5587 5.88234V7.27734C22.5587 7.78984 22.1337 8.21484 21.6212 8.21484ZM26.3012 12.5898C26.3079 13.2507 26.3104 13.9798 26.3087 14.7773V16.0273C26.3087 16.5398 26.7337 16.9648 27.2462 16.9648C27.7587 16.9648 28.1837 16.5398 28.1837 16.0273V14.7773C28.1837 9.80234 28.1837 7.31484 26.4462 5.57734C25.4812 4.61234 24.2837 4.18359 22.5587 3.99234V2.90234C22.5587 2.38984 22.1337 1.96484 21.6212 1.96484C21.1087 1.96484 20.6837 2.38984 20.6837 2.90234V3.87109C19.6887 3.83984 18.5525 3.83984 17.2462 3.83984H14.7462C13.4387 3.83984 12.3037 3.83984 11.3087 3.87109V2.90234C11.3087 2.38984 10.8837 1.96484 10.3712 1.96484C9.85872 1.96484 9.43372 2.38984 9.43372 2.90234V3.99234C7.70872 4.18359 6.51122 4.61234 5.54622 5.57734C3.80872 7.31484 3.80872 9.81484 3.80872 14.7773V17.2773C3.80872 22.2523 3.80872 24.7398 5.54622 26.4773C7.28372 28.2148 9.77122 28.2148 14.7462 28.2148C15.2587 28.2148 15.6837 27.7898 15.6837 27.2773C15.6837 26.7648 15.2587 26.3398 14.7462 26.3398C10.2962 26.3398 8.05872 26.3398 6.87122 25.1523C5.68372 23.9648 5.68372 21.7273 5.68372 17.2773V14.7773C5.68288 13.9807 5.68497 13.2515 5.68997 12.5898H26.3012ZM22.2462 28.8398C18.9712 28.8398 16.3087 26.1773 16.3087 22.9023C16.3087 19.6273 18.9712 16.9648 22.2462 16.9648C25.5212 16.9648 28.1837 19.6273 28.1837 22.9023C28.1837 26.1773 25.5212 28.8398 22.2462 28.8398ZM22.2462 18.8398C20.0087 18.8398 18.1837 20.6648 18.1837 22.9023C18.1837 25.1398 20.0087 26.9648 22.2462 26.9648C24.4837 26.9648 26.3087 25.1398 26.3087 22.9023C26.3087 20.6648 24.4837 18.8398 22.2462 18.8398ZM22.8337 24.8148C23.0212 25.0023 23.2587 25.0898 23.4962 25.0898C23.7337 25.0898 23.9712 25.0023 24.1587 24.8148C24.5212 24.4523 24.5212 23.8523 24.1587 23.4898L23.1837 22.5148V20.4023C23.1837 19.8898 22.7587 19.4648 22.2462 19.4648C21.7337 19.4648 21.3087 19.8898 21.3087 20.4023V22.9023C21.3087 23.1523 21.4087 23.3898 21.5837 23.5648L22.8337 24.8148Z" fill="white" />
                        </svg>

                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 bg-[#121421] p-3 rounded-xl">
                            <Image
                                src="/home/photo1.png"
                                alt="Angkara Messi"
                                width={48}
                                height={48}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-xs md:text-base font-medium">Angkara Messi</p>
                                <p className="text-xs md:text-sm">10:00 AM - 11:00 AM</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-xs md:text-sm">12/25/2025</p>
                                <span className="text-purpleAccent text-xs md:text-sm font-semibold">VIP</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-[#121421] p-3 rounded-xl">
                            <Image
                                src="/home/photo1.png"
                                alt="Angkara Messi"
                                width={48}
                                height={48}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-xs md:text-base font-medium">Angkara Messi</p>
                                <p className="text-xs md:text-sm">10:00 AM - 11:00 AM</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-xs md:text-sm">12/25/2025</p>
                                <span className="text-purpleAccent text-xs md:text-sm font-semibold">Bootcamp</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}








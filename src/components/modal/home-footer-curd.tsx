


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CreditCard, CalendarDays, CalendarClock } from "lucide-react"
import Image from "next/image"

export default function HomeFooterCurd() {
    return (
        <div className=" bg-black px-4 md:px-6 lg:px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Todays Schedule Card */}
                <Card className="col-span-1 bg-[#191829] text-white rounded-2xl border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-xl font-semibold text-white">Todays Schedule</CardTitle>
                        <Clock className="h-6 w-6 text-white" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 bg-[#28283A] p-3 rounded-xl">
                            <Image
                                src="/home/photo1.png"
                                alt="Angkara Messi"
                                width={48}
                                height={48}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-textLightGray text-base font-medium">Angkara Messi</p>
                                <p className="text-textMediumGray text-sm">10:00 AM - 11:00 AM</p>
                            </div>
                            <span className="text-purpleAccent text-sm font-semibold">VIP</span>
                        </div>
                        <div className="flex items-center gap-4 bg-[#28283A] p-3 rounded-xl">
                            <Avatar className="h-12 w-12 rounded-xl">
                                <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Neymar De Junior" />
                                <AvatarFallback>ND</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="text-textLightGray text-base font-medium">Neymar De Junior</p>
                                <p className="text-textMediumGray text-sm">10:00 AM - 11:00 AM</p>
                            </div>
                            <span className="text-purpleAccent text-sm font-semibold">Bootcamp</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Last Payment Card */}
                <Card className="col-span-1 bg-[#191829] text-white rounded-2xl border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-xl font-semibold text-white">Last Payment</CardTitle>
                        <CreditCard className="h-6 w-6 text-white" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 bg-[#28283A] p-3 rounded-xl">
                            <Image
                                src="/home/photo1.png"
                                alt="Angkara Messi"
                                width={48}
                                height={48}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-textLightGray text-base font-medium">Angkara Messi</p>
                                <p className="text-textMediumGray text-sm">$564.00</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-textMediumGray text-sm">12/25/2025</p>
                                <span className="text-purpleAccent text-sm font-semibold">Bootcamp</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-[#28283A] p-3 rounded-xl">
                            <Image
                                src="/home/photo1.png"
                                alt="Angkara Messi"
                                width={48}
                                height={48}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-textLightGray text-base font-medium">Angkara Messi</p>
                                <p className="text-textMediumGray text-sm">$645.00</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-textMediumGray text-sm">12/25/2025</p>
                                <span className="text-purpleAccent text-sm font-semibold">VIP</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Booking Card */}
                <Card className="col-span-1 bg-[#191829] text-white rounded-2xl border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-xl font-semibold text-white">Upcoming Booking</CardTitle>
                        <CalendarClock className="h-6 w-6 text-white" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 bg-[#28283A] p-3 rounded-xl">
                            <Image
                                src="/home/photo1.png"
                                alt="Angkara Messi"
                                width={48}
                                height={48}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-textLightGray text-base font-medium">Angkara Messi</p>
                                <p className="text-textMediumGray text-sm">10:00 AM - 11:00 AM</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-textMediumGray text-sm">12/25/2025</p>
                                <span className="text-purpleAccent text-sm font-semibold">VIP</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-[#28283A] p-3 rounded-xl">
                            <Image
                                src="/home/photo1.png"
                                alt="Angkara Messi"
                                width={48}
                                height={48}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-textLightGray text-base font-medium">Angkara Messi</p>
                                <p className="text-textMediumGray text-sm">10:00 AM - 11:00 AM</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-textMediumGray text-sm">12/25/2025</p>
                                <span className="text-purpleAccent text-sm font-semibold">Bootcamp</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}









import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UploadCloud } from "lucide-react"

export default function EditProfileModal() {
    return (
        <div className="text-[#ffff]">
            <h1 className="text-center text-[24px] py-4 text-[#ffff]">Edit profile</h1>



            <div className="w-full rounded-xl border-none  p-6  shadow-lg">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="gaming-zone" className="text-base font-medium">
                            Gaming Zone
                        </Label>
                        <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-700 bg-[#5E5E5E33]/80 text-gray-400 transition-colors ">
                            <UploadCloud className="h-8 w-8" />
                            <span className="mt-2 text-sm">Upload</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gaming-zone-name" className="text-base font-medium">
                            Gaming Zone Name
                        </Label>
                        <Input
                            id="gaming-zone-name"
                            placeholder="Enter the name of the room"
                            className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="opening-time" className="text-base font-medium">
                                Opening Time
                            </Label>
                            <Input
                                id="opening-time"
                                type="time"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="closing-time" className="text-base font-medium">
                                Closing Time
                            </Label>
                            <Input
                                id="closing-time"
                                type="time"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-base font-medium">
                            Location
                        </Label>
                        <Input
                            id="location"
                            placeholder="Enter the Location"
                            className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="full-name" className="text-base font-medium">
                                Your Full Name
                            </Label>
                            <Input
                                id="full-name"
                                type="tel"
                                placeholder="Enter the your full name"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-number" className="text-base font-medium">
                                Contact Number
                            </Label>
                            <Input
                                id="contact-number"
                                type="tel"
                                placeholder="Enter the contact number"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>


                    <Button
                        className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                        style={{
                            background:
                                "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                        }}
                    >
                        Save Changes
                    </Button>
                    <Button
                        className="w-full py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}


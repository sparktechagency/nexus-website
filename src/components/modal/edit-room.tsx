import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UploadCloud } from "lucide-react"


const EditRoom = () => {
  return (
    <div className="text-[#fff]">
            <h1 className="text-center text-[24px] py-4">Edit Room</h1>



            <div className="w-full rounded-xl border-none  shadow-lg">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="gaming-zone" className="text-base font-medium">
                            Room image
                        </Label>
                        <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-700 bg-[#5E5E5E33]/80 text-gray-400 transition-colors ">
                            <UploadCloud className="h-8 w-8" />
                            <span className="mt-2 text-sm">Upload</span>
                        </div>
                    </div>




                    <div className="space-y-2">
                        <Label htmlFor="room-name" className="text-base font-medium">
                            Room Name
                        </Label>
                        <Input
                            id="room-name"
                            placeholder="Enter the name of the room"
                            className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="pc-number" className="text-base font-medium">
                                Number Of PC
                            </Label>
                            <Input
                                id="pc-number"
                                placeholder="How many pc available here"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pricing" className="text-base font-medium">
                                Pricing
                            </Label>
                            <Input
                                id="pricing"
                                placeholder="Pricing per hour of each one seat"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
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

export default EditRoom

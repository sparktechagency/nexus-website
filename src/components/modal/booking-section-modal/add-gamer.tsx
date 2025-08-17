// import { Button } from '@/components/ui/button'
// import { Dispatch, SetStateAction } from 'react';

// import { useForm, Controller } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"




// const formSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
//   contactNumber: z.string().min(1, "Contact number is required"),
//   date: z.string().min(1, "Date is required"),
//   startingTime: z.string().min(1, "Starting time is required"),
//   pcNumber: z.string().min(1, "Please select a PC number"),
//   duration: z.string().min(1, "Please select a duration"),
// })

// type FormData = z.infer<typeof formSchema>

// interface AddGamerProps {
//   open: boolean;
//   setIsOpen: Dispatch<SetStateAction<boolean>>;
// }

// const AddGamer = ({ open, setIsOpen }: AddGamerProps) => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       contactNumber: "",
//       date: "",
//       startingTime: "",
//       pcNumber: "",
//       duration: "",
//     },
//   })

//   const onSubmit = async (data: FormData) => {
//     console.log("Form submitted:", data)
//     // Handle form submission here
//     setIsOpen(!open)
//     reset()
//   }

//   const handleCancel = () => {
//     reset()
//     setIsOpen(!open)
//   }


//   return (
//     <div>
//       <h1 className="text-center text-[24px] py-4">Add Gamer</h1>


//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="space-y-2">
//           <Label htmlFor="email" className="text-white text-sm">
//             Email
//           </Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder="Enter the name of the room"
//             {...register("email")}
//             className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 "
//           />
//           {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="contactNumber" className="text-white text-sm">
//             Contact Number
//           </Label>
//           <Input
//             id="contactNumber"
//             type="number"
//             placeholder="Enter the contact number"
//             maxLength={11}
//             onInput={(e) => {
//               const target = e.target as HTMLInputElement
//               if (target.value.length > 11) {
//                 target.value = target.value.slice(0, 11)
//               }
//             }}
//             {...register("contactNumber")}
//             className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//           />
//           {errors.contactNumber && <p className="text-red-400 text-xs mt-1">{errors.contactNumber.message}</p>}
//         </div>



//         <div className="space-y-2">
//           <Label htmlFor="date" className="text-white text-sm">
//             Date
//           </Label>
//           <div className="relative">
//             <Input
//               id="date"
//               type="date"
//               {...register("date")}
//               className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 border-gray-700 text-white  [&::-webkit-calendar-picker-indicator]:invert"
//             />
//             {/* <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" /> */}
//           </div>
//           {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
//         </div>




//         <div className="space-y-2">
//           <Label htmlFor="startingTime" className="text-white text-sm">
//             Starting time
//           </Label>
//           <div className="relative">
//             <Input
//               id="startingTime"
//               type="time"
//               {...register("startingTime")}
//               className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 py-6 [&::-webkit-calendar-picker-indicator]:invert"
//             />
//             {/* <ClockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" /> */}
//           </div>
//           {errors.startingTime && <p className="text-red-400 text-xs mt-1">{errors.startingTime.message}</p>}
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="pcNumber" className="text-white text-sm">
//             PC Number
//           </Label>
//           <Controller
//             name="pcNumber"
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger className="w-full rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 ">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-800 border-gray-700">
//                   <SelectItem value="pc1" className="text-white hover:bg-gray-700">
//                     PC 1
//                   </SelectItem>
//                   <SelectItem value="pc2" className="text-white hover:bg-gray-700">
//                     PC 2
//                   </SelectItem>
//                   <SelectItem value="pc3" className="text-white hover:bg-gray-700">
//                     PC 3
//                   </SelectItem>
//                   <SelectItem value="pc4" className="text-white hover:bg-gray-700">
//                     PC 4
//                   </SelectItem>
//                   <SelectItem value="pc5" className="text-white hover:bg-gray-700">
//                     PC 5
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           {errors.pcNumber && <p className="text-red-400 text-xs mt-1">{errors.pcNumber.message}</p>}
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="duration" className="text-white text-sm">
//             Duration
//           </Label>
//           <Controller
//             name="duration"
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger className="w-full rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-800 border-gray-700">
//                   <SelectItem value="1h" className="text-white hover:bg-gray-700">
//                     1 Hour
//                   </SelectItem>
//                   <SelectItem value="2h" className="text-white hover:bg-gray-700">
//                     2 Hours
//                   </SelectItem>
//                   <SelectItem value="3h" className="text-white hover:bg-gray-700">
//                     3 Hours
//                   </SelectItem>
//                   <SelectItem value="4h" className="text-white hover:bg-gray-700">
//                     4 Hours
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration.message}</p>}
//         </div>
//       </form>



//       <div className='space-y-2 mt-8'>
//         <Button
//         type='submit'
//           className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
//           style={{
//             background:
//               "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
//           }}
//         >
//           Add
//         </Button>
//         <Button
//           onClick={handleCancel}
//           className="w-full py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200">
//           Cancel
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default AddGamer



import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction } from 'react';

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  contactNumber: z.string().min(1, "Contact number is required"),
  date: z.string().min(1, "Date is required"),
  startingTime: z.string().min(1, "Starting time is required"),
  pcNumber: z.string().min(1, "Please select a PC number"),
  duration: z.string().min(1, "Please select a duration"),
})

type FormData = z.infer<typeof formSchema>

interface AddGamerProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AddGamer = ({ open, setIsOpen }: AddGamerProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      contactNumber: "",
      date: "",
      startingTime: "",
      pcNumber: "",
      duration: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data)
    // Here you can access all form values in the 'data' object
    // For example:
    // console.log("Email:", data.email)
    // console.log("PC Number:", data.pcNumber)
    // console.log("Duration:", data.duration)
    
    // Handle form submission here (e.g., API call)
    
    setIsOpen(!open)
    reset()
  }

  const handleCancel = () => {
    reset()
    setIsOpen(!open)
  }

  return (
    <div>
      <h1 className="text-center text-[24px] py-4">Add Gamer</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white text-sm">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter the name of the room"
            {...register("email")}
            className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 "
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactNumber" className="text-white text-sm">
            Contact Number
          </Label>
          <Input
            id="contactNumber"
            type="number"
            placeholder="Enter the contact number"
            maxLength={11}
            onInput={(e) => {
              const target = e.target as HTMLInputElement
              if (target.value.length > 11) {
                target.value = target.value.slice(0, 11)
              }
            }}
            {...register("contactNumber")}
            className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {errors.contactNumber && <p className="text-red-400 text-xs mt-1">{errors.contactNumber.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-white text-sm">
            Date
          </Label>
          <div className="relative">
            <Input
              id="date"
              type="date"
              {...register("date")}
              className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 border-gray-700 text-white  [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
          {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="startingTime" className="text-white text-sm">
            Starting time
          </Label>
          <div className="relative">
            <Input
              id="startingTime"
              type="time"
              {...register("startingTime")}
              className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 py-6 [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
          {errors.startingTime && <p className="text-red-400 text-xs mt-1">{errors.startingTime.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pcNumber" className="text-white text-sm">
            PC Number
          </Label>
          <Controller
            name="pcNumber"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 ">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="pc1" className="text-white hover:bg-gray-700">
                    PC 1
                  </SelectItem>
                  <SelectItem value="pc2" className="text-white hover:bg-gray-700">
                    PC 2
                  </SelectItem>
                  <SelectItem value="pc3" className="text-white hover:bg-gray-700">
                    PC 3
                  </SelectItem>
                  <SelectItem value="pc4" className="text-white hover:bg-gray-700">
                    PC 4
                  </SelectItem>
                  <SelectItem value="pc5" className="text-white hover:bg-gray-700">
                    PC 5
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.pcNumber && <p className="text-red-400 text-xs mt-1">{errors.pcNumber.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-white text-sm">
            Duration
          </Label>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="1h" className="text-white hover:bg-gray-700">
                    1 Hour
                  </SelectItem>
                  <SelectItem value="2h" className="text-white hover:bg-gray-700">
                    2 Hours
                  </SelectItem>
                  <SelectItem value="3h" className="text-white hover:bg-gray-700">
                    3 Hours
                  </SelectItem>
                  <SelectItem value="4h" className="text-white hover:bg-gray-700">
                    4 Hours
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration.message}</p>}
        </div>

        <div className='space-y-2 mt-8'>
          <Button
            type="submit"
            className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
            style={{
              background:
                "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Add"}
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            className="w-full py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddGamer
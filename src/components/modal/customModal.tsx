// "use client";
// import {
//     Dialog,
//     DialogContent,
//     DialogTrigger,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { cn } from "@/lib/utils";
// import { DialogDescription } from "@radix-ui/react-dialog";
// import { Dispatch, ReactNode, SetStateAction } from "react";


// interface CustomModalProps {
//     open: boolean;
//     setIsOpen: Dispatch<SetStateAction<boolean>>;
//     children: ReactNode;
//     className?: string;
//     maxWidth?: string;
// }

// export default function CustomModal({ open, setIsOpen, children, className, maxWidth }:CustomModalProps) {

//     const isHalfScreen = className?.includes("max-h-[30vh]");
//     const maxHeightClass = isHalfScreen ? "overflow-y-scroll max-h-screen" : "";

//     return (
//         <Dialog open={open} onOpenChange={setIsOpen} >
//             <DialogTrigger asChild />
//             <DialogContent
//                 className={cn(
//                     "sm:max-w-[425px] bg-[#14151b] shadow-[0_0_10px_3px_rgba(8,112,184,0.5)] backdrop-blur-sm border-none ",
//                     maxWidth,
//                     className?.replace(/max-h-\[[^\]]+\]/g, ""), 
//                     maxHeightClass
                
//                 )}
//             >
//                 <DialogTitle className="hidden"></DialogTitle>
//                 <DialogDescription className=" hidden"></DialogDescription>
//                 {children}
//             </DialogContent>
//         </Dialog>
//     );
// }


"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface CustomModalProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

export default function CustomModal({
  open,
  setIsOpen,
  children,
  className,
  maxWidth,
}: CustomModalProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild />
      <DialogContent
        className={cn(
          // Base styles for modal
          "bg-[#14151b] shadow-[0_0_10px_3px_rgba(8,112,184,0.5)] backdrop-blur-sm border-none",
          // Responsive width: default to 90vw for mobile, 70vw for md, 40vw for xl
          "w-[90vw] sm:max-w-[425px] md:max-w-[70vw] xl:max-w-[40vw]",
          // Responsive height: max 80vh, scrollable if content overflows
          "max-h-[80vh] overflow-y-auto  custom-scrollbar",
          // Padding for content
          "p-4 sm:p-6 xl:p-8",
          // Apply custom maxWidth if provided, otherwise fallback to defaults
          maxWidth,
          // Apply custom className but avoid overriding max-height
          className?.replace(/max-h-\[[^\]]+\]/g, "")
        )}
      >
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
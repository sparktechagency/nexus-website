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

export default function CustomModal({ open, setIsOpen, children, className, maxWidth }:CustomModalProps) {

    const isHalfScreen = className?.includes("max-h-[30vh]");
    const maxHeightClass = isHalfScreen ? "overflow-y-scroll max-h-screen" : "";

    return (
        <Dialog open={open} onOpenChange={setIsOpen} >
            <DialogTrigger asChild />
            <DialogContent
                className={cn(
                    "sm:max-w-[425px] bg-[#14151b] shadow-[0_0_10px_3px_rgba(8,112,184,0.5)] backdrop-blur-sm border-none ",
                    maxWidth,
                    className?.replace(/max-h-\[[^\]]+\]/g, ""), 
                    maxHeightClass
                
                )}
            >
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className=" hidden"></DialogDescription>
                {children}
            </DialogContent>
        </Dialog>
    );
}
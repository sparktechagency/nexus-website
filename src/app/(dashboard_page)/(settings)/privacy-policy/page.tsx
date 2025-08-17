
"use client";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState("");

  console.log(content)
  return (
    <>
      <JoditEditor
        className="text-black "
        value={content}
        config={{
          height: 600,
          placeholder: "Write your terms and conditions here...",
        }}

        onBlur={(newContent) => setContent(newContent)}
      />


      <Button
        className="w-full mt-8 py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
        style={{
          background:
            "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
        }}
      >
        Update
      </Button>
    </>
  );
}

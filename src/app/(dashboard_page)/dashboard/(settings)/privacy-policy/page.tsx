
"use client";


import DashboardLoader from "@/components/DashboardLoader";
import CustomButtonLoader from "@/components/loader/CustomButtonLoader";
import { Button } from "@/components/ui/button";
import { useAddDashboardSettingApiMutation } from "@/redux/dashboard/setting/dashboardSettingApi";
import { useGetPrivacyPolicyApiQuery } from "@/redux/website/accounts/accountApi";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const editorConfig = {
  theme: 'dark',
};

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState("");


  const [addDashboardSettingApi, { isLoading: isUploading }] = useAddDashboardSettingApiMutation()
  const { data: getPrivacyPolicyData, isLoading } = useGetPrivacyPolicyApiQuery("Privacy Policy");
  const privacyContent = getPrivacyPolicyData?.data[0]?.text || ""



  useEffect(() => {
    if (privacyContent) {
      setContent(String(privacyContent));
    }
  }, [privacyContent]);


  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("type", "Privacy Policy");
    formData.append("text", content);

    try {
      const res = await addDashboardSettingApi(formData).unwrap();
      if (res?.status === "success") {
        toast.success(res?.message)
      }
    } catch (error) {
      console.log(error);
    }
  };


  if (isLoading) {
    return <DashboardLoader />
  }

  return (
    <>
      <JoditEditor
        className="text-black "
        value={content}
        config={{
          ...editorConfig,
          height: 600,
          placeholder: "Write your terms and conditions here...",
          style: {
            color: "white", // Additional inline style for the editor
          },
        }}

        onBlur={(newContent) => setContent(newContent)}
      />


      <Button
        className="w-full mt-8 py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
        style={{
          background:
            "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
        }}
        onClick={handleUpdate}
      >
        {
          isUploading ? <CustomButtonLoader /> : "Update"
        }
      </Button>
    </>
  );
}

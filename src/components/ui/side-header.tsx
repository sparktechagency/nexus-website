"use client"

import { usePathname, useRouter } from "next/navigation";
import { pageTitles } from "@/utils/pageTitles";

const SiteHeader = () => {
  const pathname = usePathname();
  const { title, subtitle, icon: Icon, backIcon: BackIcon } = pageTitles[pathname] || {
    title: "",
    subtitle: "",
    icon: undefined,
    backIcon: undefined,
  };
  const router = useRouter();

  const handleNotification = () => {
    router.push("/notification");
  };

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="bg-[#1a1624] p-8 px-4 rounded-xl flex justify-between">
      <div className="flex items-start space-x-3">
        {/* Render the icon only if it exists */}

        <div>
          <h1 className="text-4xl font-semibold flex items-center gap-2">{BackIcon && <BackIcon
            onClick={handleBack}
          />} {title} {Icon && <Icon />}</h1>
          {subtitle && (
            <p className="text-[12px] text-[#949494] pt-1">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <span
          onClick={handleNotification}
          className="cursor-pointer bg-[#fff] p-1 rounded-md"
        >
          {/* Notification SVG */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1C11.7133 0.999962 11.43 1.06155 11.1692 1.18059C10.9084 1.29963 10.6763 1.47333 10.4885 1.68994C10.3008 1.90654 10.1617 2.16098 10.0809 2.43601C10.0001 2.71104 9.97929 3.00024 10.02 3.284C8.57037 3.71149 7.29804 4.59668 6.39319 5.80722C5.48835 7.01777 4.9996 8.48865 5 10V18H4C3.73478 18 3.48043 18.1054 3.29289 18.2929C3.10536 18.4804 3 18.7348 3 19C3 19.2652 3.10536 19.5196 3.29289 19.7071C3.48043 19.8946 3.73478 20 4 20H20C20.2652 20 20.5196 19.8946 20.7071 19.7071C20.8946 19.5196 21 19.2652 21 19C21 18.7348 20.8946 18.4804 20.7071 18.2929C20.5196 18.1054 20.2652 18 20 18H19V10C19.0004 8.48865 18.5117 7.01777 17.6068 5.80722C16.702 4.59668 15.4296 3.71149 13.98 3.284C13.9933 3.19067 14 3.096 14 3C14 2.46957 13.7893 1.96086 13.4142 1.58579C13.0391 1.21071 12.5304 1 12 1ZM14 22C14 22.2652 13.8946 22.5196 13.7071 22.7071C13.5196 22.8946 13.2652 23 13 23H11C10.7348 23 10.4804 22.8946 10.2929 22.7071C10.1054 22.5196 10 22.2652 10 22C10 21.7348 10.1054 21.4804 10.2929 21.2929C10.4804 21.1054 10.7348 21 11 21H13C13.2652 21 13.5196 21.1054 13.7071 21.2929C13.8946 21.4804 14 21.7348 14 22Z"
              fill="url(#paint0_linear_638_4974)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_638_4974"
                x1="3"
                y1="12"
                x2="21"
                y2="12"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6523E7" />
                <stop offset="0.5" stopColor="#023CE3" stopOpacity="0.8" />
                <stop offset="1" stopColor="#6523E7" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SiteHeader;

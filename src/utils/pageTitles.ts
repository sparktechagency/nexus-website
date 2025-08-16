

import { BackIcon, DashboardOverviewIcon } from "@/components/custom-icons";
import { LucideIcon } from "lucide-react";

type PageTitleConfig = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon | React.ComponentType;
  backIcon?: LucideIcon | React.ComponentType;
};




// Type-safe pageTitles using LucideIcon type
export const pageTitles: Record<string, PageTitleConfig> = {
  "/dashboard": {
    title: "Welcome Pauls,",
    icon: DashboardOverviewIcon,
  },
  "/manage-users": {
    title: "Manage User",
    subtitle: "Here you can manage all the users & delete which one you like.",
  },
  "/manage-user": {
    title: "User Profile",
    subtitle: "Here you can see details of the user.",
    backIcon:BackIcon,
  },
  "/manage-user-list": {
    title: "Providers list who earn money",
    backIcon:BackIcon,
  },

  "/manage-provider": {
    title: "Service Provider Profile",
    subtitle: "Here you can see progress of the service provider.",
    backIcon:BackIcon,
  },
  "/manage-provider-list": {
    title: "Gamers list who book gaming zone",
    backIcon:BackIcon,
  },

  "/zone-listing": {
    title: "Zone listing",
    subtitle: "You can see the zone details added by service providers.",
  },
  "/transaction": {
    title: "Transaction",
    subtitle: "Admin can track the providers who buy the subscription plan",
  },
  "/subscription": {
    title: "Subscription Plan",
    subtitle: "Manage your subscription play which was created for  service providers.",
    backIcon:BackIcon,
  },
  "/personal-details": {
    title: "Personal Details",
    subtitle: "You can update your personal information.",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions",
    subtitle: "Here you can update terms & conditions for both of users.",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    subtitle: "Here you can update privacy policy for both of users.",
  },
  "/notification": {
    title: "Notifications",
    backIcon:BackIcon,
  },
};

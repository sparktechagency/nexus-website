

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
  "/dashboard/manage-users": {
    title: "Manage Users",
    subtitle: "Here you can manage all the users & delete which one you like.",
  },
  "/dashboard/manage-user": {
    title: "User Profile",
    subtitle: "Here you can see details of the user.",
    backIcon:BackIcon,
  },
  "/dashboard/manage-user-list": {
    title: "Providers list who earn money",
    backIcon:BackIcon,
  },

  "/dashboard/manage-provider": {
    title: "Service Provider Profile",
    subtitle: "Here you can see progress of the service provider.",
    backIcon:BackIcon,
  },
  "/dashboard/manage-provider-list": {
    title: "Gamers list who book gaming zone",
    backIcon:BackIcon,
  },

  "/dashboard/zone-listing": {
    title: "Zone listing",
    subtitle: "You can see the zone details added by service providers.",
  },
  "/dashboard/transaction": {
    title: "Transaction",
    subtitle: "Admin can track the providers who buy the subscription plan",
  },
  "/dashboard/subscription": {
    title: "Subscription Plan",
    subtitle: "Manage your subscription play which was created for  service providers.",
    backIcon:BackIcon,
  },
  "/dashboard/personal-details": {
    title: "Personal Details",
    subtitle: "You can update your personal information.",
  },
  "/dashboard/terms-and-conditions": {
    title: "Terms & Conditions",
    subtitle: "Here you can update terms & conditions for both of users.",
  },
  "/dashboard/privacy-policy": {
    title: "Privacy Policy",
    subtitle: "Here you can update privacy policy for both of users.",
  },
  "/dashboard/notification": {
    title: "Notifications",
    backIcon:BackIcon,
  },
};

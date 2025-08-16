

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
    subtitle: "Admin with access to this workspace can promote or demote user maintain business insights",
  },
  "/manage-user": {
    title: "User Profile",
    subtitle: "Provider details at a glance",
    backIcon:BackIcon,
  },
  "/manage-user-list": {
    title: "Providers list who earn money",
    backIcon:BackIcon,
  },
  "/manage-provider": {
    title: "Service Provider Profile",
    subtitle: "Provider details at a glance",
    backIcon:BackIcon,
  },
  "/manage-provider-list": {
    title: "Gamers list who book gaming zone",
    backIcon:BackIcon,
  },
  "/zone-listing": {
    title: "Zone listing",
    subtitle: "Provider details at a glance",
  },
  "/transaction": {
    title: "Transaction",
    subtitle: "Admin can track the providers who buy the subscription plan",
  },
  "/subscription": {
    title: "Subscription Plan",
    subtitle: "Provider details at a glance",
    backIcon:BackIcon,
  },
  "/personal-details": {
    title: "Personal Details",
    subtitle: "Update your personal information",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions",
    subtitle: "Review our terms and conditions",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    subtitle: "Understand how we protect your data",
  },
  "/notification": {
    title: "Notifications",
    subtitle: "Manage your notifications and alerts",
    backIcon:BackIcon,
  },
};

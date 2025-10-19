
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:process.env.NEXT_PUBLIC_API_BASE_URL,
    // prepareHeaders: (headers, { getState }) => {
    prepareHeaders: (headers) => {
      const token = cookies.get("token");
      // console.log("9 baseApi", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("accept", "application/json");
       // NEW LINK add for json formate data send
      }
      return headers;
    },
  }),
  tagTypes: [
    "auth",
    "room",
    "profileTag",
    "usrList",
    "promo",
    "account",
    "notification",
    "webBooking",
    "webDashboard",
    "dashboardHome",
    "manageUser",
    "zoonListing",
    "transition",
    "subscription",
    "personalDetails",
    "dashboardSetting",
  ],
  endpoints: () => ({}),
});

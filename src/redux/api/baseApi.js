
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookies  from "js-cookie";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.10.63:8001/api",
    prepareHeaders: (headers, { getState }) => {
      const token = cookies.get("token");
      // console.log("9 baseApi", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("accept", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: [
    "auth",
  ],
  endpoints: () => ({}),
});

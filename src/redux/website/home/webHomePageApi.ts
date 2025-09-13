import { baseApi } from "@/redux/api/baseApi";



const webHomePageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWebDashboardHomeApi: builder.query({
            query: () => ({
                url: `/dashboard`,
                method: "GET",
            }),
            providesTags: ['webDashboard'],
        }),
    }),
       overrideExisting: true
})


export const { useGetWebDashboardHomeApiQuery} = webHomePageApi;

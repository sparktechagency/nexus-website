import { baseApi } from "@/redux/api/baseApi";



const dashboardHomeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardHomeApi: builder.query({
            query: () => ({
                url: `/admin/dashboard`,
                method: "GET",
            }),
            providesTags: ['dashboardHome'],
        }),
    }),
       overrideExisting: true
})


export const {useGetDashboardHomeApiQuery} = dashboardHomeApi;

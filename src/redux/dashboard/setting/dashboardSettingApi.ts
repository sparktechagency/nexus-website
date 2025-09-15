import { baseApi } from "@/redux/api/baseApi";



const dashboardSettingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDashboardSettingApi: builder.mutation({
            query: (settingInfo) => ({
                url: `/admin/pages`,
                method: "POST",
                body:settingInfo
            }),
            invalidatesTags: ['dashboardSetting'],
        }),
    }),
       overrideExisting: true
})


export const { useAddDashboardSettingApiMutation} = dashboardSettingApi;

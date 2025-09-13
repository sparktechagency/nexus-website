import { baseApi } from "@/redux/api/baseApi";

const webNotificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWebNotificationApi: builder.query({
            query: () => ({
                url: `/notifications`,
                method: "GET",
            }),
            providesTags: ['notification'],
        }),
        singleWebNotificationApi: builder.mutation({
            query: (id) => ({
                url: `/mark-notification/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['notification'],
        }),
    }),
       overrideExisting: true
})


export const { useGetWebNotificationApiQuery ,useSingleWebNotificationApiMutation} = webNotificationApi;

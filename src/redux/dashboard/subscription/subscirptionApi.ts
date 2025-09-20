import { baseApi } from "@/redux/api/baseApi";



const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubscriptionApi: builder.query({
            query: () => ({
                url: `/plans`,
                method: "GET",
            }),
            providesTags: ['subscription'],
        }),
        updateSubscriptionApi: builder.mutation({
            query: ({id, updateSubscriptionInfo}) => ({
                url: `/admin/plans/${id}`,
                method: "POST",
                body:updateSubscriptionInfo
            }),
            invalidatesTags: ['subscription'],
        }),
    }),
    overrideExisting: true
})


export const { useGetSubscriptionApiQuery, useUpdateSubscriptionApiMutation } = subscriptionApi;

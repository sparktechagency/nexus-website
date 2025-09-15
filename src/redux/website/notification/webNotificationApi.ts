import { baseApi } from "@/redux/api/baseApi";

const webNotificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWebNotificationApi: builder.query({
            query: ({ per_page, page }) => ({
                url: `/notifications?per_page=${per_page}&page=${page}`,
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
        markAllWebNotificationApi: builder.mutation({
            query: () => ({
                url: `/mark-all-notification`,
                method: "POST",
            }),
            invalidatesTags: ['notification'],
        }),
    }),
    overrideExisting: true
})


export const { useGetWebNotificationApiQuery, useSingleWebNotificationApiMutation, useMarkAllWebNotificationApiMutation } = webNotificationApi;

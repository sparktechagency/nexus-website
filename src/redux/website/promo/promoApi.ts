import { baseApi } from "@/redux/api/baseApi";



const promoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserListApi: builder.query({
            query: ({per_page,page}) => ({
                url: `/coupons?per_page=${per_page}&page=${page}`,
                method: "GET",
            }),
            providesTags: ['promo'],
        }),
        addPromoApi: builder.mutation({
            query: (addPromoInfo) => ({
                url: `/coupons`,
                method: "POST",
                body: addPromoInfo,
            }),
            invalidatesTags: ['promo'],
        }),
        deletePromoApi: builder.mutation({
            query: (id) => ({
                url: `/coupons/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['promo'],
        }),
        viewDetailsPromoApi: builder.query({
            query: (id) => ({
                url: `/coupons/${id}`,
                method: "GET",
            }),
            providesTags: ['promo'],
        }),
        updatePromoApi: builder.mutation({
            query: ({ id, updatePromoInfo }) => ({
                url: `/coupons/${id}`,
                method: "POST",
                body: updatePromoInfo,
            }),
            invalidatesTags: ['promo'],
        }),
        statusChangePromoApi: builder.mutation({
            query: ({ id, statusChangePromoInfo }) => ({
                url: `/coupons/status/${id}`,
                method: "POST",
                body: statusChangePromoInfo,
            }),
            invalidatesTags: ['promo'],
        }),
    }),
    overrideExisting: true
})


export const { useGetUserListApiQuery, useAddPromoApiMutation, useDeletePromoApiMutation, useViewDetailsPromoApiQuery, useUpdatePromoApiMutation, useStatusChangePromoApiMutation } = promoApi;

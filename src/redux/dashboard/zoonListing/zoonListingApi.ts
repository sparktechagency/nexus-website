import { baseApi } from "@/redux/api/baseApi";



const zoonListingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getZoonListApi: builder.query({
            query: () => ({
                url: `/admin/zone_listing`,
                method: "GET",
            }),
            providesTags: ['zoonListing'],
        }),
        getZoonDetailsApi: builder.query({
            query: (id) => ({
                url: `/admin/zone_listing/${id}`,
                method: "GET",
            }),
            providesTags: ['zoonListing'],
        }),
    }),
       overrideExisting: true
})


export const { useGetZoonListApiQuery, useGetZoonDetailsApiQuery} = zoonListingApi;

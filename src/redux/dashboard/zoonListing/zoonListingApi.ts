import { baseApi } from "@/redux/api/baseApi";



const zoonListingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getZoonListApi: builder.query({
            query: ({per_page,search="",page}) => ({
                url: `/admin/zone_listing?per_page=${per_page}&search=${search}&page=${page}`,
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

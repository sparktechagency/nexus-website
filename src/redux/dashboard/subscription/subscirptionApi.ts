import { baseApi } from "@/redux/api/baseApi";



const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        Api: builder.query({
            query: () => ({
                url: ``,
                method: "GET",
            }),
            providesTags: ['subscription'],
        }),
    }),
       overrideExisting: true
})


export const {  } = subscriptionApi;

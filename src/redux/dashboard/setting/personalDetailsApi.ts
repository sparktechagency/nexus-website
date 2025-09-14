import { baseApi } from "@/redux/api/baseApi";



const personalDetailsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        Api: builder.query({
            query: () => ({
                url: ``,
                method: "GET",
            }),
            providesTags: ['personalDetails'],
        }),
    }),
       overrideExisting: true
})


export const {  } = personalDetailsApi;

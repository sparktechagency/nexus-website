import { baseApi } from "@/redux/api/baseApi";



const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfileApi: builder.query({
            query: () => ({
                url: `/profile`,
                method: "GET",
            }),
            providesTags: ['profileTag'],
        }),
    }),
       overrideExisting: true
})


export const { useGetProfileApiQuery } = profileApi;

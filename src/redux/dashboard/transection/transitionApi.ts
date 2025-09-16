import { baseApi } from "@/redux/api/baseApi";



const transitionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransitionApi: builder.query({
            query: () => ({
                url: `/admin/transactions`,
                method: "GET",
            }),
            providesTags: ['transition'],
        }),
    }),
    overrideExisting: true
})


export const { useGetTransitionApiQuery } = transitionApi;

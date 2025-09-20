import { baseApi } from "@/redux/api/baseApi";



const transitionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransitionApi: builder.query({
            query: ({per_page,page}) => ({
                url: `/admin/transactions?per_page=${per_page}&page=${page}`,
                method: "GET",
            }),
            providesTags: ['transition'],
        }),
    }),
    overrideExisting: true
})


export const { useGetTransitionApiQuery } = transitionApi;

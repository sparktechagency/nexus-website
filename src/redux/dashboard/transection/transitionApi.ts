import { baseApi } from "@/redux/api/baseApi";



const transitionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        Api: builder.query({
            query: () => ({
                url: ``,
                method: "GET",
            }),
            providesTags: ['transition'],
        }),
    }),
       overrideExisting: true
})


export const {  } = transitionApi;

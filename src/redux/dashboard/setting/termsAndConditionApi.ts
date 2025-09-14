import { baseApi } from "@/redux/api/baseApi";



const termsAndConditionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        Api: builder.query({
            query: () => ({
                url: ``,
                method: "GET",
            }),
            providesTags: ['dashboardTermsAndCondition'],
        }),
    }),
       overrideExisting: true
})


export const {  } = termsAndConditionApi;

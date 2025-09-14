import { baseApi } from "@/redux/api/baseApi";



const privacyPolicyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        Api: builder.query({
            query: () => ({
                url: ``,
                method: "GET",
            }),
            providesTags: ['dashboardPrivacyPolicy'],
        }),
    }),
       overrideExisting: true
})


export const {  } = privacyPolicyApi;

import { baseApi } from "@/redux/api/baseApi";



const accountApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        changePasswordApi: builder.mutation({
            query: (changePasswordInfo) => ({
                url: `/change-password`,
                method: "POST",
                body:changePasswordInfo,
            }),
            invalidatesTags: ['account'],
        }),

        getTermsApi: builder.query({
            query: (type) => ({
                url: `/pages?type=${type}`,
                method: "GET",
            }),
            providesTags: ['account'],
        }),

        
        getPrivacyPolicyApi: builder.query({
            query: (type) => ({
                url: `/pages?type=${type}`,
                method: "GET",
            }),
            providesTags: ['account'],
        }),
    }),
       overrideExisting: true
})


export const { useChangePasswordApiMutation,useGetTermsApiQuery,useGetPrivacyPolicyApiQuery } = accountApi;

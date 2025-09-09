import { baseApi } from "../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerApi: builder.mutation({
            query: (registerInfo) => ({
                url: `/auth/register`,
                method: "POST",
                body: registerInfo
            }),
            invalidatesTags: ['auth'],
        }),
        verifyOtpApi: builder.mutation({
            query: (verifyOtpInfo) => ({
                url: `/auth/otp-verification`,
                method: "POST",
                body: verifyOtpInfo
            }),
            invalidatesTags: ['auth'],
        }),
        loginApi: builder.mutation({
            query: (loginInfo) => ({
                url: `/auth/login`,
                method: "POST",
                body: loginInfo
            }),
            invalidatesTags: ['auth'],
        }),
    })
})


export const { useRegisterApiMutation,useVerifyOtpApiMutation,useLoginApiMutation } = authApi;

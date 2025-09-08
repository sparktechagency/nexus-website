import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        otpSendApi: builder.mutation({
            query: (otpInof) => ({
                url: `/auth/verify`,
                method: "POST",
                body: otpInof
            }),
            invalidatesTags: ['auth'],
        }),
        postAuthApi: builder.mutation({
            query: (authInfo) => ({
                url: `/auth/login`,
                method: "POST",
                body: authInfo
            }),
            invalidatesTags: ['auth'],
        }),
        logOutAuthApi: builder.mutation({
            query: () => ({
                url: `/auth/logout`,
                method: "POST",
            }),
            invalidatesTags: ['auth'],
        }),
        getProfileApi: builder.query({
            query: () => ({
                url: `/auth/profile`,
                method: "GET",
            }),
            providesTags: ['auth'],
        }),

        updateProfileApi: builder.mutation({
            query: (updateInfo) => ({
                url: `/auth/change-profile`,
                method: "POST",
                body: updateInfo,
            }),
            invalidatesTags: ['auth'],
        }),
        // single photo update
        updateSinglePhotoApi: builder.mutation({
            query: (formData) => ({
                url: `/admin/updateAdminPhoto`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ['auth'],
        }),
        forgetPasswordApi: builder.mutation({
            query: (emailInfo) => ({
                url: `/auth/forget_password`,
                method: "POST",
                body: emailInfo,
            }),
            invalidatesTags: ['auth'],
        }),
        resetPasswordApi: builder.mutation({
            query: (resetInfo) => ({
                url: `/auth/change_password`,
                method: "POST",
                body: resetInfo,
            }),
            invalidatesTags: ['auth'],
        }),
        // password changes api
        updatePasswordApi: builder.mutation({
            query: (updatePassword) => ({
                url: `/auth/change_password`,
                method: "POST",
                body: updatePassword,
            }),
            invalidatesTags: ['auth'],
        }),
        // name changes api
        updateAuthProfileApi: builder.mutation({
            query: (updateAuthProfile) => ({
                url: `/admin/updateAdminProfile`,
                method: "POST",
                body: updateAuthProfile,
            }),
            invalidatesTags: ['auth'],
        }),

    })
})


export const { usePostAuthApiMutation, useOtpSendApiMutation, useGetProfileApiQuery, useLogOutAuthApiMutation, useUpdateProfileApiMutation, useUpdateSinglePhotoApiMutation, useForgetPasswordApiMutation, useResetPasswordApiMutation, useUpdatePasswordApiMutation, useUpdateAuthProfileApiMutation } = authApi;
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
    })
})


export const { useRegisterApiMutation } = authApi;

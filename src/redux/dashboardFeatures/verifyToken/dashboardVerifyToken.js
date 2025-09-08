import { baseApi } from "../../api/baseApi";

const dashboardVerifyTokenApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getVerifyTokenApi: builder.query({
            query: () => ({
                url: `/auth/verify-token`,
                method: "POST"
            }),
            providesTags: ['verify_token'],
        }),

    })
})


export const { useGetVerifyTokenApiQuery } = dashboardVerifyTokenApi;
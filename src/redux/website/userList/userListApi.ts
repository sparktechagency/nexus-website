import { baseApi } from "@/redux/api/baseApi";



const userListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserListApi: builder.query({
            query: () => ({
                url: `/get-user-list`,
                method: "GET",
            }),
            providesTags: ['usrList'],
        }),
    }),
       overrideExisting: true
})


export const { useGetUserListApiQuery } = userListApi;

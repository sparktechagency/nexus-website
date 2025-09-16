import { baseApi } from "@/redux/api/baseApi";



const userListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserListApi: builder.query({
            query: ({ per_page, search = "", page }) => ({
                url: `/get-user-list?per_page=${per_page}&search=${search}&page=${page}`,
                method: "GET",
            }),
            providesTags: ['usrList'],
        }),
    }),
    overrideExisting: true
})


export const { useGetUserListApiQuery } = userListApi;

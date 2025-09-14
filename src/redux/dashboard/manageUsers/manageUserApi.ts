import { baseApi } from "@/redux/api/baseApi";



const manageUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserApi: builder.query({
            query: () => ({
                url: `/admin/user-lists`,
                method: "GET",
            }),
            providesTags: ['manageUser'],
        }),
        deleteUserApi: builder.mutation({
            query: ({id}) => ({
                url: `/admin/delete-user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['manageUser'],
        }),
    }),
       overrideExisting: true
})


export const {useGetUserApiQuery,useDeleteUserApiMutation} = manageUserApi;

import { baseApi } from "@/redux/api/baseApi";



const manageUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserApi: builder.query({
            query: ({per_page,role,search="",page}) => ({
                url: `/admin/user-lists?per_page=${per_page}&role=${role}&search=${search}&page=${page}`,
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

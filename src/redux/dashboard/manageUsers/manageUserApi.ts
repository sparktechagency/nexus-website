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
        // ========= PROVIDER LIST DETAILS ==================
         getProviderProfileApi: builder.query({
            query: (id) => ({
                url: `/admin/service-provider-profile/${id}`,
                method: "GET",
            }),
            providesTags: ['manageUser'],
        }),
         getGamerListApi: builder.query({
            query: (id) => ({
                url: `/admin/gamer-list/${id}`,
                method: "GET",
            }),
            providesTags: ['manageUser'],
        }),
        // ========= USER PROFILE DETAILS ====================
          getUserProfileApi: builder.query({
            query: (id) => ({
                url: `/admin/user-profile/${id}`,
                method: "GET",
            }),
            providesTags: ['manageUser'],
        }),
         getProviderListApi: builder.query({
            query: (id) => ({
                url: `/admin/provider-list/${id}`,
                method: "GET",
            }),
            providesTags: ['manageUser'],
        }),
    }),
       overrideExisting: true
})


export const {useGetUserApiQuery,useDeleteUserApiMutation,useGetProviderProfileApiQuery,useGetGamerListApiQuery,useGetUserProfileApiQuery,useGetProviderListApiQuery} = manageUserApi;

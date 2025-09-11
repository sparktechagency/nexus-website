import { baseApi } from "@/redux/api/baseApi";



const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfileApi: builder.query({
            query: () => ({
                url: `/profile`,
                method: "GET",
            }),
            providesTags: ['profileTag'],
        }),
        getRatingProfileApi: builder.query({
            query: () => ({
                url: `/get-provider-rating`,
                method: "GET",
            }),
            providesTags: ['profileTag'],
        }),
        editProfileApi: builder.mutation({
            query: (editProfileInfo) => ({
                url: `/edit-profile`,
                method: "POST",
                body:editProfileInfo,
            }),
            invalidatesTags: ['profileTag'],
        }),
        editSinglePhotoProfileApi: builder.mutation({
            query: (photoChange) => ({
                url: `/edit-profile-picture`,
                method: "POST",
                body:photoChange,
            }),
            invalidatesTags: ['profileTag'],
        }),
    }),
       overrideExisting: true
})


export const { useGetProfileApiQuery,useGetRatingProfileApiQuery,useEditProfileApiMutation,useEditSinglePhotoProfileApiMutation } = profileApi;

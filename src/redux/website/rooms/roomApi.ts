import { baseApi } from "@/redux/api/baseApi";



const roomApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRoomApi: builder.mutation({
            query: (addRoomInfo) => ({
                url: `/rooms`,
                method: "POST",
                body: addRoomInfo
            }),
            invalidatesTags: ['room'],
        }),
        updateRoomApi: builder.mutation({
            query: ({ updateRoomInfo, id }) => ({
                url: `/rooms/${id}`,
                method: "POST",
                body: updateRoomInfo
            }),
            invalidatesTags: ['room'],
        }),
        deleteRoomApi: builder.mutation({
            query: (id) => ({
                url: `/rooms/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['room'],
        }),
        getRoomApi: builder.query({
            query: ({ per_page, page }) => ({
                url: `/rooms?per_page=${per_page}&page=${page}`,
                method: "GET",
            }),
            providesTags: ['room'],
        }),
        singleGetRoomApi: builder.query({
            query: (id) => ({
                url: `/rooms/${id}`,
                method: "GET",
            }),
            providesTags: ['room'],
        }),
    }),
       overrideExisting: true
})


export const { useCreateRoomApiMutation, useUpdateRoomApiMutation, useDeleteRoomApiMutation, useGetRoomApiQuery,useSingleGetRoomApiQuery } = roomApi;

import { baseApi } from "@/redux/api/baseApi";



const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // FIND GAMER
        findGamerApi: builder.query({
            query: (email) => ({
                url: `/find-gamer?${email}`,
                method: "GET",
            }),
            providesTags: ['webBooking'],
        }),
        // FIND PC ON
        findPConApi: builder.query({
            query: (room_id) => ({
                url: `/find-pc-no?room_id=${room_id}`,
                method: "GET",
            }),
            providesTags: ['webBooking'],
        }),
        // ADD GAMER
        addGamerApi: builder.mutation({
            query: () => ({
                url: `/add-gamer`,
                method: "POST",
            }),
            invalidatesTags: ['webBooking'],
        }),
        // PROVIDER BOOKING LIST
        getProviderBookingListApi: builder.query({
            query: ({ room_id, status, date }) => ({
                url: `/provider-booking-list?room_id=${room_id}&status=${status}&date=${date}`,
                method: "GET",
            }),
            providesTags: ['webBooking'],
        }),
        // BOOKING DETAILS
        getBookingDetailsApi: builder.query({
            query: (id) => ({
                url: `/provider-booking-details/${id}`,
                method: "GET",
            }),
            providesTags: ['webBooking'],
        }),
        // MARK AS PAYMENT COMPLETE
        markAsPaymentApi: builder.mutation({
            query: (id) => ({
                url: `/mark-as-payment-complete/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['webBooking'],
        }),
        // CONFIRM BOOKING
        confirmBookingApi: builder.mutation({
            query: (id) => ({
                url: `/confirm-booking/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['webBooking'],
        }),
        // CANCEL BOOKING
        cancelBookingApi: builder.mutation({
            query: (id) => ({
                url: `/cancel-booking/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['webBooking'],
        }),
        // RESCHEDULE BOOKING
        rescheduleBookingApi: builder.mutation({
            query: (id) => ({
                url: `/reschedule-booking/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['webBooking'],
        }),
    }),
    overrideExisting: true
})


export const { useFindGamerApiQuery, } = bookingApi;

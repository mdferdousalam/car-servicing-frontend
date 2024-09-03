import { baseApi } from "../../api/api";


const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (data) => ({
        url: "/slots",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Slots"],
    }),
    getAvailableSlots: builder.query({
      query: ({ serviceId, date }) => ({
        url: "/slots/availability",
        method: "GET",
        params: { serviceId, date },
      }),
      providesTags: ["Slots"],
    }),
    getAllSlots: builder.query({
      query: () => ({
        url: "/slots",
        method: "GET",
      }),
      providesTags: ["Slots"],
    }),
    toggleSlotStatus: builder.mutation({
      query: ({ slotId, newStatus }) => ({
        url: `/slots/${slotId}/status`,
        method: "PATCH",
        body: { status: newStatus },
      }),
      invalidatesTags: ["Slots"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetAvailableSlotsQuery,
  useGetAllSlotsQuery,
  useToggleSlotStatusMutation,
} = slotApi;

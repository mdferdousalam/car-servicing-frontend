// src/redux/features/booking/bookingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define the interface for a selected slot
export interface SelectedSlot {
  serviceId: string;
  slotId: string;
  serviceName: string;
  startTime: string;
  endTime: string;
  date: string;
  status: "upcoming" | "past";
}

// Define the initial state for the booking slice
interface BookingState {
  selectedSlots: SelectedSlot[];
}

const initialState: BookingState = {
  selectedSlots: [],
};

// Create the booking slice
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // Add or remove a slot based on its presence in the selected slots
    toggleSlot: (state, action: PayloadAction<SelectedSlot>) => {
      const slot = action.payload;
      const existingSlotIndex = state.selectedSlots.findIndex(
        (s) => s.slotId === slot.slotId && s.serviceId === slot.serviceId
      );

      if (existingSlotIndex >= 0) {
        // Remove the slot if it already exists
        state.selectedSlots.splice(existingSlotIndex, 1);
      } else {
        // Add the slot if it does not exist
        state.selectedSlots.push(slot);
      }
    },
    // Remove a specific slot
    removeSlot: (
      state,
      action: PayloadAction<{ slotId: string; serviceId: string }>
    ) => {
      const { slotId, serviceId } = action.payload;
      state.selectedSlots = state.selectedSlots.filter(
        (s) => !(s.slotId === slotId && s.serviceId === serviceId)
      );
    },
    // Clear all selected slots
    clearSelectedSlots: (state) => {
      state.selectedSlots = [];
    },
  },
});

// Export the actions
export const { clearSelectedSlots, toggleSlot, removeSlot } =
  bookingSlice.actions;

// Selector to get the selected slots
export const selectSelectedSlots = (state: RootState) =>
  state.booking.selectedSlots;

// Export the reducer
export default bookingSlice.reducer;

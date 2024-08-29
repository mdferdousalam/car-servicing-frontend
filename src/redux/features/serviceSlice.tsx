import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


// Define a type for the slice state
interface Service {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the initial state using that type
const initialState = {
  service : []
};

export const serviceSlice = createSlice({
  name: "service",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getService: (state) => {
      state.service = state.service,
    },
    // addService: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // updateService: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    // deleteService: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { getService } = serviceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.services.value;

export default serviceSlice.reducer;

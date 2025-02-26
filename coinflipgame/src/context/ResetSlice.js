import { createSlice } from "@reduxjs/toolkit";
import { ResetData } from "../context/ResetData";

const initialState = {
  value: ResetData,

  status: "idle",
};
export const resetSlice = createSlice({
  name: "resetvalue",
  initialState,
  reducers: {
    setResetTime: (state, action) => {
      const resetdata = action.payload.reset;
      SetReset(state, resetdata);
    },
  },
});

export const { setResetTime } = resetSlice.actions;

export const selectReset = (state) => state.reset.value;

export default resetSlice.reducer;

function SetReset(state, reset) {
  state.value[0].reset = reset;
}

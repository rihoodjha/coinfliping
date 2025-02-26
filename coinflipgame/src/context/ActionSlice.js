import { createSlice } from "@reduxjs/toolkit";
import { ActionData } from "../context/ActionData";

const initialState = {
  value: ActionData,

  status: "idle",
};
export const actionSlice = createSlice({
  name: "actionvalue",
  initialState,
  reducers: {
    addAction: (state) => {
      const lastkey = state.value[state.value.length - 1].id;
      state.value.push({
        id: lastkey + 1,
        player: lastkey + 1,
        disabled: 1,
      });
    },
    setAction: (state, action) => {
      const actiondata = action.payload.disable;
      SetAction(state, actiondata);
    },
  },
});

export const { setAction, addAction } = actionSlice.actions;

export const selectAction = (state) => state.action.value;

export default actionSlice.reducer;

function SetAction(state, action) {
  const changes = action.toString().split(",");
  const pos = state.value
    .map((e) => e.player.toString())
    .indexOf(changes[0].toString());
  state.value[pos].disabled = action[1];
}

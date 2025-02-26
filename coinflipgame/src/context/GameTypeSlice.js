import { createSlice } from "@reduxjs/toolkit";
import { GameTypeData } from "../context/GameTypeData";

const initialState = {
  value: GameTypeData,

  status: "idle",
};
export const gameTypeSlice = createSlice({
  name: "gametypevalue",
  initialState,
  reducers: {
    setGameTypeData: (state, action) => {
      const gametypedata = action.payload.gametype;
      SetGameType(state, gametypedata);
    },
  },
});

export const { setGameTypeData } = gameTypeSlice.actions;

export const selectGameType = (state) => state.gametype.value;

export default gameTypeSlice.reducer;

function SetGameType(state, typeofgame) {
  for (let i = 0; i < state.value.length; i++) {
    if (typeofgame.toString() === state.value[i].id.toString()) {
      state.value[i].selected = true;
    } else {
      state.value[i].selected = false;
    }
  }
}

import { createSlice } from "@reduxjs/toolkit";
import { TimerData } from "../context/TimerData";

const initialState = {
  value: TimerData,

  status: "idle",
};
export const timerSlice = createSlice({
  name: "timervalue",
  initialState,
  reducers: {
    addTimer: (state) => {
      const lastkey = state.value[state.value.length - 1].id;
      const playerkey = state.value[state.value.length - 1].player;
      for (let i = 0; i < 3; i++) {
        state.value.push({
          player: playerkey + 1,
          id: lastkey + i + 10,
          timer: "0:00",
          name: "",
          playing: 0,
          gametypeid: i,
          firstvalue: 0,
        });
      }
    },
    setTimerBox: (state, action) => {
      const timerdata = action.payload.timer;
      SetTimer(state, timerdata);
    },

    setFirstValueTimer: (state, action) => {
      const timerdata = action.payload.timer;
      SetFirstValueTimer(state, timerdata);
    },
    setTimerPlayerName: (state, action) => {
      const playerdata = action.payload.player;
      SetPlayerName(state, playerdata);
    },
  },
});

export const { setTimerBox, setTimerPlayerName, setFirstValueTimer, addTimer } =
  timerSlice.actions;

export const selectTimer = (state) => state.timer.value;

export default timerSlice.reducer;

function SetPlayerName(state, player) {
  for (let i = 0; i < state.value.length; i++) {
    if (state.value[i].player === player.id) {
      state.value[i].name = player.name;
    }
  }
}
function SetFirstValueTimer(state, time) {
  const pos = state.value.map((e) => e.id).indexOf(time[2]);
  state.value[pos].timer = time[5];
  state.value[pos].name = time[3];
  state.value[pos].playing = time[4];
}

function SetTimer(state, time) {
  const pos = state.value
    .map((e) => e.id.toString())
    .indexOf(time[2].toString());
  state.value[pos].timer = time[1];
  state.value[pos].name = time[0];
  state.value[pos].playing = time[4];
}

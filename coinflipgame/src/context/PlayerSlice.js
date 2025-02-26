import { createSlice } from "@reduxjs/toolkit";
import { PlayerData } from "../context/PlayerData";

const initialState = {
  value: PlayerData,

  status: "idle",
};
export const playerSlice = createSlice({
  name: "playervalue",
  initialState,
  reducers: {
    addPlayer(state) {
      console.log("added player");
      const lastkey = state.value[state.value.length - 1].key;
      state.value.push({
        key: lastkey + 1,
        name: "",
        moved: "heads.jpg",
        socket: "",
        connected: false,
      });
    },
    setPlayerData: (state, action) => {
      const playerdata = action.payload.player;
      SetPlayer(state, playerdata);
    },
  },
});

export const { setPlayerData, addPlayer } = playerSlice.actions;

export const selectPlayersData = (state) => state.player.value;

export default playerSlice.reducer;

function SetPlayer(state, players) {
  if (playerisvalid(players)) {
    const pos = state.value
      .map((e) => e.key.toString())
      .indexOf(players.id.toString());
    state.value[pos].socket = players.socket;
    state.value[pos].name = players.name;
    state.value[pos].connected = true;
  }
}

function playerisvalid(players) {
  return (
    players !== undefined &&
    players.id !== undefined &&
    players.socket !== undefined &&
    players.name !== undefined
  );
}

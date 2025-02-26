import { createSlice } from "@reduxjs/toolkit";
import { HeadsData } from "../context/HeadsData";
const numberofcoinsinplayersbag = 20;
const initialState = {
  value: HeadsData,

  status: "idle",
};

export const gameSlice = createSlice({
  name: "coinimage",
  initialState,
  reducers: {
    addCoins: (state) => {
      const lastkey = state.value[state.value.length - 1].id;
      const lastplayer = state.value[state.value.length - 1].player;
      for (let i = 1; i < 21; i++) {
        state.value.push({
          player: lastplayer + 1,
          id: lastkey + i,
          image: "empty.jpg",
          background: false,
          beenflipped: false,
          beenshipped: false,
          beendelivered: false,
        });
      }
    },

    shipAlltheCoinsForNexPlayer: (state, action) => {
      const player_id_shipped_from = action.payload.player;
      const player_id_delivered_to = Number(action.payload.player) + 1;

      for (let i = 0; i < state.value.length; i++) {
        updateStateforShippedFromPlayer(state, i, player_id_shipped_from);
        updateStateforDeliveredPlayer(
          state.value[i],
          player_id_delivered_to,
          action.payload.coinstoship
        );
      }
    },
    resetCoins: (state, action) => {
      for (let i = 0; i < state.value.length; i++) {
        state.value[i].image =
          i < numberofcoinsinplayersbag ? "heads.jpg" : "empty.jpg";

        state.value[i].background = false;
        state.value[i].beenflipped = false;
        state.value[i].beenshipped = false;
        state.value[i].beendelivered = false;
      }
    },
    //From Message Api
    flipCoin: (state, action) => {
      const pos = state.value
        .map((e) => e.id.toString())
        .indexOf(action.payload.data.toString());
      state.value[pos].beenflipped = true;
      state.value[pos].background = true;
    },
  },
});

export const { addCoins, flipCoin, shipAlltheCoinsForNexPlayer, resetCoins } =
  gameSlice.actions;

export const selectImage = (state) => state.image.value;

export default gameSlice.reducer;

function updateStateforDeliveredPlayer(
  state,
  player_id_delivered_to,
  shippedcoins
) {
  if (
    statePlayerMatchesPlayer(
      state.player.toString(),
      player_id_delivered_to.toString()
    )
  ) {
    if (
      notFlippedAndShippedAndDelivered(
        state.beenflipped,
        state.beenshipped,
        state.beendelivered
      ) &&
      CoinShippedCorrisponseWithCoinDelivered(shippedcoins, state)
    ) {
      state.background = false;
      state.beenflipped = false;
      state.beenshipped = false;
      state.beendelivered = true;
    }
  }
}

function CoinShippedCorrisponseWithCoinDelivered(shippedcoins, state) {
  return (
    shippedcoins.findIndex(
      (coinid) => coinid.id === state.id - numberofcoinsinplayersbag
    ) > -1
  );
}

function updateStateforShippedFromPlayer(state, i, player_id_shipped_from) {
  if (
    state.value[i].player === player_id_shipped_from &&
    state.value[i].beenflipped
  ) {
    state.value[i].background = false;
    state.value[i].beenflipped = true;
    state.value[i].beenshipped = true;
    state.value[i].beendelivered = player_id_shipped_from !== 1;
  }
}

function notFlippedAndShippedAndDelivered(flipped, shipped, delivered) {
  return !flipped && !shipped && !delivered;
}
function statePlayerMatchesPlayer(stateplayer, eventplayer) {
  return stateplayer === eventplayer;
}

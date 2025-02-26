import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./GameSlice";
import timerReducer from "./TimerSlice";
import resetReducer from "./ResetSlice";
import gameTypeReducer from "./GameTypeSlice";
import playerReducer from "./PlayerSlice";
import actionReducer from "./ActionSlice";

export const store = configureStore({
  reducer: {
    image: imageReducer,
    timer: timerReducer,
    reset: resetReducer,
    gametype: gameTypeReducer,
    player: playerReducer,
    action: actionReducer,
  },
});

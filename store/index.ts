import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Player } from "@/utils/types/store";

const initialState: Player = {
  userName: "",
  value: 0,
  rank: [],
  balance: 1000,
  isOnline: false,
  speed: 0,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    updateValue: (state, action) => {
      state.isOnline = true;
      state.value = action.payload;
    },
    updateRank: (state, action) => {
      state.rank = action.payload;
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
    updateIsOnline: (state, action) => {
      state.isOnline = action.payload;
    },
    updateSpeed: (state, action) => {
      state.speed = action.payload;
    },
  },
});

export const {
  updateUserName,
  updateValue,
  updateRank,
  updateBalance,
  updateIsOnline,
  updateSpeed,
} = playerSlice.actions;
export const playerReducer = playerSlice.reducer;

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

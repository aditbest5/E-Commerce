import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInput: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handler: (state, action) => {
      const userPayload = [{ ...action.payload }];
      console.log(userPayload);
    },
  },
});

export const { handler } = userSlice.actions;

export default userSlice;
export const InputUser = (state) => state.user.userInput;

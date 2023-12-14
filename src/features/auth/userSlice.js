import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInput: { username: "", password: "" },
  registerInput: {
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    city: "",
    street: "",
    number: "",
    zipcode: "",
    lat: "",
    long: "",
    phone: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handler: (state, action) => {
      state.userInput = { ...state.userInput, ...action.payload };
    },
    registerHandler: (state, action) => {
      state.registerInput = { ...state.registerInput, ...action.payload };
    },
  },
});

export const { handler, registerHandler } = userSlice.actions;

export default userSlice;
export const InputUser = (state) => state.user.userInput;
export const RegisterUser = (state) => state.user.registerInput;

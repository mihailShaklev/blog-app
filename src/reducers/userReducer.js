import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    appendUser(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { appendUser } = userSlice.actions;

export const loginUser = (user) => {
  return (dispatch) => {
    dispatch(appendUser(user));
  };
};

export default userSlice.reducer;

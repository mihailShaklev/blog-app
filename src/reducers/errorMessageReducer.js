const messageReducer = (state = null, action) => {
  if (action.type === "SET_MESSAGE") {
    state = action.payload;
    return state;
  }
  return state;
};

export const messageChange = (message) => {
  return {
    type: "SET_MESSAGE",
    payload: message,
  };
};

export default messageReducer;

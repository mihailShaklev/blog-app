import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducers/blogReducer";
import messageReducer from "./reducers/errorMessageReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    message: messageReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});

export default store;

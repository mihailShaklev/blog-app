import { createSlice, current } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    updateBlog(state, action) {
      const blog = action.payload;
      return state
        .map((element) => (element.id !== blog.id ? element : blog))
        .sort((a, b) => b.likes - a.likes);
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((obj) => obj.id !== id);
    },
  },
});

export const { appendBlog, setBlogs, updateBlog, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (object) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(object);
    dispatch(appendBlog(newBlog));
  };
};

export const changeBlogLikes = (id, object) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, object);
    dispatch(updateBlog(updatedBlog));
  };
};

export const comment = (id, object) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, object);
    dispatch(updateBlog(updatedBlog));
  };
};

export const eraseBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.deleteBlog(id);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;

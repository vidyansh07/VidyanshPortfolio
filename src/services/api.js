import axios from "axios";

const API_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const blogApi = {
  getBlogs: async (params) => {
    const { data } = await api.get("/blogs", { params });
    return data;
  },

  getBlog: async (id) => {
    const { data } = await api.get(`/blogs/${id}`);
    return data;
  },

  createBlog: async (blog) => {
    const { data } = await api.post("/blogs", blog);
    return data;
  },

  updateBlog: async (id, blog) => {
    const { data } = await api.put(`/blogs/${id}`, blog);
    return data;
  },

  deleteBlog: async (id) => {
    const { data } = await api.delete(`/blogs/${id}`);
    return data;
  },

  likeBlog: async (id) => {
    const { data } = await api.post(`/blogs/${id}/like`);
    return data;
  },

  getBlogComments: async (blogId) => {
    const { data } = await api.get(`/blogs/${blogId}/comments`);
    return data;
  },

  addComment: async (comment) => {
    const { data } = await api.post("/comments", comment);
    return data;
  },
};
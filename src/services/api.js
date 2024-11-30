import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Project API calls
export const projectApi = {
  getProjects: async (params) => {
    const { data } = await api.get("/projects", { params });
    return data;
  },

  getProject: async (id) => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },

  createProject: async (project) => {
    const { data } = await api.post("/projects", project);
    return data;
  },

  updateProject: async (id, project) => {
    const { data } = await api.put(`/projects/${id}`, project);
    return data;
  },

  deleteProject: async (id) => {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  },
};

// Blog API calls
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
};

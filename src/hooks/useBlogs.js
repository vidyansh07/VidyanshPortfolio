import { useState, useCallback } from "react";
import { blogApi } from "../services/api";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async (params) => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogApi.getBlogs(params);
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBlog = useCallback(async (blog) => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogApi.createBlog(blog);
      setBlogs((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBlog = useCallback(async (id, blog) => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogApi.updateBlog(id, blog);
      setBlogs((prev) => prev.map((b) => (b._id === id ? data : b)));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteBlog = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await blogApi.deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    blogs,
    loading,
    error,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
  };
};

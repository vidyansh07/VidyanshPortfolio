import { useState, useCallback } from "react";
import { projectApi } from "../services/api";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async (params) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectApi.getProjects(params);
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (project) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectApi.createProject(project);
      setProjects((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProject = useCallback(async (id, project) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectApi.updateProject(id, project);
      setProjects((prev) => prev.map((p) => (p._id === id ? data : p)));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProject = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await projectApi.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};

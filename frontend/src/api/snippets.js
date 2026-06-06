import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = `${BACKEND_URL}/api/snippets`;

export const createSnippet = (data) => axios.post(API, data);
export const getSnippet = (slug) => axios.get(`${API}/${slug}`);

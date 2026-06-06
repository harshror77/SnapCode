import axios from "axios";

const API = "/api/snippets";

export const createSnippet = (data) => axios.post(API, data);
export const getSnippet = (slug) => axios.get(`${API}/${slug}`);

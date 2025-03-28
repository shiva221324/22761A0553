import axios from "axios";

const API_URL = "http://localhost:5000"; // Your backend API

export const fetchTopUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const fetchTrendingPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const fetchFeed = async () => {
  const response = await axios.get(`${API_URL}/feed`);
  return response.data;
};

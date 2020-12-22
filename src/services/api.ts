import axios, { AxiosInstance } from 'axios';

const baseAPI = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
  });
  return api;
};

export default baseAPI;

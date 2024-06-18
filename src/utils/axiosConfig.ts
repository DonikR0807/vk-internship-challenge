import axios from "axios";

const apiBase = "https://api.kinopoisk.dev";

axios.defaults.transformResponse = [(data) => JSON.parse(data)];

export const movieAxios = axios.create({
  baseURL: apiBase,
  headers: {
    "X-API-KEY": "7J4QASW-VRFMNR1-PAE127N-BJSWX85"
  }
});

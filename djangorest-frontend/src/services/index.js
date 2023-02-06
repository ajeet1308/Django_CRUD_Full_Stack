import axios from "axios";

export const Services = {
  get: (url) =>
    axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  delete: (url) => axios.delete(url),
  put: (url, data) =>
    axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  post: (url, data) =>
    axios.post(url, data, {
      headers: {
        "Content-Type": "applications/json",
      },
    }),
  deleteAll: (url) => axios.delete(url),
  getByTitle: (url) => axios.get(url,{
    headers: {
      "Content-Type": "applications/json",
    },
  }),
};

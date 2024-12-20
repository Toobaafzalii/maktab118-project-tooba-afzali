import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000/api",
});

client.interceptors.request.use(
  function (config) {
    const user = localStorage.getItem("auth-user");
    if (user) {
      const token = JSON.parse(user)?.accessToken;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { client };

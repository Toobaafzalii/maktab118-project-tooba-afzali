
import axios from "axios";

const nextClient = axios.create({
  baseURL: "/api",
});

nextClient.interceptors.request.use(
  function (config) {
    const user = localStorage.getItem("auth-user");
    if (user) {
        const token = JSON.parse(user)?.state?.user?.accessToken;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { nextClient };

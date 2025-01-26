import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000/api",
});

client.interceptors.request.use(
  function (config) {
    const user = localStorage.getItem("auth-user");
    if (user) {
      const token = JSON.parse(user)?.state?.user?.accessToken;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error); // Request error
  }
);

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      const statusCode = error.response.status;
      const message = error.response.data?.message || error.message;

      const customError = new Error(message);
      customError.name = "APIError";
      (customError as any).statusCode = statusCode;

      throw customError;
    } else if (error.request) {
      const networkError = new Error("No response received from the server");
      networkError.name = "NetworkError";
      throw networkError;
    } else {
      const genericError = new Error(error.message);
      throw genericError;
    }
  }
);

export { client };

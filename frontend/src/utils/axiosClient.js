import axios from "axios";

const axiosClient = axios.create({
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendData = error.response?.data;

    let messages = ["Something went wrong"];

    if (backendData?.errors?.length) {
      messages = backendData.errors.map((err) => Object.values(err)[0]);
    } else if (backendData?.message) {
      messages = [backendData.message];
    }
    return Promise.reject(messages);
  }
);

export default axiosClient;

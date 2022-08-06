import axios from "axios";
import apiConfig from "./apiConfig";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        "Content-Type": "application/json",
        // "Set-Cookie": "cross-site-cookie=whatever",
    },
    paramsSerializer: (params) => queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        throw error;
    },
);

export default axiosClient;

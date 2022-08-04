import { Movies, ListResponse } from "../../models";
import axiosClient from "./apiClient";

export const category = {
    movie: "movie",
    tv: "tv",
};

export const movieType = {
    upcoming: "upcoming",
    popular: "popular",
    top_rated: "top_rated",
};

export const tvType = {
    popular: "popular",
    top_rated: "top_rated",
    on_the_air: "on_the_air",
};

const moviesApi = {
    getMoviePopular(): Promise<ListResponse<Movies>> {
        const url = "movie/popular";
        return axiosClient.get(url, { params: {} });
    },
};

export default moviesApi;

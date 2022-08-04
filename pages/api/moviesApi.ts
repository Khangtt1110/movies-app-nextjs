import { Category, ListResponse, Movies, TvType } from "../../models";
import axiosClient from "./apiClient";

export const category: Category = {
    movie: "movie",
    tv: "tv",
};

export const tvType: TvType = {
    popular: "popular",
    top_rated: "top_rated",
    on_the_air: "on_the_air",
};

const moviesApi = {
    getMovieList(type: string): Promise<ListResponse<Movies>> {
        const url = "movie/" + type;
        return axiosClient.get(url, { params: {} });
    },
};

export default moviesApi;

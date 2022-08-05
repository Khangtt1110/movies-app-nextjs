import { Casts, Category, ListResponse, ListResponseCast, Movies, TvType } from "../../models";
import axiosClient from "./apiClient";
import { MovieDetail } from "../../models/movies";

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
    getMovieDetail(cate: string, id: number): Promise<MovieDetail> {
        const url = cate + "/" + id;
        return axiosClient.get(url, { params: {} });
    },
    getCastList(cate: string, id: number): Promise<ListResponseCast<Casts>> {
        const url = cate + "/" + id + "/credits";
        return axiosClient.get(url, { params: {} });
    },
};

export default moviesApi;

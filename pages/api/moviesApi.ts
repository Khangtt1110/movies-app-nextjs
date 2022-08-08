import {
    Casts,
    Category,
    ListResponse,
    ListResponseCast,
    ListResponseVideo,
    Movies,
    TvShowType,
    Video,
} from "../../models";
import axiosClient from "./apiClient";
import { CategoryDetail, MovieDetail, TvShows } from "../../models/movies";

const moviesApi = {
    getMovieList(type: string): Promise<ListResponse<Movies>> {
        const url = "movie/" + type;
        return axiosClient.get(url, { params: {} });
    },
    getTvShowList(type: string): Promise<ListResponse<TvShows>> {
        const url = "tv/" + type;
        return axiosClient.get(url, { params: {} });
    },
    getTvShowList2(cate: string, type: string, param: object): Promise<ListResponse<TvShows>> {
        const url = cate + "/" + type;
        return axiosClient.get(url, param);
    },
    getMovieDetail(cate: string, id: number): Promise<CategoryDetail> {
        const url = cate + "/" + id;
        return axiosClient.get(url, { params: {} });
    },
    getCastList(cate: string, id: number): Promise<ListResponseCast<Casts>> {
        const url = cate + "/" + id + "/credits";
        return axiosClient.get(url, { params: {} });
    },
    getTrailerVideo: (cate: string, id: number): Promise<ListResponseVideo<Video>> => {
        const url = cate + "/" + id + "/videos";
        return axiosClient.get(url, { params: {} });
    },
    search: (cate: string, params: any): Promise<ListResponse<Movies>> => {
        const url = "search/" + cate;
        return axiosClient.get(url, params);
    },
};

export default moviesApi;

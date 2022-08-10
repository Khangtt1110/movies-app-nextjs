import { Actors, ListResponse, ListResponseActor, ListResponseVideo, Video } from "../../models";
import { CategoryData, CategoryDetail } from "../../models/movies";
import axiosClient from "./apiClient";

const moviesApi = {
    getCategory(cate: string, type: string, param: object): Promise<ListResponse<CategoryData>> {
        const url = cate + "/" + type;
        return axiosClient.get(url, param);
    },
    getMovieDetail(cate: string, id: number): Promise<CategoryDetail> {
        const url = cate + "/" + id;
        return axiosClient.get(url, { params: {} });
    },
    getActorList(cate: string, id: number): Promise<ListResponseActor<Actors>> {
        const url = cate + "/" + id + "/credits";
        return axiosClient.get(url, { params: {} });
    },
    getTrailerVideo: (cate: string, id: number): Promise<ListResponseVideo<Video>> => {
        const url = cate + "/" + id + "/videos";
        return axiosClient.get(url, { params: {} });
    },
    search: (cate: string, params: any): Promise<ListResponse<CategoryData>> => {
        const url = "search/" + cate;
        return axiosClient.get(url, params);
    },
};

export default moviesApi;

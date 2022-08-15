import { array } from "prop-types";
import {
    Actors,
    CategoryData,
    CategoryDetail,
    Genres,
    ListResponse,
    ListResponseActor,
    ListResponseVideo,
    Video,
} from "../../models";
import axiosClient from "./apiClient";

const categoryApi = {
    getCategory(cate: string, type: string, param: object): Promise<ListResponse<CategoryData>> {
        const url = cate + "/" + type;
        return axiosClient.get(url, param);
    },
    getGenres(): Promise<Genres> {
        const url = "genre/movie/list";
        return axiosClient.get(url, { params: {} });
    },
    getCategoryDetail(cate: string, id: number): Promise<CategoryDetail> {
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
    getCategorySimilar: (
        cate: string,
        id: number,
        param: object,
    ): Promise<ListResponse<CategoryData>> => {
        const url = cate + "/" + id + "/similar";
        return axiosClient.get(url, param);
    },
    search: (cate: string, params: object): Promise<ListResponse<CategoryData>> => {
        const url = "search/" + cate;
        return axiosClient.get(url, { params });
    },
};

export default categoryApi;

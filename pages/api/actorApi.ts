import { ActorDetail, ListResponse, PopularActor } from "../../models";
import axiosClient from "./apiClient";

export const actorApi = {
    getPopularActor(params: object): Promise<ListResponse<PopularActor>> {
        const url = "person/popular";
        return axiosClient.get(url, { params });
    },
    getActorDetail(id: number): Promise<ActorDetail> {
        const url = "person/" + id;
        return axiosClient.get(url, { params: {} });
    },
};

export default actorApi;

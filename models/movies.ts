export interface Movies {
    adult: boolean;
    backdrop_path: string;
    genre_ids: [];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Category {
    movie: string;
    tv: string;
}

export enum MovieType {
    upcoming = "upcoming",
    popular = "popular",
    top_rated = "top_rated",
}

export interface TvType {
    popular: string;
    top_rated: string;
    on_the_air: string;
}

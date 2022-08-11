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
export interface TvShows {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: [];
    id: number;
    name: string;
    origin_country: [];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

export interface CategoryData extends Movies, TvShows {}

export interface MovieDetail {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    budget: string;
    genres: [
        {
            id: number;
            name: string;
        },
    ];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [
        {
            id: number;
            logo_path: string;
            name: string;
            origin_country: string;
        },
    ];
    status: string;
    tagline: string;
    title: string;
    release_date: string;
    revenue: number;
    runtime: number;
    vote_average: number;
    vote_count: number;
}

export interface TvShowDetail {
    adult: boolean;
    in_production: boolean;
    backdrop_path: string;
    first_air_date: string;
    homepage: string;
    last_air_date: string;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    status: string;
    tagline: string;
    type: string;
    created_by: [];
    episode_run_time: [];
    languages: [];
    origin_country: [];
    genres: [
        {
            id: number;
            name: string;
        },
    ];
    networks: [
        {
            id: number;
            name: string;
            logo_path: string;
            origin_country: string;
        },
    ];
    production_companies: [
        {
            id: number;
            logo_path: string;
            name: string;
            origin_country: string;
        },
    ];
    spoken_languages: [
        {
            english_name: string;
            iso_639_1: string;
            name: string;
        },
    ];
    last_episode_to_air: {
        air_date: string;
        name: string;
        overview: string;
        production_code: string;
        still_path: string;
        episode_number: number;
        id: number;
        runtime: number;
        season_number: number;
        show_id: number;
        vote_average: number;
        vote_count: number;
    };
}

export interface CategoryDetail extends MovieDetail, TvShowDetail {}

export enum MovieType {
    popular = "popular",
    upcoming = "upcoming",
    top_rated = "top_rated",
}

export enum TvShowType {
    popular = "popular",
    on_the_air = "on_the_air",
    top_rated = "top_rated",
}

export type Type = MovieType | TvShowType;

export enum Category {
    movie = "movie",
    tv = "tv",
}

export interface CategoryData extends Movies, TvShows {}

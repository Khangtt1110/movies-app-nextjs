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
    first_air_date: string
    genre_ids: [];
    id: number;
    name: string;
    origin_country: []
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}



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

export enum MovieType {
    upcoming = "upcoming",
    popular = "popular",
    top_rated = "top_rated",
}

export enum TvType {
    upcoming = "upcoming",
    on_the_air = "on_the_air",
    top_rated = "top_rated",
}

export enum Category {
    movie = "movie",
    tv = "tv",
}

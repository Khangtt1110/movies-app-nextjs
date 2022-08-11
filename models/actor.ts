export interface Actors {
    adult: boolean;
    known_for_department: string;
    name: string;
    original_name: string;
    profile_path: string;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    popularity: number;
    cast_id: number;
    order: number;
}

export interface PopularActor {
    adult: boolean;
    gender: number;
    id: number;
    known_for: [
        {
            adult: false;
            backdrop_path: string | null;
            genre_ids: [];
            id: number;
            media_type: string;
            original_language: string;
            original_title: string;
            overview: string;
            poster_path: string | null;
            release_date: string;
            title: string;
            video: false;
            vote_average: number;
            vote_count: number;
        },
    ];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
}

export interface ActorDetail {
    adult: boolean;
    gender: number;
    id: number;
    popularity: number;
    also_known_as: [];
    deathday: string | null;
    homepage: string | null;
    biography: string;
    birthday: string | null;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string | null;
    profile_path: string | null;
}

export interface ListResponseActor<Actors> {
    id: string;
    cast: [Actors];
    crew: [];
}

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

export interface ListResponseActor<Actors> {
    id: string;
    cast: [Actors];
    crew: [];
}

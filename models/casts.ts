export interface Casts {
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

export interface ListResponseCast<Casts> {
    id: string;
    cast: [Casts];
    crew: [];
}

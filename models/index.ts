export * from "./auth";
export * from "./path";
export * from "./movies";
export * from "./actor";
export * from "./videos";

export interface ListResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

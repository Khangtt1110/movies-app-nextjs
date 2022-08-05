export interface Video{
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    type: string
    published_at: string
    id: string
    size: number
    official: number
}

export interface ListResponseVideo<Video>{
    id: string
    results: [Video]
}
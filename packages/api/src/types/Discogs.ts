export interface DiscogsDatabaseSearchResponse {
    pagination: {
        items: number;
        pages: number;
        page: number;
        per_page: number;
        urls: {
            last: string;
            next: string;
        };
    };
    results: DiscogsDatabaseSearchResult[];
}

export interface DiscogsDatabaseSearchResult {
    country: string;
    year: string;
    format: string[];
    label: string[];
    type: string;
    genre: string[];
    style: string[];
    id: number;
    barcode: string[];
    user_data: unknown;
    master_id: number;
    master_url?: string;
    uri: string;
    catno: string;
    title: string;
    thumb: string;
    cover_image: string;
    resource_url: string;
    community: unknown;
    format_quantity: number;
    formats: string[];
}

export interface DiscogsDatabaseSearchParams {
    genre?: string[];
}

import { DataSourceConfig, RESTDataSource } from '@apollo/datasource-rest';
import { DiscogsDatabaseSearchResponse, DiscogsDatabaseSearchResult } from '../types/Discogs';
import { Pagination, Vinyl } from '../__generated__/resolvers-types';

function convertResponseResultsToVinyl(results: DiscogsDatabaseSearchResult[]): Vinyl[] {
    const vinyls = results.map((result): Vinyl => {
        const [artist, title] = result.title.split(' - ');
        return {
            id: result.id,
            title,
            artist,
            year: result.year,
            genre: result.genre,
            style: result.style,
            format: result.format,
            country: result.country,
            coverImage: result.cover_image,
        };
    });
    const uniqueVinyls = vinyls
        .slice()
        .sort((a, b) => {
            if (a.country === 'Europe' && b.country !== 'Europe') return -1;
            if (a.country !== 'Europe' && b.country === 'Europe') return 1;
            if (a.country === 'France' && b.country !== 'France') return -1;
            if (a.country !== 'France' && b.country === 'France') return 1;
            return 0;
        })
        .filter(
            (vinyl, index, self) => index === self.findIndex(v => v.title === vinyl.title && v.artist === vinyl.artist),
        );
    return uniqueVinyls;
}

export class DiscogsApi extends RESTDataSource {
    private readonly userAgent: string;
    private readonly token: string;

    constructor(config?: DataSourceConfig) {
        super(config);
        this.baseURL = 'https://api.discogs.com/';
        this.token = process.env.DISCOGS_PERSONAL_TOKEN || '';
        this.userAgent = 'vinyl-list/1.0';
    }

    async getIdentity(): Promise<any> {
        return this.get('oauth/identity', {
            headers: { Authorization: `Discogs ${this.token}` },
        });
    }

    async search(query: string, genre?: string[], artist?: string[]): Promise<Pagination> {
        const searchParams = new URLSearchParams({
            q: query,
            type: 'release',
            format: 'vinyl',
            formats: 'vinyl,45 RPM',
            ...(artist ? { artist: artist.join(',') } : {}),
            ...(genre ? { genre: genre.join(',') } : {}),
        });
        const res = await this.get<DiscogsDatabaseSearchResponse>(`database/search?${searchParams.toString()}`, {
            headers: {
                Authorization: `Discogs token=${this.token}`,
                'User-Agent': this.userAgent,
            },
        });
        const results = convertResponseResultsToVinyl(res.results);
        return {
            items: res.pagination.items,
            page: res.pagination.page,
            pages: res.pagination.pages,
            perPage: res.pagination.per_page,
            results,
        };
    }
}

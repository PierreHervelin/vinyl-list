import { create } from 'zustand';
import type { Pagination, Vinyl } from '../../gql/graphql';

interface SearchStore {
    searchResult: Pagination;
    query: string;
    genre: string;
    artist: string[];
    setQuery: (query: string) => void;
    setGenre: (genre: string) => void;
    setArtist: (artist: string[]) => void;
    addArtist: (artist: string) => void;
    removeArtist: (artist: string) => void;
    setSearchResult: (result: Pagination) => void;
    setFakeSearchResult: () => void;
    setEmptySearchResult: () => void;
}

const FAKE_VINYL: Vinyl = {
    id: 0,
    title: 'Fake title',
    artist: 'Fake artist',
    genre: [],
    year: '2024',
    coverImage: '../assets/image-not-found.png',
};

const EMPTY_SEARCH_RESULT: Pagination = {
    items: 0,
    page: 0,
    pages: 0,
    perPage: 0,
    results: [],
};

export const useSearchStore = create<SearchStore>(set => ({
    searchResult: {
        items: 0,
        page: 0,
        pages: 0,
        perPage: 0,
        results: [],
    },
    query: new URLSearchParams(window.location.search).get('query') ?? '',
    genre: new URLSearchParams(window.location.search).get('genre') ?? 'empty',
    artist: new URLSearchParams(window.location.search).get('artist')?.split(',') ?? [],
    setSearchResult: result => {
        set({
            searchResult: result,
        });
    },
    setFakeSearchResult: () =>
        set({
            searchResult: {
                items: 0,
                page: 0,
                pages: 0,
                perPage: 0,
                results: Array(12).fill(FAKE_VINYL),
            },
        }),
    setEmptySearchResult: () =>
        set({
            searchResult: EMPTY_SEARCH_RESULT,
        }),
    setQuery: query => set({ query }),
    setGenre: genre => set({ genre }),
    setArtist: artist => set({ artist }),
    addArtist: artist => {
        const cleanedArtist = artist.replace(/\(\d+\)$/, '').trim();
        set(state => {
            if (state.artist.includes(cleanedArtist)) return state;
            return { artist: [...state.artist, cleanedArtist] };
        });
    },
    removeArtist: artist => set(state => ({ artist: state.artist.filter(a => a !== artist) })),
}));
